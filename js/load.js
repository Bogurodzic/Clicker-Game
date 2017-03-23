var loadState = {
    preload: function() {
        
        this.loadingLabel = game.add.text(game.world.centerX, game.world.centerY, "loading", {
            font: "30px Courier",
            fill: "#ffffff"
        });
        this.loadingLabel.anchor.setTo(0.5);
        
        this.game.load.image("button", "assets/ui/icons/button.png");
        this.game.load.image("ui-frame", "assets/ui/UI.png");
        
    },
    
    create: function() {
        
        setTimeout(function(){
            game.state.start("menu");
        }, 2500);
    }
};