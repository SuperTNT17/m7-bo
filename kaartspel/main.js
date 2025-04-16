const body = document.getElementsByTagName("body")[0];
const deckStartingSize = 52; // variabele voor als je aan wilt passen hoe groot het deck is
let handSize = 8;
const maxSelectedCards = 5;
const startingMoney = 4;

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

const AnteBaseChips = {
    0: 100,
    1: 300,
    2: 800,
    3: 2000,
    4: 5000,
    5: 11000,
    6: 20000,
    7: 35000,
    8: 50000
}

const BlindTypes = {
    0: "small",
    1: "big",
    2: "boss"
}

const BlindChipsMult = {
    "small": 1,
    "big": 1.5,
    "boss": 2
}

const BlindTypeReward = {
    "small": 3,
    "big": 4,
    "boss": 5
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
        card.addEventListener("click", (e) => {
            game.SelectCard(card);
        })

        let rank = document.createElement("p");
        rank.classList.add("rank");
        rank.innerHTML = Ranks[this.rank];

        let suit = document.createElement("p");
        suit.classList.add("suit");
        suit.innerHTML = Suits[this.suit];

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
        // Fisher-Yates algoritme
        // loop door alle kaarten in het deck
        // swap ieder element met een ander random element
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    Draw() {
        return this.cards.pop();
    }
}

class Game {
    constructor() {
        this.ante = 0;
        this.round = 0;
        this.money = startingMoney;
        this.deck = new Deck();
    }

    Start() {
        this.StartAnte();
        this.StartRound();
    }

    smallBlind;
    bigBlind;
    bossBlind;

    // hand is de kaarten die je in je hand hebt
    // usedCards is de kaarten die discarded of played zijn zodat ze aan het einde van de ronde weer terug in het deck kunnen
    hand = [];
    usedCards = [];
    selectedCards = 0;

    StartAnte() {
        this.ante++;
        this.smallBlind = new Blind(0, this.ante);
        this.bigBlind = new Blind(1, this.ante);
        this.bossBlind = new Blind(2, this.ante);
    }

    StartRound() {
        this.round++;
        this.deck.Shuffle();
        for (let i = 0; i < handSize; i++) {
            this.hand.push(this.deck.Draw());
            this.hand[i].Render();
        }
    }

    SelectCard(card) {
        if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            this.selectedCards--;
            console.log("deselect");
            return;
        }
        if (this.selectedCards != maxSelectedCards) {
            card.classList.add("selected");
            this.selectedCards++;
            console.log("select");
            return;
        }
        console.log(`You can't select more than ${maxSelectedCards} cards.`)
    }

    Discard() {

    }

    Play() {

    }

    EndRound() {

    }
}

class Blind {
    constructor(type, ante) {
        this.name = BlindTypes[type];
        this.requiredScore = AnteBaseChips[ante] * BlindChipsMult[this.name];
        this.reward = BlindTypeReward[this.name];
    }
}

let game = new Game();
game.Start();
console.log(game.hand);