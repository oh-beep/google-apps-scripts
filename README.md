# Google Apps Scripts — Hof Holtermann

Versionskontrolle und automatisches Deployment für alle Google Apps Scripts.

## Wie es funktioniert

```
GitHub ←→ script.google.com
```

- **Code in GitHub ändern** → Push auf `main` → automatisch nach script.google.com deployed (via clasp + GitHub Actions)
- **Code in script.google.com ändern** → `./scripts/pull-all.sh` lokal ausführen → committen → GitHub aktualisiert

## Scripts

| Script | Beschreibung | Trigger | Ordner |
|---|---|---|---|
| Smart E-Mail Router v3.1 | Gmail → Drive → Notion | Alle 5 Min | `smart-email-router/` |
| Drive Aufräum-Script | Root-Dateien → 00_EINGANG | Täglich 06:00 | `drive-aufraeumen/` |
| Smart Ablage System v4 | Dokumenten-Sortierung mit Gemini KI | Alle 5 Min | `smart-ablage/` |

## Ersteinrichtung

### 1. Apps Script API aktivieren
→ [script.google.com/home/usersettings](https://script.google.com/home/usersettings) → API aktivieren

### 2. clasp installieren & einloggen
```bash
npm install -g @google/clasp
clasp login
```

### 3. Script-IDs eintragen
In jeder `.clasp.json` die richtige `scriptId` eintragen:
- `smart-email-router/.clasp.json` ✅ (bereits eingetragen)
- `drive-aufraeumen/.clasp.json` — Script-ID von script.google.com kopieren
- `smart-ablage/.clasp.json` — Script-ID von script.google.com kopieren

### 4. GitHub Secret einrichten
Den Inhalt von `~/.clasprc.json` (nach `clasp login`) als GitHub Secret `CLASPRC_JSON` im Repo speichern.

### 5. Aktuellen Code aus script.google.com holen
```bash
./scripts/pull-all.sh
git add -A && git commit -m "Aktueller Code aus script.google.com" && git push
```

## Dateien pro Script

```
smart-email-router/
├── .clasp.json          # Script-ID (nicht committen wenn sensibel)
├── appsscript.json      # Manifest (Berechtigungen, Laufzeit)
└── Code.gs              # Der eigentliche Script-Code
```

## Konto

Alle Scripts laufen auf: `oh@hofholtermann.de`
