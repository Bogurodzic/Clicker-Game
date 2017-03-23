var menuState = {
    create: function() {
        var self = this;
        
        this.startButton = this.game.add.image(game.world.centerX, 175, "button");
        this.startButton.anchor.setTo(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.events.onInputDown.add(startGame, self);
        this.startButtonText = this.startButton.addChild(this.game.add.text(0, 0, "Play"));
        this.startButtonText.anchor.setTo(0.5);
        
        function startGame() {
            game.state.start("play");
        }
    }
}