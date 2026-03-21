#!/bin/bash
# =============================================================================
# Alle Scripts von script.google.com herunterladen
# Verwendung: ./scripts/pull-all.sh
# Voraussetzung: clasp ist installiert und eingeloggt
# =============================================================================

set -e

echo "📧 Smart E-Mail Router pullen..."
cd smart-email-router
clasp pull
cd ..

echo "🗂️ Drive Aufräum-Script pullen..."
cd drive-aufraeumen
clasp pull
cd ..

echo "📁 Smart Ablage System pullen..."
cd smart-ablage
clasp pull
cd ..

echo "✅ Alle Scripts aktualisiert!"
echo ""
echo "Jetzt committen mit:"
echo "  git add -A && git commit -m 'Scripts aktualisiert' && git push"
