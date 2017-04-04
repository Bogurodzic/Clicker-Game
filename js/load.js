var loadState = {
    preload: function() {

        this.loadingLabel = game.add.text(game.world.centerX, game.world.centerY, "loading", {
            font: "30px Courier",
            fill: "#ffffff"
        });
        this.loadingLabel.anchor.setTo(0.5);

        this.game.load.image("background-day", "assets/background/day.png");
        this.game.load.image("background-winter", "assets/background/winter.png");
        this.game.load.image("background-forest", "assets/background/forest.png");
        this.game.load.image("background-cave", "assets/background/cave.png");
        this.game.load.image("button", "assets/ui/icons/button.png");
        this.game.load.image("ui-frame", "assets/ui/UI.png");
        this.game.load.image("icon-inventory", "assets/ui/icons/inventory.png");
        this.game.load.image("icon-city", "assets/ui/icons/city.png");
        this.game.load.image("inventory", "assets/ui/inventory.png");
        this.game.load.image("bone", "assets/monsters/BONE.png");
        this.game.load.image("orc", "assets/monsters/ORC.png");
        this.game.load.image("dragon", "assets/monsters/DRAGON.png");
        this.game.load.image("dragon-air", "assets/monsters/DRAGONAIR.png");
        this.game.load.image("dragon-dark", "assets/monsters/DARKDRAGON.png");
        this.game.load.image("dragon-rock", "assets/monsters/ROCKDRAGON.png");
        this.game.load.image("dragon-sapphire", "assets/monsters/SAPPHIREDRAGON.png");
        this.game.load.spritesheet("gold", "assets/gold/coins.png", 16, 16);

    },

    create: function() {

        setTimeout(function(){
            game.state.start("menu");
        }, 2500);
    }
};
