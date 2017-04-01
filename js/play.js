var playState = {
    create: function() {
        var state = this;
        
        this.player = {
            maxHp: 100,
            currentHp: 100,
            clickDamage: 1,
            dps: 0,
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
        this.monsterCounter = this.game.add.text(480, 0, this.level.currentMonster, { 
                font: "25px 'Jim Nightshade', cursive",
                fill: "#fff"});
        
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
            {monsterName: "Dragon", monsterKey: "dragon", maxHp: 10}
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
        //icons
        this.iconInventory = this.game.add.sprite(30,120,"icon-inventory");
        this.iconInventory.scale.setTo(0.3);
        this.iconInventory.inputEnabled = true;
        this.iconInventory.events.onInputDown.add(toggleInventory, this);
                
        //ading inventory
        this.inventory = this.game.add.sprite(-1000, -1000, "inventory");
        this.inventory.anchor.setTo(0.5);
        this.inventory.scale.setTo(0.95);


        /////////////
        ////GOLD/////
        /////////////

        this.gold = this.game.add.sprite(300, 300, "gold");
        this.gold.animations.add("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
        this.gold.animations.play("spin", 20, true);

        
        /////////////
        //FUNCTIONS//
        /////////////
        
        //open or close inventory
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
            monster.damage(state.player.clickDamage);
            //update hp text
            state.currentMonster.healthText.text = state.currentMonster.health;
            console.log(monster.health);
        };
        
        function onKilledMonster(monster) {
            //after being killed move sprite and text outside
            monster.position.setTo(1000, 375);
            monster.healthText.position.x = 1000;
            
            //update monster counter
            state.level.currentMonster += 1;
            state.monsterCounter.text = state.level.currentMonster;
            
            state.currentMonster = state.monsters.getRandom();
            //place text once again on proper place and revive monster
            state.currentMonster.healthText.x = 450;
            state.currentMonster.revive(state.currentMonster.maxHealth);
        };
        
        function onRevivedMonster(monster) {
            //set position in game
            monster.position.setTo(450, 315);
        };
    },
    
    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}