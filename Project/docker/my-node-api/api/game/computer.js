function Computer(){
  this.isAI = true;
  this.name = this.randomName();
  this.wallet = 1000;
  // this.stake = 0
  this.hand = [];
  this.handValue = [null, null, null, null, null, null, null, null, null, null];
  this.command = null;
  this.balls = Math.floor(Math.random()*100);
}



Computer.prototype.randomName = function(){
  var nameNum = Math.floor(Math.random()*17);
  simpsons = ['Homer','Moe','Lenny','Carl','Hank Scorpio','Barney','Charles M. Burns','Sideshow Bob','MoleMan','Nelson','DuffMan','Dr. Hibert','Disco Stu','Clancey Wiggam','Abe','Skinner','Willy'];
  // console.log(simpsons[nameNum]);
  return simpsons[nameNum];
}


Computer.prototype.setHand = function(cards){
  this.hand = cards;

  this.think();

}

Computer.prototype.think = function(){
  this.command = 'check';

}




module.exports = Computer;
