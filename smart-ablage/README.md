# Smart Ablage System v4.3 (Gemini)

KI-gestützte Dokumentenablage für Hof Holtermann mit Gemini 2.5 Flash Integration.

## Beschreibung

Zentrale Dokumentenablage mit automatischer Erkennung, Umbenennung und Einsortierung von Dokumenten.

## 3 Eingangsquellen

1. **E-Mail-Anhänge** — via Smart E-Mail Router → Drive
2. **Handy-Scans** — Google Drive App → `00_EINGANG`
3. **Manuell hochgeladene Dateien** → `00_EINGANG`

## Features

- **Gemini 2.5 Flash** KI-Dokumentenanalyse
- **OCR** — Texterkennung aus Bildern und PDFs
- **Automatische Umbenennung:** `Typ_Absender_Detail_JJJJ-MM-TT.ext`
- **9+ Dokumenttypen:** Rechnung, Mahnung, Angebot, Vertrag, Lieferschein, Gutschrift, Bescheid, Kontoauszug, Sonstiges
- **Firmenzuordnung:** PremiumEi, HHB, Hofladen, etc.
- **Duplikat-Schutz** (seit 31.03.2026) — LockService + PropertiesService

## Konfiguration

- **Konto:** oh@hofholtermann.de
- **Trigger:** Alle 5 Minuten (`sortiereAlleQuellen`)
- **Script-ID:** `1s55NJW7ECwf85w_qJDmtaIkden-f2RVjQDayKAnkj39WiYEMMeMaA5e4`

## Duplikat-Schutz (DuplikatSchutz.gs)

### Problem
Der 5-Minuten-Trigger kann parallel mehrfach feuern, wodurch Dateien 2-4x in wenigen Sekunden verarbeitet werden.

### Lösung
`DuplikatSchutz.gs` bietet 3-stufigen Schutz:
1. **LockService** — verhindert parallele Ausführung
2. **PropertiesService** — merkt sich verarbeitete File-IDs
3. **Automatische Bereinigung** — alte Einträge nach 48h löschen

### Einbau in Code.gs

Nach `clasp push` muss der Duplikat-Schutz in der Hauptfunktion aktiviert werden:

```javascript
function sortiereAlleQuellen() {
  // ★ NEU: Duplikat-Schutz starten
  if (!duplikatSchutzStart()) return;
  
  try {
    // ... bestehender Code ...
    
    while (files.hasNext()) {
      const file = files.next();
      
      // ★ NEU: Bereits verarbeitet? Überspringen.
      if (istBereitsVerarbeitet(file)) continue;
      
      // ... bestehende Verarbeitung ...
      
      // ★ NEU: Als verarbeitet markieren
      markiereAlsVerarbeitet(file);
    }
    
  } finally {
    // ★ NEU: Lock freigeben
    duplikatSchutzEnde();
  }
}
```

### Trigger für Bereinigung
Zusätzlich einen täglichen Trigger für `bereinigeVerarbeitungsCache` einrichten (z.B. 03:00 Uhr).

## Deployment

```bash
cd smart-ablage
clasp push    # Code zu Apps Script hochladen
clasp pull    # Aktuellen Code von Apps Script holen
```
