# Google Apps Scripts — Hof Holtermann

Zentrale Versionskontrolle für alle Google Apps Scripts von **Hof Holtermann / HHB Agrarenergie**.

## Übersicht

| Script | Beschreibung | Trigger |
|--------|-------------|---------|
| **Smart E-Mail Router** | Automatisches Routing: Gmail → Drive → Notion. Duplikat-Check, Spam-Filter, Auto-Labeling. | Alle 5 Minuten |
| **Drive Aufräum-Script** | Verschiebt lose Root-Dateien in den Ordner `00_EINGANG`. | Täglich um 06:00 Uhr |
| **Smart Ablage System** | KI-gestützte Dokumentenablage mit Gemini 2.5 Flash. OCR, Auto-Umbenennung, 9+ Dokumenttypen. | Alle 5 Minuten |

## Verzeichnisstruktur

```
google-apps-scripts/
├── smart-email-router/    # Gmail → Drive → Notion Router
│   ├── README.md
│   └── Code.gs
├── drive-aufraeumen/      # Root-Dateien → 00_EINGANG
│   ├── README.md
│   └── Code.gs
└── smart-ablage/          # KI-Dokumentenablage (Gemini)
    ├── README.md
    └── Code.gs
```

## Setup

1. Öffne [script.google.com](https://script.google.com)
2. Der aktive Code läuft direkt in Google Apps Script
3. Bei Änderungen: Code aus script.google.com hierher kopieren und committen

## Hinweis

Die `.gs`-Dateien in diesem Repository dienen der **Versionskontrolle**. Der produktive Code läuft in [script.google.com](https://script.google.com) unter dem Konto `oh@hofholtermann.de`.
