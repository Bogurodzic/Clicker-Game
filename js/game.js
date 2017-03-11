var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        game.load.image('skeleton', 'assets/enemies/skeleton1.png');
    },
    create: function() {
        var skeletonSprite = game.add.sprite(450, 290, 'skeleton');
        skeletonSprite.anchor.setTo(0.5, 0.5);
    },
    render: function() {
        game.debug.text('Adventure Awaits!', 250, 290);
    }
});

game.state.start('play');