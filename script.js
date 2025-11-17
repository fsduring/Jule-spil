// Hele spillet kapsles ind, så vi kun kører logikken når DOM'en er klar
window.addEventListener("DOMContentLoaded", () => {
  const felter = document.querySelectorAll(".felt");
  const turTekst = document.getElementById("tur-tekst");
  const resultatTekst = document.getElementById("resultat");
  const resetKnap = document.getElementById("reset-knap");

  // Navne og klasser, så teksten kan holdes på dansk ét sted
  const SPILLERE = {
    gron: { navn: "Grøn næse", klasse: "gron" },
    rod: { navn: "Rød næse", klasse: "rod" },
  };

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

  let braetStatus;
  let aktivSpiller;
  let spilAktivt;

  initSpil();

  // Event-listeners til felter og nulstilling
  felter.forEach((felt) => {
    felt.addEventListener("click", (event) => haandterFeltKlik(event.currentTarget));
  });
  resetKnap.addEventListener("click", initSpil);

  // Genstarter spillet til udgangspunkt
  function initSpil() {
    braetStatus = Array(9).fill(null);
    aktivSpiller = SPILLERE.gron;
    spilAktivt = true;
    resultatTekst.innerHTML = "&nbsp;";
    opdaterTurTekst();

    felter.forEach((felt, index) => {
      felt.innerHTML = "";
      felt.classList.remove("vinder", "deaktiveret");
      felt.disabled = false;
      felt.setAttribute("aria-label", `Tomt felt ${index + 1}`);
    });
  }

  // Viser hvilken spiller der er på tur
  function opdaterTurTekst() {
    turTekst.textContent = `Tur: ${aktivSpiller.navn}`;
  }

  // Placerer en næse og kontrollerer spilstatus
  function haandterFeltKlik(felt) {
    const index = Number(felt.dataset.index);
    if (!spilAktivt || braetStatus[index]) {
      return;
    }

    braetStatus[index] = aktivSpiller.klasse;
    placerNese(felt, aktivSpiller.klasse);
    felt.setAttribute("aria-label", `${aktivSpiller.navn} placeret`);

    if (tjekVinder()) {
      return;
    }

    if (braetStatus.every((feltStatus) => feltStatus)) {
      afslutSpil("Uafgjort!");
      return;
    }

    skiftSpiller();
  }

  // Skifter tur til den anden spiller
  function skiftSpiller() {
    aktivSpiller = aktivSpiller === SPILLERE.gron ? SPILLERE.rod : SPILLERE.gron;
    opdaterTurTekst();
  }

  // Tjekker om en spiller har vundet
  function tjekVinder() {
    for (const kombi of vinderKombinationer) {
      const [a, b, c] = kombi;
      if (
        braetStatus[a] &&
        braetStatus[a] === braetStatus[b] &&
        braetStatus[a] === braetStatus[c]
      ) {
        markerVinder(kombi);
        const vinderTekst =
          braetStatus[a] === "gron" ? "Grøn næse vinder!" : "Rød næse vinder!";
        afslutSpil(vinderTekst);
        return true;
      }
    }
    return false;
  }

  // Viser næsen grafisk
  function placerNese(felt, klasse) {
    const nese = document.createElement("span");
    nese.className = `nese ${klasse}`;
    felt.appendChild(nese);
  }

  // Viser tydeligt hvilke felter der indgår i en sejr
  function markerVinder(kombi) {
    kombi.forEach((index) => {
      felter[index].classList.add("vinder");
    });
  }

  // Låser brættet og viser resultatet
  function afslutSpil(tekst) {
    resultatTekst.textContent = tekst;
    turTekst.textContent = "Spillet er slut";
    spilAktivt = false;
    felter.forEach((felt) => {
      felt.classList.add("deaktiveret");
      felt.disabled = true;
    });
  }
});
