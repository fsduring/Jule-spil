// Enkel datastruktur for spillet
const felter = document.querySelectorAll(".felt");
const turTekst = document.getElementById("tur-tekst");
const resultatTekst = document.getElementById("resultat");
const resetKnap = document.getElementById("reset-knap");

const SPILLERE = {
  groen: {
    navn: "Grøn næse",
    klasse: "gron",
  },
  roed: {
    navn: "Rød næse",
    klasse: "rod",
  },
};

let nuvaerendeSpiller = SPILLERE.groen;
let braetStatus = Array(9).fill(null);
let spilAktivt = true;

const vinderKombinationer = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Opdaterer tur teksten
function opdaterTurTekst() {
  turTekst.textContent = `Tur: ${nuvaerendeSpiller.navn}`;
}

// Viser resultat og låser brættet
function afslutSpil(meddelelse) {
  resultatTekst.textContent = meddelelse;
  spilAktivt = false;
  felter.forEach((felt) => felt.classList.add("deaktiveret"));
}

// Tjekker om der er en vinder eller uafgjort
function tjekVinderen() {
  for (const kombi of vinderKombinationer) {
    const [a, b, c] = kombi;
    if (
      braetStatus[a] &&
      braetStatus[a] === braetStatus[b] &&
      braetStatus[a] === braetStatus[c]
    ) {
      kombi.forEach((index) => felter[index].classList.add("vinder"));
      const vinderTekst =
        braetStatus[a] === "gron"
          ? "Grøn næse vinder!"
          : "Rød næse vinder!";
      afslutSpil(vinderTekst);
      return;
    }
  }

  if (braetStatus.every((felt) => felt !== null)) {
    afslutSpil("Uafgjort!");
  }
}

// Håndterer klik på et felt
function haandterFeltKlik(event) {
  const felt = event.currentTarget;
  const index = Number(felt.dataset.index);

  if (!spilAktivt || braetStatus[index]) {
    return;
  }

  braetStatus[index] = nuvaerendeSpiller.klasse;
  placerNese(felt, nuvaerendeSpiller.klasse);
  tjekVinderen();

  if (spilAktivt) {
    nuvaerendeSpiller =
      nuvaerendeSpiller === SPILLERE.groen ? SPILLERE.roed : SPILLERE.groen;
    opdaterTurTekst();
  } else {
    turTekst.textContent = "Spillet er slut";
  }
}

// Tilføjer næsen visuelt og med en pop- animation
function placerNese(felt, farveKlasse) {
  const nese = document.createElement("span");
  nese.className = `nese ${farveKlasse}`;
  felt.appendChild(nese);
  felt.setAttribute("aria-label", `${farveKlasse === "gron" ? "Grøn" : "Rød"} næse placeret`);
}

// Nulstiller spillet
function nulstilSpil() {
  braetStatus = Array(9).fill(null);
  nuvaerendeSpiller = SPILLERE.groen;
  spilAktivt = true;
  resultatTekst.textContent = "\u00a0";
  opdaterTurTekst();

  felter.forEach((felt) => {
    felt.innerHTML = "";
    felt.classList.remove("vinder", "deaktiveret");
    felt.setAttribute("aria-label", "Tomt felt");
  });
}

// Tilknyt event-listeners
felter.forEach((felt) => {
  felt.addEventListener("click", haandterFeltKlik);
  felt.setAttribute("aria-label", "Tomt felt");
});
resetKnap.addEventListener("click", nulstilSpil);

// Sørg for korrekt starttekst
opdaterTurTekst();
