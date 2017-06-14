var game = new Phaser.Game(708, 511, Phaser.Auto, "gameWindow");



game.player = {
    maxHp: 100,
    currentHp: 100,
    clickDamage: 1,
    //idle damage
    dps: 5,
    criticalChance: 0.7,
    gold: 500,
    armor: 0,

    calculateDmg: function() {
      if(game.equipment.playerEquipment.weapon){
        return this.clickDamage + game.equipment.playerEquipment.weapon.clickDamage;
      } else {
        return this.clickDamage;
      }
    }
};

game.level = {
  currentLevel: 1,
  currentMonster: 0,
  requiredKilledMonsters: 10,
  bossFlag: false,

  addMonster: function(){
    this.currentMonster++;
    if (this.currentMonster >= this.requiredKilledMonsters && this.bossFlag === false){
      this.unlockBossOption();
      this.changeBossFlag(true);
    }
  },

  checkBossFlag: function(){

    if(this.bossFlag){
      this.unlockBossOption();
    }

  },

  changeBossFlag: function(flag){
    this.bossFlag === flag;
  },

  unlockBossOption(){
    let bossOption = game.add.text(game.world.centerX, 60, "FACE BOSS", {
      font: "24px 'Jim Nightshade', cursive",
      fill: "red"});
      bossOption.anchor.setTo(0.5);
      bossOption.inputEnabled = true;
      bossOption.events.onInputDown.add(this.spawnBoss, this);
      bossOption.events.onInputDown.add(function(){
        bossOption.destroy();
      }, this);
  },

  spawnBoss: function(){
    playState.monster.hideMonster();
    playState.monster.onDpsFlag = false;
    playState.boss.placeBoss();
  },

  nextLevel: function(){
    this.currentLevel++;
    this.currentMonster = 0;
    game.ui.updateLevel();
    this.raiseRequiredMonsters(this.requiredKilledMonsters);
    game.ui.monsterCounterUpdate();
  },

  raiseRequiredMonsters: function(monstersAmount){
    this.requiredKilledMonsters = monstersAmount + (Math.round(Math.random() * 10));
  }

}

game.monstersList = [
    {monsterName: "Skeleton", monsterKey: "bone", maxHp: 10},
    {monsterName: "Orc", monsterKey: "orc", maxHp: 10},
    {monsterName: "Fire Dragon", monsterKey: "dragon", maxHp: 10},
    {monsterName: "Air Dragon", monsterKey: "dragon-air", maxHp: 10},
    {monsterName: "Dark Dragon", monsterKey: "dragon-dark", maxHp: 10},
    {monsterName: "Rock Dragon", monsterKey: "dragon-rock", maxHp: 10},
    {monsterName: "Sapphire Dragon", monsterKey: "dragon-sapphire", maxHp: 10},
];

game.bossList = [
  {bossName: "Tom", bossKey: "bone", maxHp: 10},
  {bossName: "Adam", bossKey: "bone", maxHp: 10},
    {bossName: "Rom", bossKey: "bone", maxHp: 10}
]


game.ui = {
  renderAll: function(){
    this.frame();
    this.hp();
    this.gold();
    this.level();
    this.updateLevel();
    this.monsterCounter();
  },

  frame: function(){
    game.uiFrame = game.add.image(0, 0, "ui-frame");
    game.uiFrame.scale.setTo(1.2);
  },

  hp: function(){
      game.hpText = game.add.text(36, 38, game.player.currentHp, {
        font: "15px 'Jim Nightshade', cursive",
        fill: "#fff"});
  },

  level: function(){
    game.levelText = game.add.text(game.world.centerX, 25, "Level: " + game.level.currentLevel, {
      font: "24px 'Jim Nightshade', cursive",
      fill: "#fff"});
    game.levelText.anchor.setTo(0.5);

  },

  updateLevel:function(){
    game.levelText.text = "Level: " + game.level.currentLevel;
  },

  gold: function(){
    game.goldText = game.add.text(207, 23, game.player.gold, {
            font: "25px 'Jim Nightshade', cursive",
            fill: "white"});
    game.goldText.anchor.setTo(0.5);
  },

  updateGold: function(){
    game.goldText.text = game.player.gold;
  },

  monsterCounter: function(){
    game.monsterCounter = game.add.text(465, 23, game.level.currentMonster +"/"+game.level.requiredKilledMonsters, {
            font: "25px 'Jim Nightshade', cursive",
            fill: "#fff"});
    game.monsterCounter.anchor.setTo(0.5);
  },

  monsterCounterUpdate: function(){
    game.monsterCounter.text = game.level.currentMonster +"/"+game.level.requiredKilledMonsters;
  },
}



game.inventory = {
  inventoryPanel: undefined,
  inventoryVisibility: false,

  create: function(){
    this.inventoryPanel = game.add.sprite(-1000, -1000, "inventory");
    this.inventoryPanel.anchor.setTo(0.5);
    this.inventoryPanel.scale.setTo(0.95);
    game.stats.createAll();
  },

  toggleInventory: function(){
    if(this.inventoryVisibility === false){
        this.inventoryPanel.x = game.world.centerX;
        this.inventoryPanel.y = game.world.centerY;
        this.inventoryVisibility = true;
        game.equipment.renderEquipment();
        game.stats.updateAll();
    } else if (this.inventoryVisibility === true){
        this.inventoryPanel.x = -1000;
        this.inventoryPanel.y = -1000;
        this.inventoryVisibility = false;
    };
  }

}

game.stats = {
  createAll:function(){
    this.createDps();
    this.createClickDmg();
    this.createArmor();
  },

  updateAll: function(){
    this.updateDps();
    this.updateClickDmg();
    this.updateArmor();
  },

  createDps: function(){
    this.dps = game.inventory.inventoryPanel.addChild(game.add.text(-150, -103, "Dps: " + game.player.dps, {
        font: "20px 'Jim Nightshade', cursive",
        fill: "white"}));
  },

  updateDps: function(){
    this.dps.text = "Dps: " + game.player.dps;
  },

  createClickDmg: function() {
    this.clickDmg = game.inventory.inventoryPanel.addChild(game.add.text(-55, -103, "Click: " + game.player.clickDamage + "DMG", {
        font: "20px 'Jim Nightshade', cursive",
        fill: "white"}));
  },

  updateClickDmg: function(){
    this.clickDmg.text = "Click: " + game.player.clickDamage + "DMG";
  },

  createArmor: function() {
    this.armor = game.inventory.inventoryPanel.addChild(game.add.text(70, -103, "Armor: " + game.player.armor, {
        font: "20px 'Jim Nightshade', cursive",
        fill: "white"}));
  },

  updateArmor: function() {
    this.armor.text = "Armor: " + game.player.armor;
  }
}

game.equipment = {
  equipmentPanel: undefined,

  equipmentList: {
    weapons: [
      {name: "sword", icon: "icon-sword", level: 1, cost: 10, clickDamage:1, idleDamage:1, updateEffect: function(){this.clickDamage++; this.idleDamage++}, isBought: false, type: "weapon"},
      {name: "hammer", icon: "icon-hammer", level: 1, cost: 100, clickDamage:10, idleDamage:10, updateEffect: function(){this.clickDamage += 5; this.idleDamage += 5}, isBought: false, type: "weapon"}
    ],
    shields: [
      {name: "wooden shield", icon: "icon-shield-wooden", level: 1, cost: 10, isBought: false, type: "shield"},
      {name: "common shiled", icon: "icon-shield-common", level: 1, cost: 100, isBought: false, type: "shield"}
    ],
    armors: [
      {name: "armor", icon: "icon-armor", level: 1, cost: 10, isBought: false, type: "armor"}
    ],
    helmets: [
      {name: "helmet", icon: "icon-helmet", level: 1, cost: 10, isBought: false, type: "helmet"}
    ],
    boots: [
      {name: "boots", icon: "icon-boots", level: 1, cost: 10, isBought: false, type: "boots"}
    ]
  },

  nextItem: function(item, name){
    if(item[item.length-1] !== "s"){
      item += "s";
    }

    let isFound = false;
    game.equipment.equipmentList[item].forEach(function(data, index) {
      if(data.name === name){
        let itemList = game.equipment.equipmentList[item];
        game.equipment.isNextBought(itemList, index);
      }

    })

  },


  isNextBought: function(list, index){
    if(list[index+1] && list[index+1].isBought){
      game.equipment.changeItem(list[index+1].type, list[index+1]);
      game.equipment.renderEquipment();
    } else if(list[index+1] && !list[index+1].isBought) {
      game.equipment.isNextBought(list, index+1);
    } else {
      game.equipment.isNextBought(list, -1);
    }
  },

  playerEquipment: {
    weapon: undefined,
    shield: undefined,
    armor: undefined,
    helmet: undefined,
    legs: undefined,
    boots: undefined
  },

  changeItem: function(equipment, item){
    this.playerEquipment[equipment] = item;
  },

  renderEquipment: function() {
    if(this.playerEquipment.weapon){
      game.equipment.renderItem("weapon", -115, 10);
    }
    if(this.playerEquipment.shield){
      game.equipment.renderItem("shield", 45, 10);
    }
    if(this.playerEquipment.armor){
      game.equipment.renderItem("armor", -35, 10);
    }
    if(this.playerEquipment.helmet){
      game.equipment.renderItem("helmet", -35, -65);
    }
    if(this.playerEquipment.legs){

    }
    if(this.playerEquipment.boots){
      game.equipment.renderItem("boots", -35, 85);
    }
  },



  renderItem: function(item, x, y){
    if(this[item]){
      this.playerEquipment[item].destroy;
    };
    this[item] = this.equipmentPanel.addChild(game.add.sprite(x, y, this.playerEquipment[item].icon));
    this[item].scale.setTo(0.5);
    this[item].inputEnabled = true;
    let currentItem = game.equipment.playerEquipment[item]
    this[item].events.onInputOver.add(function(){
      game.infoWindow.render(currentItem.name);
    }, game.infoWindow);
    this[item].events.onInputOut.add(game.infoWindow.close, this);
    this[item].events.onInputDown.add(function(){
      game.equipment.nextItem(currentItem.type, currentItem.name);
      //game.equipment.renderEquipment();
    }, game.equipment);
    this[item].events.onInputDown.add(game.infoWindow.close, this);
  },

  create: function(){
    this.equipmentPanel = game.inventory.inventoryPanel.addChild(game.add.group());
  },
}

game.runes = {
  create: function(){
    this.runePanel = game.inventory.inventoryPanel.addChild(game.add.group());
  },

  runesList: [
    {runeName: "Rune 1", runeKey: "rune1", description: "Wind Rune", runeHandler: function(rune){
      rune.x = 10;
    }},
    {runeName: "Rune 2", runeKey: "rune2", description: "Earth Rune", runeHandler: function(rune){
      rune.x = 10;
    }},
    {runeName: "Rune 3", runeKey: "rune3", description: "Blood Rune", runeHandler: function(rune){
      rune.x = 10;
    }}
  ],

  renderRunes: function(){
    var rune;
    this.runesList.forEach(function(data, index){
      rune = game.runes.runePanel.create(127, -35 - (-58 * index), data.runeKey);
      rune.details = data;
      rune.inputEnabled = true;

      rune.events.onInputDown.add(game.runes.runeToggle, rune);
      rune.events.onInputDown.add(game.infoWindow.close, this);
      rune.events.onInputOver.add(function(){
        game.infoWindow.render(data.description);
      }, game.infoWindow);
      rune.events.onInputOut.add(game.infoWindow.close, this);
    });
  },

  runeToggle: function(rune){
    rune.details.runeHandler.call(this, rune);
  }

}



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

game.localStorage = {
  save: function(){
    //save world info
    localStorage.level = game.level.currentLevel;
    localStorage.killedMonsters = game.level.currentMonster;
    localStorage.requiredKilledMonsters = game.level.requiredKilledMonsters;
    localStorage.bossFlag = game.level.bossFlag;

    //save basic player stats
    localStorage.maxHp = game.player.maxHp;
    localStorage.currentHp = game.player.currentHp;
    localStorage.clickDamage = game.player.clickDamage;
    localStorage.dps = game.player.dps;
    localStorage.gold = game.player.gold;

    //save objects
    localStorage.equipmentList = JSON.stringify(game.equipment.equipmentList);
    localStorage.playerEquipment = JSON.stringify(game.equipment.playerEquipment);

  },

  load: function() {
    //load world info
    if(localStorage.getItem("level")){
      game.level.currentLevel = localStorage.getItem("level");
    }
    if(localStorage.getItem("killedMonsters")){
      game.level.currentMonster = localStorage.getItem("killedMonsters");
    }
    if(localStorage.getItem("requiredKilledMonsters")){
      game.level.requiredKilledMonsters = localStorage.getItem("requiredKilledMonsters");
    }
    if(localStorage.getItem("bossFlag")){
      game.level.bossFlag = localStorage.getItem("bossFlag");
    }

    //load basic player stats
    if(localStorage.getItem("maxHp")){
      game.player.maxHp = localStorage.getItem("maxHp");
    }
    if(localStorage.getItem("currentHp")){
      game.player.currentHp = localStorage.getItem("currentHp");
    }
    if(localStorage.getItem("clickDamage")){
      game.player.clickDamage = localStorage.getItem("clickDamage");
    }
    if(localStorage.getItem("dps")){
      game.player.dps = localStorage.getItem("dps");
    }
    if(localStorage.getItem("gold")){
      game.player.gold = localStorage.getItem("gold");
    }

    //load objects
    if(localStorage.getItem("equipmentList")){
      game.equipment.equipmentList = JSON.parse(localStorage.getItem("equipmentList"));
    }
    if(localStorage.getItem("playerEquipment")){
      game.equipment.playerEquipment = JSON.parse(localStorage.getItem("playerEquipment"));
    }

  },
}

game.times = {
  timeNow: 0,
  timePast: 0,

  checkTime: function(){
    if (localStorage.getItem("timeNow") && localStorage.getItem("timePast")){
      this.timePast = localStorage.getItem("timePast");
      this.timeNow = localStorage.getItem("timeNow");
      console.log("local time existed");
      this.compareTime();
    } else {
      this.timeNow = new Date().getTime();
      this.timePassed;
      console.log("created local time");
    }
  },

  getTime: function(){
    this.timePast = this.timeNow;
    localStorage.timePast = this.timePast;
    this.timeNow = new Date().getTime();
    localStorage.timeNow =  this.timeNow;
    console.log("saved time");
  },

  timePassed: function(){
    return Math.round((this.timeNow - this.timePast)/1000);
  },

  compareTime: function(){
    this.getTime();
    //console.log(this.timePassed() + " second passed.");
    if(this.timePassed() >= 3){
      this.calculateKilledMonsters(this.timePassed());
    }
  },

  calculateKilledMonsters: function(timePassed){
    //calculate the average hp of the monster
    let average = game.monstersList.reduce(function(a, b, index, arr){
      return a + (b.maxHp/arr.length);
    }, 0);

    //calculate how many monsters were killed
    this.calculateGainedGold((timePassed*game.player.dps)/average);
  },

  calculateGainedGold: function(monstersKilled){
    console.log(monstersKilled + " monsters were killed.");
    console.log((monstersKilled * game.level.currentLevel) + " gold earned");
    var earned = Number((monstersKilled * game.level.currentLevel)) + Number(game.player.gold);
    console.log(earned);
    game.player.gold = earned;
    game.ui.updateGold();
  },

}

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("city", cityState);

game.state.start("load");
