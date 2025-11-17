# Jule-spil

Et lille to-personers "kryds og bolle"-inspireret julespil med glødende næser.

## Download og spil

1. Klik på "Code" → "Download ZIP" her på GitHub (eller klon repoet med `git clone`).
2. Udpak ZIP-filen et valgfrit sted.
3. Dobbeltklik på `index.html` – spillet åbner straks i din browser.

## Kør via lokal server

Hvis du hellere vil trykke "kør" i et terminalmiljø, kan du starte en lille server, så du kan teste spillet uden at flytte filer:

```bash
sh run.sh
```

Scriptet starter en simpel `python3 -m http.server` på port 4173 og fortæller dig, hvilket link du skal åbne. Afslut igen med `Ctrl + C`.

## Strukturen

- `index.html` – HTML-struktur med titel, tur-indikator, bræt og knapper
- `style.css` – Juletema, sneanimationer og glødende næser
- `script.js` – Spillets logik, turstyring og vinderkontrol
- `run.sh` – Hjælpescript til at starte en lokal server
