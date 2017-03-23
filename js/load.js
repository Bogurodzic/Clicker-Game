var loadState = {
    preload: function() {
        
        this.loadingLabel = game.add.text(game.world.centerX, game.world.centerY, "loading", {
            font: "30px Courier",
            fill: "#ffffff"
        });
        this.loadingLabel.anchor.setTo(0.5);
        
    },
    
    create: function() {
        game.state.start("menu");
    }
};