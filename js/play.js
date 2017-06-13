var playState = {
    create: function() {
        var state = this;

        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");


        /////////////
        //MONSTERS///
        /////////////

        //monster list
        this.monster = {

          self: state.monster,

          monster: null,
          currentMonster: null,

          placeMonster: function(){
            this.createMonsters();
            this.setCurrentMonster();
          },

          monstersList: game.monstersList,

          monsters: game.add.group(),

          createMonsters: function(){
            for(var i = 0; i < this.monstersList.length; i++) {
                monster = this.monsters.create(1000, 310, this.monstersList[i].monsterKey);
                monster.anchor.setTo(0.5);
                monster.details = this.monstersList[i];
                monster.health = monster.maxHealth = this.monstersList[i].maxHp;

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
                monster.events.onInputDown.add(this.onClick, state);
                monster.events.onKilled.add(this.onKilledMonster, state);
                monster.events.onRevived.add(this.onRevivedMonster, state);
            }
          },

          setCurrentMonster: function(){
            this.currentMonster = this.monsters.getRandom();
            this.currentMonster.position.setTo(450, 315);
            this.currentMonster.healthText.x = 450;
            this.currentMonster.nameText.x = 445;
          },

          onDps: function(){
            this.monster.isCritical(this.monster.currentMonster, game.player.clickDamage/10);
            this.monster.renderMonsterHealth();
          },

          onClick: function(){
            this.monster.isCritical(this.monster.currentMonster, game.player.calculateDmg());
            this.monster.renderMonsterHealth();
          },

          isCritical: function(monster, damage){
            var chance = game.rnd.integerInRange(0, 100);
            if(chance > game.player.criticalChance * 100){
              monster.damage(damage * 3);
            } else {
              monster.damage(damage);
            }
          },

          onKilledMonster: function(monster) {
              state.monster.moveOutMonster(monster);
              state.monster.countMonster();
              state.monster.getNewMonster();
              state.gold.dropCoin();
          },

          renderMonsterHealth: function(){
            this.currentMonster.healthText.text = Math.round(this.currentMonster.health);
          },

          moveOutMonster: function(monster){
            //after being killed move sprite and text outside
            monster.position.setTo(1000, 375);
            monster.healthText.position.x = 1000;
            monster.nameText.position.x = 1000;
          },

          countMonster: function(){
            //update monster counter
            game.level.addMonster();
            game.ui.monsterCounterUpdate();
          },

          getNewMonster: function(){
            this.currentMonster = state.monster.monsters.getRandom();
            //place text once again on proper place and revive monster
            this.currentMonster.healthText.x = 450;
            this.currentMonster.nameText.x = 445;
            this.currentMonster.revive(state.monster.currentMonster.maxHealth);
          },

          onRevivedMonster: function(monster) {
              //set position in game
              monster.position.setTo(450, 315);
          },

        }

        this.boss = {
          self: state.boss,

          bossList: game.bossList,
          bosses: game.add.group(),
          currentBoss: null,

          placeBoss: function(){
            this.createBoss();
            this.setCurrentBoss();
            console.log("current bosss: " + this.currentBoss);
          },

          createBoss: function(){
            for(var i = 0; i < this.bossList.length; i++) {
                boss = this.bosses.create(1000, 310, this.bossList[i].bossKey);
                boss.anchor.setTo(0.5);
                boss.details = this.bossList[i];
                boss.health = boss.maxHealth = this.bossList[i].maxHp;

                boss.healthText = game.add.text(1000, 420, boss.maxHealth, {
                    font: "35px 'Jim Nightshade', cursive",
                    fill: "red"});
                boss.healthText.anchor.setTo(0.5);
                boss.nameText = game.add.text(1000, 220, boss.details.bossName, {
                    font: "35px 'Jim Nightshade', cursive",
                    fill: "red"});
                boss.nameText.anchor.setTo(0.5);


                //enable input, so we can click it
                boss.inputEnabled = true;
                boss.events.onInputDown.add(this.onClick, state);
                boss.events.onKilled.add(this.onKilledBoss, state);
                boss.events.onRevived.add(this.onRevivedBoss, state);
            }
          },

          setCurrentBoss: function(){
            this.currentBoss = this.bosses.getRandom();
            console.log(this.currentBoss);
            this.currentBoss.position.setTo(450, 315);
            this.currentBoss.healthText.x = 450;
            this.currentBoss.nameText.x = 445;
          },

          onDps: function(){
            this.boss.isCritical(this.boss.currentBoss, game.player.clickDamage/10);
            this.boss.renderBossHealth();
          },

          onClick: function(){
            this.boss.isCritical(this.boss.currentBoss, game.player.calculateDmg());
            this.boss.renderBossHealth();
          },

          renderBossHealth: function(){
            this.currentBoss.healthText.text = Math.round(this.currentBoss.health);
          },

          isCritical: function(boss, damage){
            var chance = game.rnd.integerInRange(0, 100);
            if(chance > game.player.criticalChance * 100){
              boss.damage(damage * 3);
            } else {
              boss.damage(damage);
            }
          },

          onKilledBoss: function(boss) {
              state.boss.moveOutBoss(boss);
              state.boss.getNewBoss();
              state.gold.dropCoin();
          },

          moveOutBoss: function(boss){
            //after being killed move sprite and text outside
            boss.position.setTo(1000, 375);
            boss.healthText.position.x = 1000;
            boss.nameText.position.x = 1000;
          },

          getNewBoss: function(){
            state.boss.currentBoss = state.boss.bosses.getRandom();
            console.log("JP: " + this.currentBoss);
            //place text once again on proper place and revive monster
            this.currentBoss.healthText.x = 450;
            this.currentBoss.nameText.x = 445;
            //this.curretBoss.nameText.x = 445;
            state.boss.currentBoss.revive(state.boss.currentBoss.maxHealth);
          },

          onRevivedBoss: function(monster) {
              //set position in game
              monster.position.setTo(450, 315);
          },
        }

        this.gold = {
          golds: undefined,

          dropCoin: function(){
            var coin;
            //spawn a coin on the ground
            coin = this.golds.getFirstExists(false);
            coin.reset(450 + game.rnd.integerInRange(-60, 60), 360 + game.rnd.integerInRange(-15, 15));
            coin.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
            coin.animations.play("spin", 20, true);
            setTimeout(function(){
                state.gold.onClickGold.call(this, coin);
            }, 3000);
          },

          onClickGold: function(gold){
              if (!gold.alive){
                return;
              }

              gold.kill();
              game.player.gold++;
              game.ui.updateGold();
          },

          create: function(){
            this.golds = game.add.group();
            this.golds.createMultiple(50, "gold", "", false);
            this.golds.setAll("scale.setTo", 1.4);
            this.golds.setAll("inputEnabled", true);
            this.golds.setAll("value", 1);
            this.golds.callAll("events.onInputDown.add", "events.onInputDown", state.gold.onClickGold, this);
          }
        }

        //icons
        this.iconInventory = this.game.add.sprite(30,210,"icon-inventory");
        this.iconInventory.scale.setTo(0.3);
        this.iconInventory.inputEnabled = true;
        this.iconInventory.events.onInputDown.add(game.inventory.toggleInventory, game.inventory);

        this.iconCity = this.game.add.sprite(30, 150, "icon-city");
        this.iconCity.scale.setTo(0.3);
        this.iconCity.inputEnabled = true;
        this.iconCity.events.onInputDown.add(goToCity, this);

        startGame();

        //saving to local storage
        this.saving = this.game.time.events.loop(1000, game.localStorage.save, this);

        //idle dps
        this.dpsTimer =this.game.time.events.loop(100, this.monster.onDps, this);

        //idle module
        game.time.events.loop(1000, function(){
          game.times.compareTime();
        }, this);

        function goToCity() {
          game.state.start("city");
        };

        function startGame() {
          game.localStorage.load();
          game.ui.renderAll();
          state.monster.placeMonster();
          //state.boss.placeBoss();
          state.gold.create();
          game.inventory.create();
          game.equipment.create();
          game.equipment.renderEquipment();
          game.runes.create();
          game.runes.renderRunes();
          game.times.checkTime();
          game.level.checkBossFlag();
        }
    },

    update: function() {

    }
}
