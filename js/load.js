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
        this.game.load.image("icon-sword", "assets/ui/icons/sword.png");
        this.game.load.image("icon-hammer", "assets/ui/icons/hammer.png");
        this.game.load.image("icon-shield-wooden", "assets/ui/icons/shield-wooden.png");
        this.game.load.image("icon-shield-common", "assets/ui/icons/shield-common.png");
        this.game.load.image("icon-helmet", "assets/ui/icons/helmet.png");
        this.game.load.image("icon-armor", "assets/ui/icons/armor.png");
        this.game.load.image("icon-boots", "assets/ui/icons/boots.png");
        this.game.load.image("arrow", "assets/ui/icons/menu/arrow.png");
        this.game.load.image("inventory", "assets/ui/inventory.png");
        this.game.load.image("bone", "assets/monsters/BONE.png");
        this.game.load.image("orc", "assets/monsters/ORC.png");
        this.game.load.image("dragon", "assets/monsters/DRAGON.png");
        this.game.load.image("dragon-air", "assets/monsters/DRAGONAIR.png");
        this.game.load.image("dragon-dark", "assets/monsters/DARKDRAGON.png");
        this.game.load.image("dragon-rock", "assets/monsters/ROCKDRAGON.png");
        this.game.load.image("dragon-sapphire", "assets/monsters/SAPPHIREDRAGON.png");
        this.game.load.spritesheet("gold", "assets/gold/coins.png", 16, 16);
        this.game.load.image("rune1", "assets/runesspells/rune1.png");
        this.game.load.image("rune2", "assets/runesspells/rune2.png");
        this.game.load.image("rune3", "assets/runesspells/rune3.png");
        this.game.load.image("merchant", "assets/sprites/merchant.png");
        this.game.load.image("king", "assets/sprites/king.png");
        this.game.load.image("panel", "assets/ui/panel.png");
    },

    create: function() {

        setTimeout(function(){
            game.state.start("menu");
        }, 2500);
    }
};
