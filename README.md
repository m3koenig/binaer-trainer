# 🎓 Binaer-Trainer

Ein interaktives Lernspiel zum Meistern von **Binärzahlen** durch praktische Übung und Erkundung. Perfekt für Anfänger und Schüler, die Grundlagen der Informatik lernen!

## ✨ Funktionen

- **Erkundungs-Modus** - Experimentiere mit Binärzahlen, indem du Bits umschaltest und Dezimalkonvertierungen in Echtzeit siehst
- **Quiz-Modus** - Teste dein Wissen mit interaktiven Aufgaben und sammle Punkte
- **Schwierigkeitsstufen** - Normal (klicke Lichter) und Schwer (gib Binärcode ein)
- **Einstellbare Bitanzahl** - Übe mit 1-8 Bits je nach deinem Niveau
- **Schöne Benutzeroberfläche** - Modernes, responsive Design mit sanften Animationen
- **Sofortiges Feedback** - Sehe sofort, ob deine Antwort korrekt ist

## 🚀 Schnelleinstieg

### Voraussetzungen
- [Node.js](https://nodejs.org/) (v16 oder höher)
- npm oder yarn Paketmanager

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/deinusername/binaer-trainer.git
   cd binaer-trainer
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Öffne deinen Browser und gehe zu `http://localhost:5173`

## 📝 Verfügbare Befehle

- `npm run dev` - Starte den Entwicklungsserver mit Hot Reload
- `npm run build` - Baue das Projekt für die Produktion
- `npm run preview` - Vorschau des Produktions-Builds lokal
- `npm run lint` - Überprüfe die Codequalität mit ESLint
- `npm run deploy` - Bereitstellen auf GitHub Pages

## 📚 Wie man das Spiel spielt

1. **Wähle deine Bitanzahl** (wie viele Binärziffern du verwenden möchtest)
2. **Wähle einen Modus:**
   - **Erkundung**: Spiele frei mit den Lichtern und lerne, wie Binärzahlen funktionieren
   - **Quiz**: Bekomme Zufallszahlen und löse sie für Punkte
3. **Wähle deine Schwierigkeit:**
   - **Normal**: Klicke auf Lichter, um die Zahl darzustellen
   - **Schwer**: Gib die Binärdarstellung direkt ein
4. **Übe und verbessere deine Binärkenntnisse!**

## 🏗️ Projektstruktur

```
binaer-trainer/
├── src/
│   ├── App.jsx              # Hauptanwendungskomponente
│   ├── App.css              # Komponenten-Styling
│   ├── main.jsx             # React Einstiegspunkt
│   ├── index.css            # Globale Stile
│   └── assets/              # Bilder und statische Dateien
├── public/                  # Statische Assets
├── index.html               # HTML-Vorlage
├── vite.config.js           # Vite-Konfiguration
├── tailwind.config.js       # Tailwind CSS-Konfiguration
├── postcss.config.js        # PostCSS-Konfiguration
├── eslint.config.js         # ESLint-Regeln
└── package.json             # Abhängigkeiten und Skripte
```

## 🛠️ Verwendete Technologien

- **React 19** - UI-Bibliothek für interaktive Komponenten
- **Vite** - Ultra-schnelles Build-Tool und Entwicklungsserver
- **Tailwind CSS** - Utility-First CSS Framework für Styling
- **Lucide React** - Schöne Icon-Bibliothek
- **JavaScript (ES6+)** - Modernes JavaScript mit JSX

## 💡 Binärzahlen verstehen

Diese App hilft dir zu lernen:
- **Binär-Grundlagen** - Wie Computer Zahlen mit 0 und 1 darstellen
- **Potenzen von 2** - Jede Bitposition stellt 2^n dar (1, 2, 4, 8, 16...)
- **Bit-Konvertierung** - Konvertieren zwischen Dezimal (10) und Binär (2) Zahlensystemen
- **Praktische Anwendung** - Warum Binärzahlen in der Informatik wichtig sind

## 🎮 Lernpfad

1. Starte mit **2-4 Bits** im Erkundungs-Modus
2. Übe die Konvertierung im Quiz-Modus (Normal-Schwierigkeit)
3. Erhöhe die Bitanzahl schrittweise
4. Fordere dich selbst mit dem Schwer-Modus heraus
5. Beherrsche alle Kombinationen!

## 🌐 Bereitstellung

Dieses Projekt ist für die Bereitstellung auf GitHub Pages vorbereitet:

```bash
npm run deploy
```

Siehe `package.json` homepage Feld für die Bereitstellungs-URL.

## 📄 Lizenz

Dieses Projekt ist Open Source und steht unter der MIT-Lizenz zur Verfügung.

## 🤝 Beitragen

Beiträge sind willkommen! Du kannst gerne:
- Bugs melden
- Neue Funktionen vorschlagen
- Pull Requests einreichen

## ⚠️ Hinweis

Dieses Projekt ist ein **Testprojekt** für eines meiner Kinder zum Lernen von Binärzahlen. Es wurde **fast ausschließlich durch KI erstellt** und dient zu Lehr- und Lernzwecken. Ich bin nämlich kein Web-Entwickler.

## 👤 Autor

AI und ich (etwas zumindest).
