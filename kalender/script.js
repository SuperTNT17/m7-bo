let time = new Date();
let year = time.getFullYear();
let month = time.getMonth();

console.log(time);

let dayone = new Date(year, month, 1).getDay();
console.log(`de eerste dag van de maand: ${dayone} (1 = ma, 2 = di ...)`);

let lastdate = new Date(year, month + 1, 0).getDate();
console.log(`laatste datum van de maand: ${lastdate}`);

let dayend = new Date(year, month, lastdate).getDay();
console.log(`dag van de laatste datum van de maand: ${dayend} (1 = ma, 2 = di ...)`);

let monthlastdate = new Date(year, month, 0).getDate();
console.log(`laatste datum van de vorige maand: ${monthlastdate}`);

const weekdagen = document.getElementById("weekdagen");
console.log(weekdagen);
console.log(weekdagen.children[0].innerHTML);

const nummers = document.getElementsByClassName("nummers");
console.log(nummers);
console.log(nummers[0].children[0].innerHTML);

let row = 0;
let day = dayone - 1;
for (let i = 0; i < lastdate; i++) {
    if (day % 7 == 0 && day != 0) {
        row++;
        day = 0;
    }
    console.log(`row: ${row}, day: ${day}, datum: ${i + 1}`);

    nummers[row].children[day].innerHTML = i + 1;
    day++;
}