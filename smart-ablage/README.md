# Smart Ablage System v4.0 (Gemini)

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

## Konfiguration

- **Konto:** oh@hofholtermann.de
- **Trigger:** Alle 5 Minuten (`sortiereAlleQuellen`)
