var playState = {
    create: function() {
        var state = this;
        
        this.player = {
            maxHp: 100,
            currentHp: 100
        };
        

        
        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");
        
        this.uiFrame = this.game.add.image(0, 0, "ui-frame");
        this.uiFrame.scale.setTo(1.2);
        
        //this.monsters = this.game.add.group();
        this.hpText = this.game.add.text(36, 38, this.player.currentHp, { 
                font: "15px 'Jim Nightshade', cursive",
                fill: "#fff"});
        
        //icons
        this.iconInventory = this.game.add.sprite(30,120,"icon-inventory");
        this.iconInventory.scale.setTo(0.3);
        this.iconInventory.inputEnabled = true;
        this.iconInventory.events.onInputDown.add(toggleInventory, this);
        
        this.monster = this.game.add.sprite(350,270,"bone");
        
        
        this.inventory = this.game.add.sprite(-1000, -1000, "inventory");
        this.inventory.anchor.setTo(0.5);
        this.inventory.scale.setTo(0.95);
        
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
    },
    
    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}