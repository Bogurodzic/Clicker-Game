var menuState = {
    create: function() {
        var self = this;
        
        this.buttonsList = [
            {text: "Play", press: startGame},
            {text: "Options", press: gameOptions},
            {text: "Credits", press: gameCredits}
        ];
        
        this.menuButtons = this.game.add.group();
        this.menuButtons.x = game.world.centerX;
        this.menuButtons.y = game.world.centerY-90;
        
        var menuButton;
        this.buttonsList.forEach(function(data, index){
            menuButton = this.game.add.image(0, 60 * index, "button");
            menuButton.anchor.setTo(0.5);
            menuButton.inputEnabled = true;
            menuButton.events.onInputDown.add(data.press);
            menuButton.menuButtonText = menuButton.addChild(this.game.add.text(0, 0, data.text));
            menuButton.menuButtonText.anchor.setTo(0.5);
            self.menuButtons.addChild(menuButton);
        });
              
        function startGame() {
            game.state.start("play");
        };
        
        function gameOptions() {
            
        };
        
        function gameCredits() {
            
        };
        
    }
}