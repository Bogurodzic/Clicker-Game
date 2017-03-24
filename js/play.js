var playState = {
    create: function() {
        this.player = {
            maxHp: 10
        };
        
        this.background = game.add.tileSprite(0, 0, 708, 511, "background-winter");
        
        this.uiFrame = this.game.add.image(0, 0, "ui-frame");
        this.uiFrame.scale.setTo(1.2);
    },
    
    update: function() {
        //this.background.tilePosition.x -= 0.2;
    }
}