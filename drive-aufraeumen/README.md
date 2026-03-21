# Drive Aufräum-Script

Automatisches Aufräumen des Google Drive Root-Verzeichnisses für Hof Holtermann.

## Beschreibung

Verschiebt lose Dateien aus dem Drive-Stammverzeichnis in den Zielordner `00_EINGANG`.

## Konfiguration

- **Konto:** oh@hofholtermann.de
- **Trigger:** Täglich um 06:00 Uhr
- **Zielordner:** `00_EINGANG` (`1oMqgb81rGX5YKzbkXuZlgfv14DseBcUJ`)

## Funktionen

| Funktion | Beschreibung |
|----------|-------------|
| `aufraeumen()` | Verschiebt alle Root-Dateien nach 00_EINGANG |
| `trockenlauf()` | Vorschau ohne Aktion — zeigt, was verschoben würde |
| `rootDateienAnzeigen()` | Listet alle Dateien im Root-Verzeichnis |
| `triggerEinrichten()` | Richtet täglichen Trigger um 06:00 ein |
| `triggerEntfernen()` | Stoppt den automatischen Trigger |
