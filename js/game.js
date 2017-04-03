var game = new Phaser.Game(708, 511, Phaser.Auto, "gameWindow");

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("city", cityState);

game.state.start("load");
