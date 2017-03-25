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
        
        monster = this.game.add.sprite(350,270,"bone");
    },
    
    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}