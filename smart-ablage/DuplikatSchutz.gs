// ═══════════════════════════════════════════════════════════════
// SMART ABLAGE — DUPLIKAT-SCHUTZ v1.0
// Datum: 31.03.2026
// ═══════════════════════════════════════════════════════════════
//
// Dieses Modul verhindert die Mehrfachverarbeitung von Dateien.
//
// PROBLEM: Der 5-Minuten-Trigger kann parallel mehrfach feuern,
//          wodurch Dateien 2-4x in wenigen Sekunden verarbeitet werden.
//
// EINBAU: In der Hauptfunktion (sortiereAlleQuellen o.ä.):
//
//   1. Ganz am Anfang der Funktion einfügen:
//      if (!duplikatSchutzStart()) return;
//
//   2. Ganz am Ende (im finally-Block oder vor return):
//      duplikatSchutzEnde();
//
//   3. In der Datei-Schleife, NACH "const file = files.next()":
//      if (istBereitsVerarbeitet(file)) continue;
//
//   4. NACH erfolgreicher Verarbeitung jeder Datei:
//      markiereAlsVerarbeitet(file);
//
// ═══════════════════════════════════════════════════════════════

/** @type {GoogleAppsScript.Lock.Lock|null} */
let _scriptLock = null;

/**
 * Startet den Duplikat-Schutz: Holt ein Script-Lock.
 * Gibt false zurück wenn ein anderer Lauf bereits aktiv ist.
 * 
 * @returns {boolean} true = Lock erhalten, weiter machen. false = abbrechen.
 */
function duplikatSchutzStart() {
  _scriptLock = LockService.getScriptLock();
  
  try {
    if (!_scriptLock.tryLock(10000)) {
      Logger.log('⏭️ [DuplikatSchutz] Anderer Lauf aktiv — überspringe diesen Durchlauf.');
      _scriptLock = null;
      return false;
    }
    Logger.log('🔒 [DuplikatSchutz] Lock erhalten — Verarbeitung gestartet.');
    return true;
  } catch (e) {
    Logger.log('⚠️ [DuplikatSchutz] Lock-Fehler: ' + e.message);
    _scriptLock = null;
    return false;
  }
}

/**
 * Beendet den Duplikat-Schutz: Gibt das Script-Lock frei.
 */
function duplikatSchutzEnde() {
  if (_scriptLock) {
    try {
      _scriptLock.releaseLock();
      Logger.log('🔓 [DuplikatSchutz] Lock freigegeben.');
    } catch (e) {
      Logger.log('⚠️ [DuplikatSchutz] Lock-Freigabe fehlgeschlagen: ' + e.message);
    }
    _scriptLock = null;
  }
}

/**
 * Prüft ob eine Datei bereits verarbeitet wurde.
 * 
 * @param {GoogleAppsScript.Drive.File} file - Die zu prüfende Datei
 * @returns {boolean} true = bereits verarbeitet → überspringen
 */
function istBereitsVerarbeitet(file) {
  const props = PropertiesService.getScriptProperties();
  const key = 'sa_done_' + file.getId();
  
  if (props.getProperty(key)) {
    Logger.log('⏭️ [DuplikatSchutz] Überspringe: ' + file.getName() + ' (ID: ' + file.getId() + ')');
    return true;
  }
  
  return false;
}

/**
 * Markiert eine Datei als erfolgreich verarbeitet.
 * 
 * @param {GoogleAppsScript.Drive.File} file - Die verarbeitete Datei
 */
function markiereAlsVerarbeitet(file) {
  try {
    const props = PropertiesService.getScriptProperties();
    const key = 'sa_done_' + file.getId();
    props.setProperty(key, new Date().toISOString());
    Logger.log('✅ [DuplikatSchutz] Markiert: ' + file.getName());
  } catch (e) {
    // Properties-Fehler soll Verarbeitung nicht abbrechen
    Logger.log('⚠️ [DuplikatSchutz] Markierung fehlgeschlagen: ' + e.message);
  }
}

/**
 * Bereinigt alte Einträge aus dem Verarbeitungs-Cache.
 * Löscht alles älter als 48 Stunden.
 * 
 * → Als täglichen Trigger einrichten (z.B. 03:00 Uhr).
 */
function bereinigeVerarbeitungsCache() {
  const props = PropertiesService.getScriptProperties();
  const allProps = props.getProperties();
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let geloescht = 0;
  let gesamt = 0;
  
  for (const key in allProps) {
    if (key.startsWith('sa_done_')) {
      gesamt++;
      try {
        const timestamp = new Date(allProps[key]);
        if (timestamp < cutoff) {
          props.deleteProperty(key);
          geloescht++;
        }
      } catch (e) {
        // Ungültiges Datum → auch löschen
        props.deleteProperty(key);
        geloescht++;
      }
    }
  }
  
  Logger.log('🧹 [DuplikatSchutz] Bereinigung: ' + geloescht + '/' + gesamt + ' Einträge gelöscht.');
}
