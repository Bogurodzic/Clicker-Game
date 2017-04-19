var playState = {
    create: function() {
        var state = this;




        this.level = {
            currentLevel: 1,
            currentMonster: 0,
            requiredKilledMonsters: 10
        };




        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");

        this.uiFrame = this.game.add.image(0, 0, "ui-frame");
        this.uiFrame.scale.setTo(1.2);

        //place monster counter
        this.monsterCounter = this.game.add.text(465, 23, this.level.currentMonster, {
                font: "25px 'Jim Nightshade', cursive",
                fill: "#fff"});
        this.monsterCounter.anchor.setTo(0.5);

        //this.monsters = this.game.add.group();
        this.hpText = this.game.add.text(36, 38, game.player.currentHp, {
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
        this.iconInventory.events.onInputDown.add(game.toggleInventory, this);

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

        this.goldText = this.game.add.text(207, 23, game.player.gold, {
                font: "25px 'Jim Nightshade', cursive",
                fill: "white"});
        this.goldText.anchor.setTo(0.5);

        //ading inventory
        this.inventory = this.game.add.sprite(-1000, -1000, "inventory");
        this.inventory.anchor.setTo(0.5);
        this.inventory.scale.setTo(0.95);

        /////////////
        //equipment//
        /////////////
        this.playerEquipment = {
          weapon: "",
          shield: "",
          armor: "",
          helmet: "",
          legs: "",
          boots: ""
        }

        this.equipmentList = {
          weapons: [
            {name: "sword", icon: "icon-sword", level: 1},
            {name: "hammer", icon: "icon-hammer", level: 1}
          ]
        }

        this.equipment = this.inventory.addChild(this.game.add.group());

        this.playerEquipment.weapon = this.equipmentList.weapons[0];

        renderEquipment();

        function renderEquipment(){
          renderWeapon();
        }

        function renderWeapon(){
          if(state.weapon){
            state.weapon.destroy();
          }
          state.weapon = state.equipment.addChild(state.game.add.sprite(-115, 0, state.playerEquipment.weapon.icon));
          state.weapon.scale.setTo(0.5);
          state.weapon.inputEnabled = true;
          state.weapon.events.onInputDown.add(changeWeapon, state);
          state.weapon.events.onInputOver.add(infoWindowOpen, {
            infoText: "XD"
          });
          state.weapon.events.onInputOut.add(infoWindowClose, state);
        };

        function changeWeapon(){
          state.playerEquipment.weapon = this.equipmentList.weapons[1];
          renderWeapon();
        };

        ///////////////
        //InfoWindow///
        //////////////

        var info;
        var x = 0;
        var y = 0;

        function infoWindowOpen(){
          //infoWindoWSize(this.infoText);
          var infoWindow = state.game.add.bitmapData(50, 15);
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
          infoText = info.addChild(state.game.add.text(0, 0, "XD", {
              font: "15px 'Jim Nightshade', cursive",
              fill: "black"}));
        };

        function infoWindowSize(text){

        }

        function infoWindowClose(){
          info.destroy();
        }

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

        //////////////
        //GAME//LOOPS/
        //////////////

        this.dpsTimer =this.game.time.events.loop(100, onDps, this);








        /////////////
        //FUNCTIONS//
        /////////////

        function runeToggle(rune){
          rune.details.runeHandler.call(this, rune);
        };

        //open or close inventory


        function onDps(){
          isCritical(state.currentMonster, game.player.clickDamage/10);
          renderMonsterHealth();
        };

        function onClickMonster(monster) {
            //deals damage to monster equal to player dmg
            isCritical(monster, game.player.clickDamage);
            //update hp text
            renderMonsterHealth();
        };

        function renderMonsterHealth(){
          state.currentMonster.healthText.text = Math.round(state.currentMonster.health);
        }

        function isCritical(monster, damage){
          var chance = game.rnd.integerInRange(0, 100);
          if(chance > game.player.criticalChance * 100){
            monster.damage(damage * 3);
          } else {
            monster.damage(damage);
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
            game.player.gold += 1;
            state.goldText.text = game.player.gold;
        };

        function goToCity() {
          //saveToLocalStorage();
          game.state.start("city");
        };

        /*
        function saveToLocalStorage() {
          //save world info
          localStorage.level = state.level.currentLevel;
          localStorage.killedMonsters = state.level.currentMonster;

          //save basic player stats
          localStorage.maxHp = game.player.maxHp;
          localStorage.currentHp = game.player.currentHp;
          localStorage.clickDamage = game.player.clickDamage;
          localStorage.dps = game.player.dps
          localStorage.gold = game.player.gold;

          console.log("Saved");
        };

        function loadFromLocalStorage() {
          //load world info
          state.level.currentLevel = localStorage.getItem("level");
          state.level.currentMonster = localStorage.getItem("killedMonsters");

          //load basic player stats
          game.player.maxHp = localStorage.getItem("maxHp");
          game.player.currentHp = localStorage.getItem("currentHp");
          game.player.clickDamage = localStorage.getItem("clickDamage");
          game.player.dps = localStorage.getItem("dps");
          game.player.gold = localStorage.getItem("gold");

          console.log("loaded");
        } */
    },

    update: function() {
        //this.background.tilePosition.x -= 0.2;



    }
}
