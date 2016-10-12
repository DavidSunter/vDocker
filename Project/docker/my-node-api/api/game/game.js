var Deck = require('./deck');
var Player = require('./player');

/*
  royal flush         100
  straight flush      90
  four of a kind      80
  full house          70
  flush               60
  straight            50
  3 of a kind         40
  two pair            30
  one pair            20
  high card           10
*/


function Game(players) {
    this.deck = new Deck();
    this.tableCards = [];
    this.players = players;
    this.pot = 0;
    this.turnCounter = null;
    this.gamePosition = 0;
    this.continueGame(this.gamePosition);
    this.lastBet = null;
    this.winner = null;
}

Game.prototype.startGame = function() {
    //Deal 2 cards to the players
    // this.dealPlayerCards();
    // this.turnCounter = 0;
    //placeBet(1);
    //deal table cards
    //this.dealTableCards(3);
    //placeBet(2);
    //deal turn card
    //this.dealTableCards(1);
    //placeBet(3);
    //deal river card
    //this.dealTableCards(1);
    //placeBet(4);
    //this.checkWinners();
    //payout
}

Game.prototype.checkPlayerOnTable = function(playerID) {
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == playerID) {
            return i;
        }
    }
    return false;
};

Game.prototype.actionBet = function(seatPosition, betAmount) {

    // console.log(seatPosition, betAmount);
    console.log("Player " + this.turnCounter + " has just bet " + betAmount);

      this.lastBet = betAmount;
      this.players[this.turnCounter].command = betAmount;
      this.pot += parseInt(betAmount);
      this.turnCounter++;
      // this.turnCounter = 5;
      this.actionTime(this.turnCounter);
};

Game.prototype.actionCall = function(seatPosition) {
    console.log("Player " + this.turnCounter + " has just called");
      this.players[this.turnCounter].command = this.lastBet;
      this.turnCounter++;
      // this.turnCounter = 5;
      this.actionTime(this.turnCounter);
};
Game.prototype.actionFold = function(seatPosition) {
    console.log("Player " + this.turnCounter + " has just folded");
      this.players[this.turnCounter].command = 'fold';
      this.players.hand = null;
      this.turnCounter++;
      // this.turnCounter = 5;
      this.actionTime(this.turnCounter);
};
Game.prototype.actionCheck = function(seatPosition) {
    // console.log(seatPosition + ' check')
      console.log("Player " + this.turnCounter + " has just checked");
      this.players[this.turnCounter].command= 'check';
      this.turnCounter++;
      // this.turnCounter = 5;
      this.actionTime(this.turnCounter);
};



/*Game.prototype.checkFinished = function(seatPosition) {
  var check = true;

  for (var i=0; i < this.players[seatPosition].length; i++){
    if (this.players[i].isAI != true){
      if (this.players[i].command != 'check') {
        check = false;
        break;
      }
    }
  }

  if (check = true){
    return computer.think();
  };
}*/

Game.prototype.checkAI = function(seatPosition){

  // var check = true;
  //
  // for (var i=0; i < this.players.length; i++){
  //   if (this.players[seatPosition].command != 'check'){
  //     check = false;
  //     break;
  //   }
  // }
  //
  // if (check = true){
  //   return computer.think();
  // };

  if (seatPosition + 1 < players.length) {
    if (this.players[seatPosition + 1].isAI == true) {
      //do stuff
      this.checkAI(seatPosition + 1);
    }
  }

}



Game.prototype.actionTime = function(seatNumber) {
  if(this.turnCounter >= this.players.length) {
      console.log("Betting has finished, moving on");
      this.turnCounter = null;
      this.continueGame();
  }
};

Game.prototype.resetCommands = function () {
  for( var i = 0; i < this.players.length ; i++){
    if (this.players[i].command != 'fold'){
      this.players[i].command = null;
    }
  }
};

Game.prototype.continueGame = function() {
  console.log("Current game position: " + this.gamePosition);
    switch (this.gamePosition) {
        case (0):
            this.dealPlayerCards();
            this.turnCounter= 0;
            this.resetCommands();
            break;

        case (1):
            // dealFlop
            this.dealTableCards(3);
            this.turnCounter= 0;
            this.resetCommands();
            break;

        case (2):
            this.dealTableCards(1);
            this.turnCounter= 0;
            this.resetCommands();
            break;

        case (3):
            // dealRiver
            this.dealTableCards(1);
            this.turnCounter= 0;
            this.resetCommands();
            break;
        case (4):
            // decide winner
            var winner = this.checkWinners();
            console.log("Player " + (winner + 1) + " wins!!!!");
            this.winner = winner + 1;
            break;
    }
    this.gamePosition++;
    this.lastBet = null;
};

Game.prototype.dealPlayerCards = function() {
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].addCard(this.deck.popFromDeck());
        this.players[i].addCard(this.deck.popFromDeck());
    }
}

Game.prototype.dealTableCards = function(num) {
    for (var i = 0; i < num; i++) {
        if (this.deck.getLength() > 5) {
            this.tableCards.push(this.deck.popFromDeck());
        }
    }
}

Game.prototype.payout = function(winners) {
    var payout = this.pot / winners.length;

    return payout
}

Game.prototype.getPlayerCards = function() {
    var playerCards = [];

    for (var i = 0; i < this.players.length; i++) {
        playerCards.push(this.players[i].getHand());
    }
    return playerCards;
}

Game.prototype.getTableCards = function() {
    return this.tableCards;
}

Game.prototype.getTableChips = function() {
    var playerBets = [null,null,null,null,null];

    for (var i = 0; i < this.players.length; i ++){
      if (typeof(playerBets[i] = this.players[i].command) == 'number'){
        playerBets[i] = this.players[i].command;
      }
    }
    return playerBets;
}


Game.prototype.getPlayers = function() {
    return this.players;
}

Game.prototype.checkWinners = function() {
  for (var i = 0; i < this.players.length; i++) {
    //players[i].handValue = this.checkHand(players[i]);
    this.checkHand(this.players[i]);
  }

	var handIndexes = [];


	// For each player, get their hand value index.
	// The player with the highest index wins.
	// Need to add logic for players with the same index.
	for (var i = 0; i < this.players.length; i++) {
		for (var j = 0; j < 10; j++) {
			if (this.players[i].handValue[j] != null) {
				handIndexes.push({player : i, index : j, highCard : this.players[i].handValue[j] });

			}
		}
	}

  var largest=[0];
 //find the largest num;
 for(var i=0;i<handIndexes.length;i++){
   var comp=(handIndexes[i].index-largest[0])>0;
      if(comp){
	  largest =[];
	  largest.push(handIndexes[i].index);
	  }
 }

 var highestIndex = [];

 for(var i=0;i<handIndexes.length;i++){
    var comp=handIndexes[i].index-largest[0]==0;
		if(comp){
			highestIndex.push(handIndexes[i]);
		}
 }

  if (highestIndex.length == 1) {
      return highestIndex[0].player;
    } else if (highestIndex.length > 1) {
      handIndexes = []
      var largest=[0];
      //find the largest num;
     for(var i=0;i<highestIndex.length;i++){
       var comp=(highestIndex[i].highCard-largest[0])>0;
          if(comp){
    	       largest =[];
    	      largest.push(highestIndex[i]);
    	    }
      }
			return largest[0].player;
    }
  }



Game.prototype.checkHand = function(player) {
    var playerHand = player.getHand();
    var check = false;
    var cardsToCheck = playerHand.concat(this.tableCards);

    check = this.checkRoyalFlush(playerHand);
    if (!!check) {
        player.setHandValue(9, check);
        return true;
    }
    check = this.checkStraightFlush(playerHand);
    if (!!check) {
        player.setHandValue(8, check);
        return true;
    }

    // Four of a kind
    check = this.checkMultiple(cardsToCheck, 4);
    if (!!check) {
        player.setHandValue(7, check);
        return true;
    }

    check = this.checkFullHouse(playerHand);
    if (!!check) {
        player.setHandValue(6, check);
        return true;
    }

    check = this.checkFlush(playerHand);
    if (!!check) {
        player.setHandValue(5, check);
        return true;
    }

    check = this.straight(playerHand);
    if (!!check) {
        player.setHandValue(4, check);
        return true;
    }

    // Three of a kind
    check = this.checkMultiple(cardsToCheck, 3);
    if (!!check) {
        player.setHandValue(3, check);
        return true;
    }

    check = this.checkTwoPairs(playerHand);
    if (!!check) {
        player.setHandValue(2, check);
        return true;
    }

    // Check Pair
    check = this.checkMultiple(cardsToCheck, 2);
    if (!!check) {
        player.setHandValue(1, check);
        return true;
    }

    check = this.highCard(playerHand);
    if (!!check) {
        player.setHandValue(0, check);
        return true;
    }
}

Game.prototype.sortNumber = function(a, b) {
    return a.value - b.value;
}

Game.prototype.checkRoyalFlush = function(playerHand) {
    //check if hand has 5 of the same suit
    //heart, diamond, spade, club
    var suits = [
        [],
        [],
        [],
        []
    ];
    //checks player hand
    for (var i = 0; i < 2; i++) {
        switch (playerHand[i].suit) {
            case "heart":
                suits[0].push(playerHand[i]);
                break;
            case "diamond":
                suits[1].push(playerHand[i]);
                break;
            case "spade":
                suits[2].push(playerHand[i]);
                break;
            case "club":
                suits[3].push(playerHand[i]);
                break;

        }
    }


	//checks table cards
	for (var i = 0; i < this.tableCards.length; i++) {
		switch (this.tableCards[i].suit) {
			case "heart":
				suits[0].push(this.tableCards[i]);
				break;
			case "diamond":
				suits[1].push(this.tableCards[i]);
				break;
			case "spade":
				suits[2].push(this.tableCards[i]);
				break;
			case "club":
				suits[3].push(this.tableCards[i]);
				break;
		}
	}


    //checks table cards
    for (var i = 0; i < 5; i++) {
        switch (this.tableCards[i].suit) {
            case "heart":
                suits[0].push(this.tableCards[i]);
                break;
            case "diamond":
                suits[1].push(this.tableCards[i]);
                break;
            case "spade":
                suits[2].push(this.tableCards[i]);
                break;
            case "club":
                suits[3].push(this.tableCards[i]);
                break;
        }
    }

    var cardsToCheck = null;

    for (var i = 0; i < 4; i++) {
        if (suits[i].length >= 5)
            cardsToCheck = suits[i];
    }

    //if we have 5 of the same suit, we can get a royal flush
    if (cardsToCheck != null) {
        var checkStraight = [false, false, false, false, false];
        for (var i = 0; i < cardsToCheck.length; i++) {
            switch (cardsToCheck[i].value) {
                case 10:
                    checkStraight[0] = true;
                    break;
                case 11:
                    checkStraight[1] = true;
                    break;
                case 12:
                    checkStraight[2] = true;
                    break;
                case 13:
                    checkStraight[3] = true;
                    break;
                case 14:
                    checkStraight[4] = true;
                    break;
                default:
                    break;
            }
        }

		if (checkStraight[0] == true && checkStraight[1] == true && checkStraight[2] == true && checkStraight[3] == true && checkStraight[4] == true) {
      return 14;
		} else {
      return false;
		}
	} else {
    return false;
  }

}

Game.prototype.checkStraightFlush = function(playerHand) {
    var suits = [
        [],
        [],
        [],
        []
    ];
    //checks player hand
    for (var i = 0; i < 2; i++) {
        switch (playerHand[i].suit) {
            case "heart":
                suits[0].push(playerHand[i]);
                break;
            case "diamond":
                suits[1].push(playerHand[i]);
                break;
            case "spade":
                suits[2].push(playerHand[i]);
                break;
            case "club":
                suits[3].push(playerHand[i]);
                break;

        }
    }
    //checks table cards
    for (var i = 0; i < 5; i++) {
        switch (this.tableCards[i].suit) {
            case "heart":
                suits[0].push(this.tableCards[i]);
                break;
            case "diamond":
                suits[1].push(this.tableCards[i]);
                break;
            case "spade":
                suits[2].push(this.tableCards[i]);
                break;
            case "club":
                suits[3].push(this.tableCards[i]);
                break;
        }
    }

    var cardsToCheck = null;

    for (var i = 0; i < 4; i++) {
        if (suits[i].length >= 5)
            cardsToCheck = suits[i];
    }

    if (cardsToCheck != null) {
        cardsToCheck.sort(this.sortNumber);
        var straightCheck = [];

        for (var i = 0; i < cardsToCheck.length - 1; i++) {
            if ((cardsToCheck[i].value - cardsToCheck[i + 1].value) == -1) {
                straightCheck.push(cardsToCheck[i].value);
            } else if (straightCheck.length != 4) {
                straightCheck = [];
            }
        }

        if (straightCheck.length == 4) {
            return (straightCheck[straightCheck.length - 1] + 1);
        }
    }

    return false;
}

Game.prototype.checkFlush = function(playerHand) {
    playerHand.sort(this.sortNumber);
    var suits = [
        [],
        [],
        [],
        []
    ];
    for (var i = 0; i < 2; i++) {
        switch (playerHand[i].suit) {
            case "heart":
                suits[0].push(playerHand[i]);
                break;
            case "diamond":
                suits[1].push(playerHand[i]);
                break;
            case "spade":
                suits[2].push(playerHand[i]);
                break;
            case "club":
                suits[3].push(playerHand[i]);
                break;
        }
    }

    //checks table cards
    for (var i = 0; i < 5; i++) {
        switch (this.tableCards[i].suit) {
            case "heart":
                suits[0].push(this.tableCards[i]);
                break;
            case "diamond":
                suits[1].push(this.tableCards[i]);
                break;
            case "spade":
                suits[2].push(this.tableCards[i]);
                break;
            case "club":
                suits[3].push(this.tableCards[i]);
                break;
        }
    }


	for (var i = 0; i < 4; i++) {
		if (suits[i].length >= 5)
			return suits[i][suits[i].length - 1].value;
	}
  return false;

    for (var i = 0; i < 4; i++) {
        if (suits[i].length >= 5)
            return suits[i][suits[i].length - 1].value;
    }
    return false;



}

Game.prototype.checkMultiple = function(cardsToCheck, num) { //applies for fours, three of a kind and doubles


  cardsToCheck.sort(this.sortNumber);


    cardsToCheck.sort(this.sortNumber);



    var counts = {},
        i, value;
    // We did not copy this
    for (i = 0; i < cardsToCheck.length; i++) {
        value = cardsToCheck[i].value;
        if (typeof counts[value] === "undefined") {
            counts[value] = 1;
        } else {
            counts[value]++;
        }
    }

    var values = Object.keys(counts).map(function(k) {
        return counts[k]
    });

    for (var i = 0; i < values.length; i++) {
        if (values[i] == num) {
            var key = Object.keys(counts).filter(function(key) {
                return counts[key] === values[i]
            })[0];
            return key;
        }
    }
    return false;
}

Game.prototype.checkFullHouse = function(playerHand) {

    var cardsToCheck = playerHand.concat(this.tableCards);

    cardsToCheck.sort(this.sortNumber);

    var firstRemove = this.checkMultiple(cardsToCheck, 3);

    if (firstRemove != false) {
        for (var i = 0; i < cardsToCheck.length; i++) {
            if (cardsToCheck[i].value == firstRemove) {
                cardsToCheck.splice(i, 1);
                i--;
            }
        }

        var secondRemove = this.checkMultiple(cardsToCheck, 2);

        for (var i = 0; i < cardsToCheck.length; i++) {
            if (cardsToCheck[i].value == secondRemove) {
                cardsToCheck.splice(i, 1);
                i--;
            }
        }

        if (cardsToCheck.length <= 2) {
            return firstRemove;
        }
    }

    return false;
}

Game.prototype.straight = function(playerHand) {

    var cardsToCheck = playerHand.concat(this.tableCards);

    cardsToCheck.sort(this.sortNumber);
    var straightCheck = [];

    for (var i = 0; i < cardsToCheck.length - 1; i++) {
        if ((cardsToCheck[i].value - cardsToCheck[i + 1].value) == -1) {
            straightCheck.push(cardsToCheck[i].value);
        } else if (straightCheck.length != 4) {
            straightCheck = [];
        }
    }

    if (straightCheck.length == 4) {
        return straightCheck[straightCheck.length - 1] + 1;
    }
    return false;
}

Game.prototype.checkTwoPairs = function(playerHand) {

    var cardsToCheck = playerHand.concat(this.tableCards);

    cardsToCheck.sort(this.sortNumber);

    var firstRemove = this.checkMultiple(cardsToCheck, 2);


    if (firstRemove != false) {
        for (var i = 0; i < cardsToCheck.length; i++) {
            if (cardsToCheck[i].value == firstRemove) {
                cardsToCheck.splice(i, 1);
                i--;
            }
        }

        secondRemove = this.checkMultiple(cardsToCheck, 2);

        for (var i = 0; i < cardsToCheck.length; i++) {
            if (cardsToCheck[i].value == secondRemove) {
                cardsToCheck.splice(i, 1);
                i--;
            }
        }

        if (cardsToCheck.length <= 3) {
            if (firstRemove > secondRemove) {
                return firstRemove;
            } else {
                return secondRemove;
            }
        }
    }

    return false;
}

Game.prototype.highCard = function(playerHand) {

    var cardsToCheck = playerHand.concat(this.tableCards);

    cardsToCheck.sort(this.sortNumber);
    var highCard = cardsToCheck[cardsToCheck.length - 1];

    return highCard.value;

}

//############### TESTING FUNCTIONS

Game.prototype.testDeck = function() {
 return this.deck;
}

module.exports = Game;
