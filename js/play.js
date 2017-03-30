var playState = {
    create: function() {
        var state = this;
        
        this.player = {
            maxHp: 100,
            currentHp: 100,
            clickDamage: 1
        };
                
        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");
        
        this.uiFrame = this.game.add.image(0, 0, "ui-frame");
        this.uiFrame.scale.setTo(1.2);
        
        //this.monsters = this.game.add.group();
        this.hpText = this.game.add.text(36, 38, this.player.currentHp, { 
                font: "15px 'Jim Nightshade', cursive",
                fill: "#fff"});
        
        //monster list
        this.monstersList = [
            {monsterName: "Skeleton", monsterKey: "bone", maxHp: 10},
            {monsterName: "Orc", monsterKey: "orc", maxHp: 10}
        ];
        this.monsters = this.game.add.group();
        
        //create monsters and put them into the monsters group
        var monster;
        for(var i = 0; i < this.monstersList.length; i++) {
            monster = state.monsters.create(1000, 305, state.monstersList[i].monsterKey);
            monster.anchor.setTo(0.5);
            monster.details = state.monstersList[i];
            monster.health = monster.maxHealth = state.monstersList[i].maxHp;
            
            //enable input, so we can click it
            monster.inputEnabled = true;
            monster.events.onInputDown.add(onClickMonster, state);
            //monster.events.onKilled.add(onKilledMonster, state);
            //monster.events.onRevived.add(onRevivedMonster, state);
        }
        
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.setTo(450, 315);
        
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
            monster.damage(state.player.clickDamage);
            console.log(monster.health);
        }
    },
    
    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}