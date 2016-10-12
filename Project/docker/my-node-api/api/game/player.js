function Player(username, id, wallet){
  this.isAI = false;
  this.username = username;
  this.id = id;
  this.wallet = wallet;
  // this.stake = 0
  this.hand = [];
  this.handValue = [null, null, null, null, null, null, null, null, null, null];
  this.command = null;
}

Player.prototype.getID = function() {
  return this.id;
}

Player.prototype.addCard = function(card){
  this.hand.push(card);
}

Player.prototype.setHand = function(cards){
  this.hand = cards;
}

Player.prototype.getHand = function(){
  return this.hand;
}

Player.prototype.setHandValue = function(index, highCard){
  this.handValue[index] = highCard;
}

module.exports = Player;
