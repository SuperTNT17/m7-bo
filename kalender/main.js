let time = new Date();
let year = time.getFullYear();
let month = time.getMonth();

let jaarTitle = document.getElementById("jaarTitle");
let maandTitle = document.getElementById("maandTitle");

const previousMonthBtn = document.getElementById("previousMonthBtn");
previousMonthBtn.addEventListener("click", function () {
    month--;
    if (month < 0) {
        month = 11; // Naar december
        year--;
    }
    updateCalendar(year, month);
});

const nextMonthBtn = document.getElementById("nextMonthBtn");
nextMonthBtn.addEventListener("click", function () {
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
    let dayone = new Date(year, month, 1).getDay(); // Eerste dag van de maand
    let lastdate = new Date(year, month + 1, 0).getDate();  // Aantal dagen in de maand
    let dayend = new Date(year, month, lastdate).getDay();  // Laatste dag van de maand

    if (dayone === 0) {
        dayone = 6; // Zondag wordt de 6de index in plaats van 0
    } else {
        dayone -= 1; // Verplaats andere dagen zodat maandag 0 is
    }

    const nummers = document.getElementsByClassName("nummers");

    // Maak kalender leeg
    for (let row = 0; row < nummers.length; row++) {
        for (let day = 0; day < 7; day++) {
            nummers[row].children[day].innerHTML = '';
            nummers[row].children[day].classList.remove("js--currentDay");
        }
    }

    let row = 0;
    let day = dayone;

    // Dagen in de kalender doen
    for (let i = 0; i < lastdate; i++) {
        if (day % 7 == 0 && day != 0) {
            row++;
            day = 0;
        }

        // Zorg ervoor dat we geen 'undefined' krijgen door te controleren of we de juiste cellen gebruiken
        if (nummers[row] && nummers[row].children[day]) {
            nummers[row].children[day].innerHTML = i + 1;
            // Dag van vandaag highlighten
            if (i + 1 == time.getDate() && month == time.getMonth()) {
                nummers[row].children[day].classList.add("js--currentDay");
            }
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

updateCalendar(year, month);
