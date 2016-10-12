var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var Player = require('../game/player.js');
var Computer = require('../game/computer.js');

describe('Deck', function() {
    it('should return a full deck of 52 cards', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should shuffle the deck', function(done) {
        var deck = new Deck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should produce all of the cards in order', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        var val = 2;
        //spades check
        for (var i = 0; i < 13; i++) {
        	expect(deck.deck[i].suit).to.equal("spade");
        	expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //clubs check
        for (var i = 13; i < 26; i++) {
            expect(deck.deck[i].suit).to.equal("club");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //hearts check
        for (var i = 26; i < 39; i++) {
            expect(deck.deck[i].suit).to.equal("heart");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //diamonds check
        for (var i = 39; i < 52; i++) {
            expect(deck.deck[i].suit).to.equal("diamond");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }


        done();
    });

    // This has a chance of failing 1 in 80,658,175,170,943,878,571,660,636,856,403,766,975,289,505,440,883,277,824,000,000,000,000
    it('should ensure that the deck is shuffled', function(done) {
        var deck = new Deck();
        deck.deck = deck.createDeck();

        var shuffleDeck = new Deck();

        var passed = false;

        if (JSON.stringify(deck.deck) === JSON.stringify(shuffleDeck.deck))
          passed = true;
        else
          passed = false;

        expect(passed).to.equal(false);

        done();
    });


});

describe('Game', function() {
    it('should initially deal two cards to each player', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);

        //game.dealPlayerCards();

        expect(players[0].getHand()).to.have.length(2);
        expect(players[1].getHand()).to.have.length(2);
        expect(players[2].getHand()).to.have.length(2);
        expect(players[3].getHand()).to.have.length(2);
        expect(players[4].getHand()).to.have.length(2);
        done();
    });

    it('should place a bet', function(done) {
        var game = new Game(new Deck());

        done();
    });

    it('should deal the flop', function(done) {
        var game = new Game(new Deck());

        game.dealTableCards(3);

        var table = game.getTableCards();

        expect(table).to.have.length(3);
        done();
    });


    it('should check for a straight flush', function(done) {


        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        // Player Hand
        var playerHand = [
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 10 }
            ];

        var game = new Game(players);

        game.players[0].hand = playerHand;

        // Straight flush using table cards
        game.tableCards = [
            { suit: 'heart', value: 3 },
            { suit: 'heart', value: 5 },
            { suit: 'heart', value: 6 },
            { suit: 'heart', value: 7 },
            { suit: 'heart', value: 4 }
        ];

        var straightCheck = game.checkHand(game.players[0]);

        // console.log("STRAIGHT FLUSH: ", players[0].handValue);
        expect(game.players[0].handValue[8]).to.equal(7);

        done();
    });

    it('should check for a four-of-a-kind', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var playerHand = [
            { suit: 'club', value: 10 },
            { suit: 'spade', value: 10 }
            ];

        var game = new Game(players);

        game.players[0].hand = playerHand;

        // Four-of-a-kind using two hand cards and two table cards
        game.tableCards = [
            { suit: 'heart', value: 10 },
            { suit: 'diamond', value: 10 },
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 2 },
            { suit: 'heart', value: 14 }
        ];

        var fourCheck = game.checkHand(game.players[0]);

        //pass condition
        expect(game.players[0].handValue[7]).to.equal('10');
        done();
    });

    it('should check for a full house', function(done) {
      var players = []
      for (var i = 0; i < 5; i++){
        players.push(new Player());
      }

      var playerHand = [
          { suit: 'club', value: 10 },
          { suit: 'spade', value: 10 }
          ];

      var game = new Game(players);

      game.players[0].hand = playerHand;

      // Four-of-a-kind using two hand cards and two table cards
      game.tableCards = [
          { suit: 'heart', value: 10 },
          { suit: 'diamond', value: 9 },
          { suit: 'club', value: 2 },
          { suit: 'spade', value: 2 },
          { suit: 'heart', value: 14 }
      ];


      var fullHouseCheck = game.checkHand(game.players[0]);
      //pas condition
      expect(game.players[0].handValue[6]).to.equal('10');
      done();
    });

    it('should check for two pairs', function(done) {
      var players = []
      for (var i = 0; i < 5; i++){
        players.push(new Player());
      }

      var playerHand = [
          { suit: 'club', value: 11 },
          { suit: 'spade', value: 10 }
          ];

      var game = new Game(players);

      game.players[0].hand = playerHand;

      // Four-of-a-kind using two hand cards and two table cards
      game.tableCards = [
          { suit: 'heart', value: 10 },
          { suit: 'diamond', value: 9 },
          { suit: 'club', value: 2 },
          { suit: 'spade', value: 11 },
          { suit: 'heart', value: 14 }
      ];

      var twoPairsCheck = game.checkHand(game.players[0]);

      //pass condition
      expect(game.players[0].handValue[2]).to.equal('11');
      done();
    });

    // 5
    it('should check for a flush', function(done) {
        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }


        var playerHand = [
            { suit: 'spade', value: 5 },
            { suit: 'spade', value: 3 }
        ];

        var game = new Game(players);

        game.players[0].hand = playerHand;

        game.tableCards = [
            { suit: 'spade', value: 7 },
            { suit: 'spade', value: 9 },
            { suit: 'spade', value: 10 },
            { suit: 'heart', value: 8 },
            { suit: 'heart', value: 3 }
        ];

        var suits = game.checkHand(game.players[0]);

        expect(game.players[0].handValue[5]).to.equal(10);
        done();
    });

    it('should check for a straight', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var playerHand = [
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 3 }
        ];

        var game = new Game(players);

        game.players[0].hand = playerHand;

      // Four-of-a-kind using two hand cards and two table cards
        game.tableCards = [
            { suit: 'heart', value: 5 },
            { suit: 'diamond', value: 7 },
            { suit: 'club', value: 6 },
            { suit: 'spade', value: 8 },
            { suit: 'heart', value: 9 }
        ];

        var straight = game.checkHand(game.players[0]);

        //pas condition
        expect(game.players[0].handValue[4]).to.equal(9);
        done();
    })

    it('should return the players highest card', function(done){

      var players = []
      for (var i = 0; i < 5; i++){
        players.push(new Player());
      }

      var playerHand = [
          { suit: 'club', value: 2 },
          { suit: 'spade', value: 3 }
      ];

      var game = new Game(players);

      game.players[0].hand = playerHand;

    // Four-of-a-kind using two hand cards and two table cards
      game.tableCards = [
          { suit: 'heart', value: 5 },
          { suit: 'diamond', value: 7 },
          { suit: 'club', value: 11 },
          { suit: 'spade', value: 8 },
          { suit: 'heart', value: 9 }
      ];
      var high = game.checkHand(game.players[0]);

      //pass condition
      expect(game.players[0].handValue[0]).to.equal(11);
      done();
    });

    it('should check the players hand', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var playerHand = [
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 3 }
        ];

        var game = new Game(players);

        game.tableCards = [
            { suit: 'heart', value: 10 },
            { suit: 'heart', value: 11 },
            { suit: 'heart', value: 12 },
            { suit: 'heart', value: 13 },
            { suit: 'heart', value: 14 }
        ];


        game.players[0].hand = playerHand;

        game.checkHand(game.players[0]);

        expect(game.players[0].handValue[9]).to.equal(14);

        // console.log(players[0].handValue);

        done();
    });

    it('should return the index of the winner', function(done) {
        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);

        game.tableCards = [
            { suit: 'spade', value: 2 },
            { suit: 'heart', value: 9 },
            { suit: 'heart', value: 10 },
            { suit: 'heart', value: 11 },
            { suit: 'heart', value: 12 }
        ];

        players[0].hand = [
            { suit: 'heart', value: 13 },
            { suit: 'spade', value: 3 }
        ];

        players[1].hand = [
            { suit: 'heart', value: 13 },
            { suit: 'diamond', value: 3 }
        ];

        players[2].hand = [
            { suit: 'diamond', value: 14 },
            { suit: 'spade', value: 14 }
        ];

        players[3].hand = [
            { suit: 'club', value: 2 },
            { suit: 'heart', value: 3 }
        ];

        players[4].hand = [
            { suit: 'club', value: 2 },
            { suit: 'club', value: 3 }
        ];

        var winner = game.checkWinners();

        expect(winner).to.equal(0);
        done();
    })

});

describe('Computer', function() {

  it('should return a random name', function(done) {

    // var game = new Game(players);

    var computer = new Computer();
    var name = computer.name;
    expect(name).to.not.equal('');
    console.log(name);
    done();
  })


  // it ('should make the computer check during a game', function(done){
  //
  //   var players = []
  //   for (var i = 0; i < 3; i++){
  //     players.push(new Player());
  //   }
  //   for (var i =0; i < 2; i++){
  //     players.push(new computer());
  //   }
  //
  //
  //
  //
  //
  //
  // })



});
