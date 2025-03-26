let time = new Date();
let year = time.getFullYear();
let month = time.getMonth();

let jaarTitle = document.getElementById("jaarTitle");
let maandTitle = document.getElementById("maandTitle");

const previousMonthBtn = document.getElementById("previousMonthBtn");
previousMonthBtn.addEventListener("click", function () {
    // Volgende maand
    month--;
    if (month < 0) {
        month = 11; // Naar december
        year--;
    }
    updateCalendar(year, month);
});

const nextMonthBtn = document.getElementById("nextMonthBtn");
nextMonthBtn.addEventListener("click", function () {
    // Volgende maand
    month++;
    if (month > 11) {
        month = 0; // Naar januari
        year++;
    }
    updateCalendar(year, month);
});

function updateCalendar(year, month) {
    updateMonth();
    jaarTitle.innerHTML = year;
    // Haal de eerste dag van de maand op en de laatste datum van de maand
    let dayone = new Date(year, month, 1).getDay(); // Eerste dag van de maand
    let lastdate = new Date(year, month + 1, 0).getDate();  // Aantal dagen in de maand
    let dayend = new Date(year, month, lastdate).getDay();

    // Pas de waarde van dayone aan voor een kalender die begint op maandag
    // Zondag (0) moet worden behandeld als 6 (de laatste dag van de week)
    if (dayone === 0) {
        dayone = 6; // Zondag wordt de 6de index in plaats van 0
    } else {
        dayone -= 1; // Verplaats andere dagen zodat maandag 0 is, dinsdag 1 is, etc.
    }

    // Verkrijg alle "nummers" van de kalender
    const nummers = document.getElementsByClassName("nummers");

    // Maak de kalender leeg (vooral oude gegevens)
    for (let row = 0; row < nummers.length; row++) {
        for (let day = 0; day < 7; day++) {
            nummers[row].children[day].innerHTML = '';
        }
    }

    let row = 0;
    let day = dayone;

    // Vul de kalender met de juiste dagen
    for (let i = 0; i < lastdate; i++) {
        if (day % 7 == 0 && day != 0) {
            row++;
            day = 0;
        }

        // Zorg ervoor dat we geen 'undefined' krijgen door te controleren of we de juiste cellen gebruiken
        if (nummers[row] && nummers[row].children[day]) {
            nummers[row].children[day].innerHTML = i + 1;
        }

        day++;
    }
}

function updateMonth() {
    maandTitle.innerHTML = month;
    switch (month) {
        case 0:
            maandTitle.innerHTML = "Januari";
            break;
        case 1:
            maandTitle.innerHTML = "Februari";
            break;
        case 2:
            maandTitle.innerHTML = "Maart";
            break;
        case 3:
            maandTitle.innerHTML = "April";
            break;
        case 4:
            maandTitle.innerHTML = "Mei";
            break;
        case 5:
            maandTitle.innerHTML = "Juni";
            break;
        case 6:
            maandTitle.innerHTML = "Juli";
            break;
        case 7:
            maandTitle.innerHTML = "Augustus";
            break;
        case 8:
            maandTitle.innerHTML = "September";
            break;
        case 9:
            maandTitle.innerHTML = "Oktober";
            break;
        case 10:
            maandTitle.innerHTML = "November";
            break;
        case 11:
            maandTitle.innerHTML = "December";
            break;
        default:
            console.log(month)
            maandTitle.innerHTML = month;
            break;
    }
}

// Initialiseer de kalender bij het laden
updateCalendar(year, month);
