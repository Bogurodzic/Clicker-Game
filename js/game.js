var game = new Phaser.Game(708, 511, Phaser.Auto, "gameWindow");

////////////
//OBJECTS//
///////////

game.player = {
    maxHp: 100,
    currentHp: 100,
    clickDamage: 1,
    dps: 5,
    criticalChance: 0.7,
    gold: 0
};


/////////////
//FUNCTIONS//
/////////////

game.renderHP = function(){
    game.hpText = game.add.text(36, 38, game.player.currentHp, {
      font: "15px 'Jim Nightshade', cursive",
      fill: "#fff"});
  };

game.renderGold = function(){
  game.goldText = game.add.text(207, 23, game.player.gold, {
          font: "25px 'Jim Nightshade', cursive",
          fill: "white"});
  game.goldText.anchor.setTo(0.5);
};


var inventoryVisible = false;
game.toggleInventory = function() {
    if (inventoryVisible === false){
        this.inventory.x = this.game.world.centerX;
        this.inventory.y = this.game.world.centerY;
        inventoryVisible = true;
    } else if (inventoryVisible === true){
        this.inventory.x = -1000;
        this.inventory.y = -1000;
        inventoryVisible = false;
    };
};


var info;
var x = 0;
var y = 0;

game.infoWindow = {

  info: "",
  x: 0,
  y: 0,

  render: function(){
    this.checkMouse();
    this.open();
  },

  make: function(){
    var infoWindow = game.add.bitmapData(50, 15);
    infoWindow.ctx.beginPath();
    infoWindow.ctx.rect(0, 0, 50, 15);
    infoWindow.ctx.fillStyle = "brown";
    infoWindow.ctx.fill();
    return infoWindow;
  },

  checkMouse: function(){
    document.addEventListener("mousemove", this.catchMouse, false);
  },

  catchMouse: function(e){
    x = e.clientX;
    y = e.clientY -20;
    info.position.setTo(x, y);
  },

  open: function(){
    info = game.add.sprite(x, y, this.make());
    infoText = info.addChild(game.add.text(0, 0, this.infoText, {
        font: "15px 'Jim Nightshade', cursive",
        fill: "black"}));
  }
}
game.infoWindowOpen = function(){
  //infoWindoWSize(this.infoText);
  var infoWindow = game.add.bitmapData(50, 15);
  infoWindow.ctx.beginPath();
  infoWindow.ctx.rect(0, 0, 50, 15);
  infoWindow.ctx.fillStyle = "brown";
  infoWindow.ctx.fill();

  document.addEventListener('mousemove', onMouseMove, false);

  function onMouseMove(e){
      x = e.clientX;
      y = e.clientY -20;
      info.position.setTo(x, y);
  };

  info = game.add.sprite(x, y, infoWindow);
  infoText = info.addChild(game.add.text(0, 0, this.infoText, {
      font: "15px 'Jim Nightshade', cursive",
      fill: "black"}));
};

function infoWindowSize(text){
  let textSize = text.length;

}

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("city", cityState);

game.state.start("load");
