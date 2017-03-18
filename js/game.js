var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add("play", {
    preload: function() {
        game.load.image("skeleton", "assets/enemies/skeleton1.png");
        game.load.image("nagaruda", "assets/enemies/nagaruda1.png");
        game.load.image("arcanedrake", "assets/enemies/arcana_drake1.png");
        game.load.image("deceleon", "assets/enemies/deceleon1.png");
        game.load.image("aerocephal", "assets/enemies/aerocephal1.png");
        game.load.image("aurum-drakueli", "assets/enemies/aurum-drakueli1.png");
        game.load.image("bat", "assets/enemies/bat1.png");
        game.load.image("daemarbora", "assets/enemies/daemarbora1.png");
        this.game.load.spritesheet("buttonMusic", "assets/buttons/buttonMusic.png", 263, 240);
        this.game.load.spritesheet("buttonSounds", "assets/buttons/buttonSounds.png", 260, 226);
        this.game.load.image("forest-back", "assets/background/forest/parallax-forest-back-trees.png");
        this.game.load.image("forest-lights", "assets/background/forest/parallax-forest-lights.png");
        this.game.load.image("forest-middle", "assets/background/forest/parallax-forest-middle-trees.png");
        this.game.load.image("forest-front", "assets/background/forest/parallax-forest-front-trees.png");
        this.game.load.image('gold_coin', 'assets/icons/I_GoldCoin.png');
        this.game.load.image("dagger", "assets/icons/W_Dagger002.png");
        this.game.load.image("sword1", "assets/icons/S_Sword01.png");
        this.game.load.image("stopMusic", "assets/icons/1music.png");
        this.game.load.image("stopAudio", "assets/icons/1audio.png");
        this.game.load.image("swordCritical", "assets/icons/S_Sword07.png");
        this.game.load.audio("swordClick", "assets/sounds/hits/Swordsmall.wav");
        this.game.load.audio("monsterHurt", "assets/sounds/hits/Monster_Hurt.wav");
        this.game.load.audio("music", "assets/sounds/music/medieval_loop.wav")

        //world progression
        this.level = 1;
        //how many monsters have we killed during this level
        this.levelKills = 0;
        //how many kills are required to advance the level
        this.levelKillsRequired = 10;
        
        
        // build panel for upgrades
        var bmd = this.game.add.bitmapData(250, 500);
        bmd.ctx.fillStyle = "#9a783d";
        bmd.ctx.strokeStyle = "#35371c";
        bmd.ctx.lineWidth = 12;
        bmd.ctx.fillRect(0, 0, 250, 500);
        bmd.ctx.strokeRect(0, 0, 250, 500);
        this.game.cache.addBitmapData("upgradePanel", bmd);

        var buttonImage = this.game.add.bitmapData(476, 48);
        buttonImage.ctx.fillStyle = "#e6dec7";
        buttonImage.ctx.strokeStyle = "#35371c";
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 225, 48);
        buttonImage.ctx.strokeRect(0, 0, 225, 48);
        this.game.cache.addBitmapData("button", buttonImage);
        

    },
    create: function() {
        var state = this;
        
        this.player = {
            clickDmg: 1,
            gold: 10,
            dps: 5,
            criticalChance: 1
        };
        
        
        //Idle Module
        if (localStorage.getItem("t1") && localStorage.getItem("t2")){
            state.t2 = localStorage.getItem("t2");
            state.t1 = localStorage.getItem("t2");
        } else {
            state.t1;
            state.t2;           
        }
        
        this.timePassed;

        
        setInterval(function(){
            state.t2 = state.t1;
            localStorage.t2 = state.t2;
            state.t1 = new Date().getTime();
            localStorage.t1 = state.t1;
            state.t2 = localStorage.getItem("t2");
            state.t1 = localStorage.getItem("t1");
            state.timePassed = Math.round((state.t1 - state.t2)/1000);
            
            console.log(state.timePassed + "s Minęło!");
            
            if (state.timePassed >= 3){
                var dmgPassed = state.timePassed * state.player.dps;
                var montersKilled = dmgPassed/ (state.currentMonster.details.maxHealth + ((state.level - 1) * 10.6));
                console.log(Math.round(montersKilled));
            }
            
            
        }, 1000);
        
        this.music = game.add.audio("music");
        this.music.loop = true;
        this.music.play();
        

        
        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });
        
        this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData("upgradePanel"));
        var upgradeButtons = this.upgradePanel.addChild(this.game.add.group());
        upgradeButtons.position.setTo(8, 8);  
        

        
       
        
        var upgradeButtonsData = [
            {icon: "dagger", name: "Attack", level: 1, cost: 5, purchaseHandler: function(button, player){
                state.player.clickDmg += 1;
            }},
            {icon: "sword1", name: "Auto-Attack", level: 0, cost: 10, purchaseHandler: function(button, player){
                state.player.dps += 5; 
                state.playerDpsText.text = "Dps: " + state.player.dps;
            }},
            {icon: "swordCritical", name: "Crit chance up", level: 0, cost: 25, purchaseHandler: function(button, player){
                state.player.criticalChance = state.player.criticalChance * 1.05;  
            }}
        ];
 
        var button;       
        upgradeButtonsData.forEach(function(data, index){
            button = this.game.add.button(0, (50*index), this.game.cache.getBitmapData("button"));
            button.icon = button.addChild(this.game.add.image(6, 6, data.icon));
            button.text = button.addChild(this.game.add.text(42, 6, data.name, {font: "16px Arial Black"}));
            button.details = data;
            button.costText = button.addChild(this.game.add.text(42, 24, "Cost: " + data.cost, {font: "16px Arial Black"}));
            button.events.onInputDown.add(onUpgradeButtonClick, this);
            upgradeButtons.addChild(button);
        });
        
        /*this.rightPanel = this.game.add.group();
        this.rightPanel.position.setTo(700, 20);
        this.stopMusic = this.rightPanel.addChild(this.game.add.button(0, 0, "stopMusic"));
        this.stopMusic.events.onInputDown.add(musicToggle, this);
        this.playingMusic = true;*/
        //this.stopAudio = this.rightPanel.addChild(this.game.add.button(0, 60, "stopAudio"));
        this.buttonMusic = this.game.add.button(720, 10, "buttonMusic", musicToggle, this, 1, 1, 1);
        this.buttonMusic.scale.setTo(0.25);
        this.playingMusic = true;
        
        function musicToggle(){
            if (state.playingMusic === true){
                state.playingMusic = false;
                state.music.volume = 0;
                state.buttonMusic.setFrames(0, 0, 0);
            } else if (state.playingMusic === false){
                state.playingMusic = true;
                state.music.volume = 1;
                state.buttonMusic.setFrames(1, 1, 1);
            }
        };
        
        this.buttonSounds = this.game.add.button(720, 80, "buttonSounds", toggleSound, this, 1, 1, 1);
        this.buttonSounds.scale.setTo(0.25);
        
        this.clickSword = game.add.audio("swordClick");
        this.monsterHurt = game.add.audio("monsterHurt");
        
        this.fxEnabled = true;
        this.fxs = [];
        this.fxs.push(state.clickSword);
        this.fxs.push(state.monsterHurt);
        
        this.playingSounds = true;
        function toggleSound(){
            if (state.playingSounds === true){
                state.fxs.forEach(function(item, index){
                    state.fxs[index].volume = 0;
                    state.playingSounds = false;
                    state.buttonSounds.setFrames(0, 0, 0);
                });
            } else if (state.playingSounds === false){
                state.fxs.forEach(function(item, index){
                    state.fxs[index].volume = 1;
                    state.playingSounds = true;
                    state.buttonSounds.setFrames(1, 1, 1);
                });
            }
            
        }
        
        
        
        var monsterData = [
            {name: "Bat", image: "bat", maxHealth: 3},
            {name: "Skeleton", image: "skeleton", maxHealth: 5},
            {name: "Nagaruda", image: "nagaruda", maxHealth: 10},
            {name: "Arcane Drake", image: "arcanedrake", maxHealth: 15},
            {name: "Deceleon", image: "deceleon", maxHealth: 20},
            {name: "Aerocephal", image: "aerocephal", maxHealth: 25},
            {name: "Aurum-drakueli", image: "aurum-drakueli", maxHealth: 45},
            {name: "Daemarbora", image: "daemarbora", maxHealth: 75}
        ]
        
        this.monsters = this.game.add.group();
        
        var monster;
        monsterData.forEach(function(data){
            // create a sprite for them off screen
            monster = state.monsters.create(1000, state.game.world.centerY, data.image);
            //center anchor
            monster.anchor.setTo(0.5);
            //reference to the database
            monster.details = data;
            monster.health = monster.maxHealth = data.maxHealth;

            
            //enable input so we can click it!
            monster.inputEnabled = true;
            monster.events.onInputDown.add(onClickMonster, state)
            
            // hook into health and lifecycle events
            monster.events.onKilled.add(onKilledMonster, state);
            monster.events.onRevived.add(onRevivedMonster, state);
            
        });
        
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 250, this.game.world.centerY);
        
        this.monsterInfoUI = this.game.add.group();
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 255, this.currentMonster.y);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name), {
            font: "48px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 30, this.currentMonster.health + " HP"), {
            font: "32px Arial Black",
            fill: "#ff0000",
            strokeThickness: 4
        });
        
        this.playerGoldText = this.add.text(30, 10, "Gold: " + this.player.gold, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        
        this.playerDpsText = this.add.text(30,40, "Dps: " + this.player.dps, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        
        this.dmgTextPool = this.add.group();
        var dmgText;
              
        for (var i=0; i<50; i++){
            dmgText = this.add.text(0, 0, "1", {
                font: "64px Arial Black",
                color: "#fff",
                strokeThickness: 4
            });
            //start out not existing, so we don't draw it yet
            dmgText.exists = false;
            dmgText.tween = game.add.tween(dmgText).to({
                alpha: 0,
                y: 100,
                x: this.game.rnd.integerInRange(100, 700)
            }, 1000, Phaser.Easing.Cubic.Out);
            
            dmgText.tween.onComplete.add(function(text, tween){
               text.kill(); 
            });
            this.dmgTextPool.add(dmgText);
        };
        
        this.dmgCriticalTextPool = this.add.group();
        var dmgCritical;
        
        for (var j=0; j<50; j++){
            dmgCritical = this.add.text(0, 0, "1", {
                font: "64px Arial Black",
                color: "#CC0000",
                fill: "#CC0000",
                strokeThickness: 4
            });
            //start out not existing, so we don't draw it yet
            dmgCritical.exists = false;
            dmgCritical.tween = game.add.tween(dmgCritical).to({
                alpha: 0,
                y: 135,
                x: this.game.rnd.integerInRange(100, 700)
            }, 1000, Phaser.Easing.Cubic.Out);
            
            dmgCritical.tween.onComplete.add(function(text, tween){
               text.kill(); 
            });
            this.dmgCriticalTextPool.add(dmgCritical);
        }
        
        this.coins = this.add.group();
        this.coins.createMultiple(50, "gold_coin", "", false);
        this.coins.setAll("inputEnabled", true);
        this.coins.setAll("goldValue", 1);
        this.coins.callAll("events.onInputDown.add", "events.onInputDown", onClickCoin, this);
        
        this.dpsTimer = this.game.time.events.loop(100, onDps, this);
        
        this.levelUI = this.game.add.group();
        this.levelUI.position.setTo(this.game.world.centerX, 30);
        this.levelCounterText = this.game.add.text(10, 0, "Level: " + this.level, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        this.levelUI.addChild(this.levelCounterText);
        this.levelKillsText = this.game.add.text(0, 40, "Kills: " + this.levelKills + "/" + this.levelKillsRequired, {
           font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        this.levelUI.addChild(this.levelKillsText);
        


        
        function onClickMonster(){          
            state.monsterHurt.stop();
            state.monsterHurt.play();

            var critical = Phaser.Utils.chanceRoll(this.player.criticalChance);
            
            //check if click is critical, if not:
            if (!critical){
                this.currentMonster.damage(this.player.clickDmg);
                var dmgText = this.dmgTextPool.getFirstExists(false);
                if (dmgText) {
                    dmgText.text = this.player.clickDmg;
                    dmgText.reset(game.input.mousePointer.x, game.input.mousePointer.y);
                    dmgText.alpha = 1;
                    dmgText.tween.start();
                }; 
            //if it is critical:
            } else {
                this.currentMonster.damage(this.player.clickDmg * 4);
                var dmgCritical = this.dmgCriticalTextPool.getFirstExists(false);
                if (dmgCritical) {
                    dmgCritical.text = this.player.clickDmg * 3;
                    dmgCritical.reset(game.input.mousePointer.x, game.input.mousePointer.y);
                    dmgCritical.alpha = 1;
                    dmgCritical.tween.start();
                }                
            };

            this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + " HP" : "DEAD";
        };
        
        function onKilledMonster(monster){
            //move the monster off-screen once again
            monster.position.set(1000, this.game.world.centerY);
            //pick a new monster
            this.currentMonster = this.monsters.getRandom();
            //upgrade the monster based on level
            this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6));
            //make sure they are fully healed
            this.currentMonster.revive(this.currentMonster.maxHealth);
            
            var coin;
            //spawn a coin on the ground
            coin = this.coins.getFirstExists(false);
            coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY + this.game.rnd.integerInRange(-100, 100));
            coin.goldValue = Math.round(this.level * 1.33);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, onClickCoin, this, coin);
            this.levelKills++;
            if (this.levelKills >= this.levelKillsRequired) {
                this.level++;
                this.levelKills = 0;
            };
            
            this.levelCounterText.text = "Level: " + this.level;
            this.levelKillsText.text = "Kills: " + this.levelKills + "/" + this.levelKillsRequired;
        };
        
        function onRevivedMonster(monster){
            this.monsterNameText.text = this.currentMonster.details.name;
            this.monsterHealthText.text = this.currentMonster.health + " HP";
            this.currentMonster.position.set(this.game.world.centerX + 250, this.game.world.centerY);
        };
        
        function onClickCoin(coin){
            //make sure if coin exists
            if (!coin.alive){
                return;
            }
            //give player the gold
            this.player.gold += coin.goldValue;
            //update UI
            this.playerGoldText.text = "Gold: " + this.player.gold;
            //remove the coin
            coin.kill();
        };
        
        function onUpgradeButtonClick(button, pointer){
            console.log(state.player);
            
            state.clickSword.stop();
            state.clickSword.play();
            
            function getAdjustedCost() {
                return Math.ceil(button.details.cost + (button.details.level * 1.46));
            }

            if (state.player.gold - getAdjustedCost() >= 0){
                state.player.gold -= getAdjustedCost();
                state.playerGoldText.text = "Gold: " + state.player.gold;
                button.details.level++;
                button.costText.text = "Cost: " + getAdjustedCost();
                button.text.text = button.details.name + ": " + button.details.level;
                button.details.purchaseHandler.call(this, button, this.player);
            }
        };
        
        function onDps(){
            if (this.player.dps > 0){
                if (this.currentMonster && this.currentMonster.alive){
                    var dmg = this.player.dps/10;
                    this.currentMonster.damage(dmg);
                    //update the health text
                    this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + " HP" : "DEAD";
                }
            }
        }
        

    },
    update: function() {
    },
    render: function() {
        //game.debug.text(this.currentMonster.details.name, this.game.world.centerX - this.currentMonster.width / 2, this.game.world.centerY);
    }
});




game.state.start("play");