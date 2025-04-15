const body = document.getElementsByTagName("body")[0];
const deckStartingSize = 52; // variabele voor als je aan wilt passen hoe groot het deck is
let handSize = 8;
const maxSelectedCards = 5;

// hiermee kan ik makkelijk de waardes in de properties van de Card class omzetten naar een string 
const Ranks = {
    0: "2",
    1: "3",
    2: "4",
    3: "5",
    4: "6",
    5: "7",
    6: "8",
    7: "9",
    8: "10",
    9: "J",
    10: "Q",
    11: "K",
    12: "A"
}

const Suits = {
    0: "♦",
    1: "♣",
    2: "♥",
    3: "♠"
}

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    Render() {
        console.log(`rank: ${Ranks[this.rank]}, suit: ${Suits[this.suit]}`);
        let card = document.createElement("div");
        card.classList.add("card");
        let rank = document.createElement("p");
        rank.classList.add("rank");
        let suit = document.createElement("p");
        suit.classList.add("suit");
        card.appendChild(rank);
        card.appendChild(suit);
        body.appendChild(card);
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.FillDeck();
    }

    FillDeck() {
        let rank = 0;
        let suit = 0;
        for (let i = 0; i < deckStartingSize; i++) {
            if (rank == 13) {
                rank = 0;
                suit++;
            }
            if (suit == 4) {
                suit = 0;
            }
            this.cards.push(new Card(rank, suit));
            rank++;
        }
    }

    Shuffle() {
        let shuffled = [];
        let lenght = this.cards.length;
        let random;
        for (let i = 0; i < length; i++) {
            random = Math.floor(Math.random() * length--);
            shuffled.push(this.cards.splice(random, 1)[0]);
        }
        this.cards = shuffled;
    }

    Draw() {
        return this.cards.pop();
    }
}

function roundStart() {
    deck.Shuffle();
    for (let i = 0; i < handSize; i++) {
        deck.Draw();
    }
}

let deck = new Deck();
console.log("deck:");
console.log(deck.cards);
// deck.Shuffle();
// console.log(deck.cards);
deck.Shuffle();
console.log("cards na shufflen:");
console.log(deck.cards);