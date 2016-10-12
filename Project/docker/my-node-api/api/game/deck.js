
function Deck() {
    this.deck = this.createDeck();
    this.deck = this.shuffleDeck();
}


Deck.prototype.createDeck = function() {
    var deck = [
            { suit: "spade", value: 2 },
            { suit: "spade", value: 3 },
            { suit: "spade", value: 4 },
            { suit: "spade", value: 5 },
            { suit: "spade", value: 6 },
            { suit: "spade", value: 7 },
            { suit: "spade", value: 8 },
            { suit: "spade", value: 9 },
            { suit: "spade", value: 10 },
            { suit: "spade", value: 11 },
            { suit: "spade", value: 12 },
            { suit: "spade", value: 13 },
            { suit: "spade", value: 14 },
            { suit: "club", value: 2 },
            { suit: "club", value: 3 },
            { suit: "club", value: 4 },
            { suit: "club", value: 5 },
            { suit: "club", value: 6 },
            { suit: "club", value: 7 },
            { suit: "club", value: 8 },
            { suit: "club", value: 9 },
            { suit: "club", value: 10 },
            { suit: "club", value: 11 },
            { suit: "club", value: 12 },
            { suit: "club", value: 13 },
            { suit: "club", value: 14 },
            { suit: "heart", value: 2 },
            { suit: "heart", value: 3 },
            { suit: "heart", value: 4 },
            { suit: "heart", value: 5 },
            { suit: "heart", value: 6 },
            { suit: "heart", value: 7 },
            { suit: "heart", value: 8 },
            { suit: "heart", value: 9 },
            { suit: "heart", value: 10 },
            { suit: "heart", value: 11 },
            { suit: "heart", value: 12 },
            { suit: "heart", value: 13 },
            { suit: "heart", value: 14 },
            { suit: "diamond", value: 2 },
            { suit: "diamond", value: 3 },
            { suit: "diamond", value: 4 },
            { suit: "diamond", value: 5 },
            { suit: "diamond", value: 6 },
            { suit: "diamond", value: 7 },
            { suit: "diamond", value: 8 },
            { suit: "diamond", value: 9 },
            { suit: "diamond", value: 10 },
            { suit: "diamond", value: 11 },
            { suit: "diamond", value: 12 },
            { suit: "diamond", value: 13 },
            { suit: "diamond", value: 14 }
    ];
            
    return deck;
}

Deck.prototype.shuffleDeck = function() {
    var shuffledDeck = [];

    for(var i = this.deck.length; i > 0; i--) {
        var num = Math.floor(Math.random() * i);

        shuffledDeck.push(this.deck[num]);
        this.deck.splice(num, 1);
    }

    return shuffledDeck;
}

Deck.prototype.popFromDeck = function() {
    var card = this.deck[this.deck.length - 1];
    this.deck.pop();
    return card;
}

Deck.prototype.getLength = function() {
    return this.deck.length;
}

module.exports = Deck;