# Smart E-Mail Router v3.1

Automatisches E-Mail-Routing für Hof Holtermann / HHB Agrarenergie.

## Beschreibung

Der Smart E-Mail Router verarbeitet eingehende E-Mails und leitet sie automatisch weiter:
**Gmail → Drive → Notion**

## Features

- **Duplikat-Check** per Gmail Message-ID
- **Spam-Filter** — filtert unerwünschte E-Mails automatisch
- **1 Aufgabe pro Thread** — verhindert doppelte Notion-Einträge
- **Auto-Labeling** — automatische Gmail-Label-Zuweisung

## Konfiguration

- **Konto:** oh@hofholtermann.de
- **Trigger:** Alle 5 Minuten (`processNewEmails`)

## Funktionen

| Funktion | Beschreibung |
|----------|-------------|
| `processNewEmails` | Hauptfunktion — verarbeitet neue E-Mails |
