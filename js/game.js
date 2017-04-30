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

game.level = {
  currentLevel: 1,
  currentMonster: 0,
  requiredKilledMonsters: 10
}


/////////////
//FUNCTIONS//
/////////////

game.ui = {
  renderAll: function(){
    this.hp();
    this.gold();
    this.monsterCounter();
  },

  hp: function(){
      game.hpText = game.add.text(36, 38, game.player.currentHp, {
        font: "15px 'Jim Nightshade', cursive",
        fill: "#fff"});
  },

  gold: function(){
    game.goldText = game.add.text(207, 23, game.player.gold, {
            font: "25px 'Jim Nightshade', cursive",
            fill: "white"});
    game.goldText.anchor.setTo(0.5);
  },

  monsterCounter: function(){
    game.monsterCounter = game.add.text(465, 23, game.level.currentMonster, {
            font: "25px 'Jim Nightshade', cursive",
            fill: "#fff"});
    game.monsterCounter.anchor.setTo(0.5);
  },
}





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

game.infoWindow = {


  render: function(data){
    this.loadText(data);
    this.createText();
    this.panel.changeWidth(150);
    this.checkMouse();
    this.open();
  },

  panel: {
    width: 0,
    height: 0,

    resetSize: function(){
      this.resetWidth();
      this.resetHeight();
    },

    resetWidth: function(){
      this.width = 0;
    },

    resetHeight: function(){
      this.height = 0;
    },

    changeWidth: function(size){
      this.width += size;
    },
    changeHeight: function(size){
      this.height += size;
    }
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
    infoText = info.addChild(game.add.text(2, 2, this.details.text, {
        font: "15px 'Jim Nightshade', cursive",
        fill: "black"}));
  },

  createBitmap: function(){
    var infoWindow = game.add.bitmapData(this.panel.width, this.panel.height);
    infoWindow.ctx.beginPath();
    infoWindow.ctx.rect(0, 0, this.panel.width, this.panel.height);
    infoWindow.ctx.fillStyle = "brown";
    infoWindow.ctx.fill();
    return infoWindow;
  },

  windowSizeX: function(){
    textLength: this.getTextLength()
  },

  splitText: function(text){
    this.panel.resetSize();
    this.deleteText();
    var textToAdd = "";

    text.forEach(function(data, index){
      if(textToAdd.length < 20){
        textToAdd += data;
        textToAdd += " ";
        console.log(textToAdd);
      } else {
        textToAdd += "\n";
        game.infoWindow.addText(textToAdd);
        textToAdd = " ";
        game.infoWindow.panel.changeHeight(22);
      }
    });

    if(textToAdd.length > 0){
      this.addText(textToAdd);
      game.infoWindow.panel.changeHeight(22);
    }

  },

  createText: function(){
    var text = this.details.text.split(" ");
    this.splitText(text);
  },

  windowPosition: {
    x: function(){
        if ((game.width - game.infoWindow.details.x - game.infoWindow.panel.width) < 0){
          return game.width - game.infoWindow.panel.width - 20;
        } else {
          return game.infoWindow.details.x;
        }
    },

    y: function(){
      if((game.height - game.infoWindow.details.y - game.infoWindow.panel.height) <0){
        return game.height - game.infoWindow.panel.height - 20;
      } else {
        return game.infoWindow.details.y;
      }
    }
  },

  close: function(){
    info.destroy();
  }
}

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("city", cityState);

game.state.start("load");
