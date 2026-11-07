# Flip 7 Punkteblock

Punkteblock für das Kartenspiel Flip 7. Runden eintragen, Punkte werden automatisch addiert, wer zuerst das Ziel (Standard 200) erreicht, gewinnt. Erreichen mehrere das Ziel in derselben Runde, gewinnt der mit mehr Punkten. Bei Gleichstand wird geteilt.

Funktionen: Karten-Rechner, Bust- und Flip-7-Knopf, Sounds (abschaltbar), Siegerehrung mit Konfetti, Tabelle mit Korrektur, Statistik, Verlaufsdiagramm, Bestenliste. Läuft nach dem ersten Öffnen auch offline und lässt sich als App auf dem Home-Bildschirm installieren.

## Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues Repository anlegen, z. B. `flip7-punkteblock`, Sichtbarkeit **Public**.
2. Im leeren Repo auf **uploading an existing file** klicken und den gesamten Inhalt dieses Ordners hineinziehen (`index.html`, `manifest.webmanifest`, `sw.js`, `README.md` und den Ordner `icons`). Dann **Commit changes**.
3. **Settings → Pages**: bei *Source* „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, **Save**.
4. Nach ein bis zwei Minuten ist die App erreichbar unter `https://<dein-github-name>.github.io/flip7-punkteblock/`.

## Aufs Handy als App

- **iPhone:** Link in Safari öffnen → Teilen → „Zum Home-Bildschirm“.
- **Android:** Link in Chrome öffnen → Menü (⋮) → „App installieren“.

## Update einspielen

Geänderte Dateien wieder hochladen und in `sw.js` die Versionsnummer (`flip7-v1` → `flip7-v2`) erhöhen. Die Geräte holen sich die neue Version beim nächsten Öffnen automatisch.

Die Spielstände liegen im Speicher des jeweiligen Geräts. Sie werden nicht hochgeladen und verschwinden auch nicht bei einem Update.
