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

var panelWidth = 50;
var panelHeight = 50;

game.infoWindow = {


  render: function(data){
    this.loadText(data);
    this.createText();
    this.checkMouse();
    this.open();
  },

  details: {
    x: 0,
    y: 0,
    text: ""
  },

  loadText: function(text){
    this.details.text = text;
  },

  deleteText: function(){
    this.details.text = "";
  },

  addText: function(textToAdd){
    this.details.text += textToAdd;
  },

  changeDetails: function(details, cords){
    if(details === "x"){
      this.details.x = cords;
    } else if (details === "y") {
      this.details.y = cords;
    }
  },

  checkMouse: function(){
    document.addEventListener("mousemove", this.catchMouse, false);
  },

  catchMouse: function(e){
    game.infoWindow.changeDetails("x", e.clientX);
    game.infoWindow.changeDetails("y", e.clientY -20);
    info.position.setTo(game.infoWindow.windowPosition.x(), game.infoWindow.windowPosition.y());
  },

  open: function(){
    info = game.add.sprite(this.windowPosition.x(), this.windowPosition.y(), this.createBitmap());
    infoText = info.addChild(game.add.text(0, 0, this.details.text, {
        font: "15px 'Jim Nightshade', cursive",
        fill: "black"}));
  },

  createBitmap: function(){
    var infoWindow = game.add.bitmapData(50, 15);
    infoWindow.ctx.beginPath();
    infoWindow.ctx.rect(0, 0, 50, 15);
    infoWindow.ctx.fillStyle = "brown";
    infoWindow.ctx.fill();
    return infoWindow;
  },

  windowSizeX: function(){
    textLength: this.getTextLength()
  },

  splitText: function(text){
    this.deleteText();
    var textToAdd = "";
    text.forEach(function(data, index){
      if(textToAdd.length < 10){
        textToAdd += data;
        textToAdd += " ";
        console.log(textToAdd);
      } else {
        textToAdd += "\n";
        game.infoWindow.addText(textToAdd);
        textToAdd = " ";
      }
    });

    if(textToAdd.length > 0){
      this.addText(textToAdd);
    }
    console.log(this.details.text);
  },

  createText: function(){
    var text = this.details.text.split(" ");
    this.splitText(text);
  },

  windowPosition: {
    x: function(){
        if ((game.width - game.infoWindow.details.x - panelWidth) < 0){
          //console.log("nie miesci sie! X");
          return game.width - panelWidth - 20;
        } else {
          return game.infoWindow.details.x;
        }
    },

    y: function(){
      if((game.height - game.infoWindow.details.y - panelHeight) <0){
        //console.log("nie miesci sie! Y");
        return game.height - panelHeight - 20;
      } else {
        return game.infoWindow.details.y;
      }
    }
  },


}

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("city", cityState);

game.state.start("load");
