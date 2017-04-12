var playState = {
    create: function() {
        var state = this;

        this.player = {
            maxHp: 100,
            currentHp: 100,
            clickDamage: 1,
            dps: 0,
            criticalChance: 0.7,
            gold: 0
        };

        this.level = {
            currentLevel: 1,
            currentMonster: 0,
            requiredKilledMonsters: 10
        }



        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");

        this.uiFrame = this.game.add.image(0, 0, "ui-frame");
        this.uiFrame.scale.setTo(1.2);

        //place monster counter
        this.monsterCounter = this.game.add.text(465, 23, this.level.currentMonster, {
                font: "25px 'Jim Nightshade', cursive",
                fill: "#fff"});
        this.monsterCounter.anchor.setTo(0.5);

        //this.monsters = this.game.add.group();
        this.hpText = this.game.add.text(36, 38, this.player.currentHp, {
                font: "15px 'Jim Nightshade', cursive",
                fill: "#fff"});

        /////////////
        //MONSTERS///
        /////////////

        //monster list
        this.monstersList = [
            {monsterName: "Skeleton", monsterKey: "bone", maxHp: 10},
            {monsterName: "Orc", monsterKey: "orc", maxHp: 10},
            {monsterName: "Fire Dragon", monsterKey: "dragon", maxHp: 10},
            {monsterName: "Air Dragon", monsterKey: "dragon-air", maxHp: 10},
            {monsterName: "Dark Dragon", monsterKey: "dragon-dark", maxHp: 10},
            {monsterName: "Rock Dragon", monsterKey: "dragon-rock", maxHp: 10},
            {monsterName: "Sapphire Dragon", monsterKey: "dragon-sapphire", maxHp: 10},
        ];
        this.monsters = this.game.add.group();

        //create monsters and put them into the monsters group
        var monster;
        for(var i = 0; i < this.monstersList.length; i++) {
            monster = state.monsters.create(1000, 310, state.monstersList[i].monsterKey);
            monster.anchor.setTo(0.5);
            monster.details = state.monstersList[i];
            monster.health = monster.maxHealth = state.monstersList[i].maxHp;

            monster.healthText = game.add.text(1000, 420, monster.maxHealth, {
                font: "35px 'Jim Nightshade', cursive",
                fill: "red"});
            monster.healthText.anchor.setTo(0.5);
            monster.nameText = game.add.text(1000, 220, monster.details.monsterName, {
                font: "35px 'Jim Nightshade', cursive",
                fill: "red"});
            monster.nameText.anchor.setTo(0.5);


            //enable input, so we can click it
            monster.inputEnabled = true;
            monster.events.onInputDown.add(onClickMonster, state);
            monster.events.onKilled.add(onKilledMonster, state);
            monster.events.onRevived.add(onRevivedMonster, state);
        }

        //random current monster and set it into the game
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.setTo(450, 315);
        this.currentMonster.healthText.x = 450;
        this.currentMonster.nameText.x = 445;
        //icons
        this.iconInventory = this.game.add.sprite(30,210,"icon-inventory");
        this.iconInventory.scale.setTo(0.3);
        this.iconInventory.inputEnabled = true;
        this.iconInventory.events.onInputDown.add(toggleInventory, this);

        this.iconCity = this.game.add.sprite(30, 150, "icon-city");
        this.iconCity.scale.setTo(0.3);
        this.iconCity.inputEnabled = true;
        this.iconCity.events.onInputDown.add(goToCity, this);

        /////////////
        ////GOLD/////
        /////////////

        this.golds = this.game.add.group();
        this.golds.createMultiple(50, "gold", "", false);
        this.golds.setAll("scale.setTo", 1.4);
        this.golds.setAll("inputEnabled", true);
        this.golds.setAll("value", 1);
        this.golds.callAll("events.onInputDown.add", "events.onInputDown", onClickGold, this);

        this.goldText = this.game.add.text(207, 23, this.player.gold, {
                font: "25px 'Jim Nightshade', cursive",
                fill: "white"});
        this.goldText.anchor.setTo(0.5);

        //ading inventory
        this.inventory = this.game.add.sprite(-1000, -1000, "inventory");
        this.inventory.anchor.setTo(0.5);
        this.inventory.scale.setTo(0.95);

        this.runes = this.inventory.addChild(this.game.add.group());

        this.runesList = [
          {runeName: "Rune 1", runeKey: "rune1", runeHandler: function(rune){
            rune.x = 10;
          }},
          {runeName: "Rune 2", runeKey: "rune2", runeHandler: function(rune){
            rune.x = 10;
          }},
          {runeName: "Rune 3", runeKey: "rune3", runeHandler: function(rune){
            rune.x = 10;
          }}
        ];

        var rune;
        this.runesList.forEach(function(data, index){
          rune = state.runes.create(127, -35 - (-58 * index), data.runeKey);
          rune.details = data;
          rune.inputEnabled = true;

          rune.events.onInputDown.add(runeToggle, this);
        });






        /////////////
        //FUNCTIONS//
        /////////////

        //open or close inventory
        function runeToggle(rune){
          rune.details.runeHandler.call(this, rune);
        };

        var inventoryVisible = false;
        function toggleInventory() {
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

        function onClickMonster(monster) {
            //deals damage to monster equal to player dmg
            isCritical(monster);
            //update hp text
            state.currentMonster.healthText.text = state.currentMonster.health;
            console.log(monster.health);
        };

        function isCritical(monster){
          var chance = game.rnd.integerInRange(0, 100);
          if(chance > state.player.criticalChance * 100){
            monster.damage(state.player.clickDamage * 3);
            console.log("siadł krytyk");
          } else {
            monster.damage(state.player.clickDamage);
          }
        };

        function onKilledMonster(monster) {
            moveOutMonster(monster);
            countMonster();
            getNewMonster();
            dropCoin();
        };

        function moveOutMonster(monster){
          //after being killed move sprite and text outside
          monster.position.setTo(1000, 375);
          monster.healthText.position.x = 1000;
          monster.nameText.position.x = 1000;
        };

        function countMonster(){
          //update monster counter
          state.level.currentMonster += 1;
          state.monsterCounter.text = state.level.currentMonster;
        }

        function getNewMonster(){
          state.currentMonster = state.monsters.getRandom();
          //place text once again on proper place and revive monster
          state.currentMonster.healthText.x = 450;
          state.currentMonster.nameText.x = 445;
          state.currentMonster.revive(state.currentMonster.maxHealth);
        };

        function dropCoin(){
          var coin;
          //spawn a coin on the ground
          coin = state.golds.getFirstExists(false);
          coin.reset(450 + this.game.rnd.integerInRange(-60, 60), 360 + this.game.rnd.integerInRange(-15, 15));
          coin.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
          coin.animations.play("spin", 20, true);
          setTimeout(function(){
              onClickGold.call(state, coin);
          }, 3000);
        };

        function onRevivedMonster(monster) {
            //set position in game
            monster.position.setTo(450, 315);
        };

        function onClickGold(gold){
            if (!gold.alive){
              return;
            }

            gold.kill();
            state.player.gold += 1;
            state.goldText.text = state.player.gold;
        };

        function goToCity() {
          saveToLocalStorage();
          game.state.start("city");
        };

        function saveToLocalStorage() {
          //save world info
          localStorage.level = state.level.currentLevel;
          localStorage.killedMonsters = state.level.currentMonster;

          //save basic player stats
          localStorage.maxHp = state.player.maxHp;
          localStorage.currentHp = state.player.currentHp;
          localStorage.clickDamage = state.player.clickDamage;
          localStorage.dps = state.player.dps
          localStorage.gold = state.player.gold;

          console.log("Saved");
        };

        function loadFromLocalStorage() {
          //load world info
          state.level.currentLevel = localStorage.getItem("level");
          state.level.currentMonster = localStorage.getItem("killedMonsters");

          //load basic player stats
          state.player.maxHp = localStorage.getItem("maxHp");
          state.player.currentHp = localStorage.getItem("currentHp");
          state.player.clickDamage = localStorage.getItem("clickDamage");
          state.player.dps = localStorage.getItem("dps");
          state.player.gold = localStorage.getItem("gold");

          console.log("loaded");
        }
    },

    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}
