var Game = require('../game/game.js');
var Player = require('../game/player.js');
var User = require('../models/user');

var tables = [];
var playerPool = [];

function joinPool(req, res) {
  if(req.body.user != undefined) {
    //in here we can check if we are going to do singl=e player or multiplayer
    //if (req.body.gameMode == "multi") etc etc etc
    getUserCredentials(req.body.user, addUserToPool, req, res);
  } else {
    res.send(403);
  }
}
//function Player(username, id, wallet, hand, handValue){

function addUserToPool(userinfo, req, res) {
  playerPool.push(userinfo);
  //here we can tell the user to wait for a game
  //but for now were gonna start a game, this is all fake data

  var players = [new Player(playerPool[0].username, playerPool[0].id, 10000, null, null), new Player(),  new Player(), new Player(), new Player()];

//, new Player(),  new Player(), new Player(), new Player()
  tables.push(new Game(players));

  var game = tables[tables.length - 1];

  game.startGame();
  var playerCards = game.getPlayerCards();

  req.session.gameId = tables[tables.length - 1];
  res.json(playerCards);
}

function controlGame(req, res) {
  if (req.body.user){
    // getUserCredentials(req.body.user, performCommand, req, res);
    var gameID = findUserInTable(req.body.user);
    if (gameID[0] != null){
      performCommand(gameID, req, res)
    }else{
      res.sendStatus(403);
    }
  }else{
    res.sendStatus(403);
  }
}

function findUserInTable(userID){
    for (var i = 0; i < tables.length; i++){
      var playerSeat = tables[i].checkPlayerOnTable(userID)
      if(playerSeat >= 0){
        return [i,playerSeat];
      }

    }
    return null;
}
function performCommand(gameID, req, res){
  if (tables[gameID[0]].players[gameID[1]].command == 'fold'){
    res.sendStatus(400);
  }else{
    if(req.body.bet > 0){
      tables[gameID[0]].actionBet(gameID[1], req.body.bet);
    }else if(req.body.call == 'true'){
      tables[gameID[0]].actionCall(gameID[1]);
    }else if(req.body.check == 'true'){
      tables[gameID[0]].actionCheck(gameID[1]);
    }else if(req.body.fold == 'true'){
      tables[gameID[0]].actionFold(gameID[1]);
    }
  res.json({"cards" : tables[gameID[0]].getTableCards(), "chips" : tables[gameID[0]].getTableChips(), "pot" : tables[gameID[0]].pot, "turn" : tables[gameID[0]].turnCounter, "winner" : tables[gameID[0]].winner });

  }

}

function getUserCredentials(userID, callback, req, res){
  User.findOne({ _id: userID }, function(err, user) {
    if (user) {
        // Sets the session user id to equal the logged in user id.
        callback(user, req, res);
    } else {
        if (err) {
            console.log(err.message);
        } else {
            console.log("There's no user with those credentials!????????");
        }
        res.send(403);
    }
});
}


function createGame(req, res) {
  var players = [];

  // for (var i = 0; i < 5; i++){
  //   players.push(new Player());
  // }
  // function Player(username, id, wallet, hand, handValue)
  players.push(new Player())
  tables.push(new Game(players));

  var game = tables[tables.length - 1];

  game.startGame();
  var playerCards = game.getPlayerCards();

  req.session.gameId = tables[tables.length - 1];
  res.json(playerCards);
}

function testGame(req, res) {
  //console.log(req.params.id);
  //console.log(req.body.test);
  var tbNumber = req.params.id;
  if (tbNumber >= 0 && tbNumber < tables.length) {
    var jsonReturn = null;
    switch (req.body.test) {
      case "deck":
        jsonReturn = tables[tbNumber].testDeck();
        break;
      default:
        console.log("Test command not recognised");
        break;
    }

    res.json(jsonReturn);
  } else {
    console.log("Test request unsuccessful - game doesn not exist");
    res.sendStatus(404);
  }
}


// Check winner test.
// Use this format in your POST requests:
/*
  {
    playerHands: {
      player0: [{cardObj}],
      player1: [{cardObj}],
      player2: [{cardObj}],
      player3: [{cardObj}],
      player4: [{cardObj}],
    },
    tableCards: [
      {cardObj},
      {cardObj} ...
    ]
  }
*/
function checkWinner(req, res) {
  console.log(req.body);
  var playerHand0 = req.body.playerHands.player0;
  var playerHand1 = req.body.playerHands.player1;
  var playerHand2 = req.body.playerHands.player2;
  var playerHand3 = req.body.playerHands.player3;
  var playerHand4 = req.body.playerHands.player4;
  var players = [];

  for (var i = 0; i < 5; i++){
    players.push(new Player());
  };

  var game = new Game(players);

  game.players[0].setHand(playerHand0);
  game.players[1].setHand(playerHand1);
  game.players[2].setHand(playerHand2);
  game.players[3].setHand(playerHand3);
  game.players[4].setHand(playerHand4);

  game.tableCards = req.body.tableCards;

  var winner = game.checkWinners()
  var handValues = [];

  for(var i = 0; i < players.length; i++) {
    handValues.push(players[i].handValue);
  }

  var response = {
    winner: winner,
    handValues: handValues
  }

  res.json(response);
}



module.exports = {
    join: joinPool,
    control: controlGame,
    test: testGame,
    checkWinner: checkWinner
}
