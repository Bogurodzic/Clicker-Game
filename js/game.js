var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add("play", {
    preload: function() {
        game.load.image("skeleton", "assets/enemies/skeleton1.png");
        game.load.image("nagaruda", "assets/enemies/nagaruda1.png");
        game.load.image("arcanedrake", "assets/enemies/arcana_drake1.png");
        game.load.image("deceleon", "assets/enemies/deceleon1.png");
        this.game.load.image("forest-back", "assets/background/forest/parallax-forest-back-trees.png");
        this.game.load.image("forest-lights", "assets/background/forest/parallax-forest-lights.png");
        this.game.load.image("forest-middle", "assets/background/forest/parallax-forest-middle-trees.png");
        this.game.load.image("forest-front", "assets/background/forest/parallax-forest-front-trees.png");
    },
    create: function() {
        var state = this;
        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });
        
        
        var monsterData = [
            {name: "Skeleton", image: "skeleton"},
            {name: "Nagaruda", image: "nagaruda"},
            {name: "Arcane Drake", image: "arcanedrake"},
            {name: "Deceleon", image: "deceleon"}
        ]
        
        this.monsters = this.game.add.group();
        
        var monster;
        monsterData.forEach(function(data){
            // create a sprite for them off screen
            monster = state.monsters.create(1000, state.game.world.centerY, data.image);
            //center anchor
            monster.anchor.setTo(0.5);
            //reference to the database
            monster.details = data;

            
            //enable input so we can click it!
            monster.inputEnabled = true;
            monster.events.onInputDown.add(onClickMonster, state)
            
        });
        
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);

        function onClickMonster(){
            this.currentMonster.position.set(1000, this.game.world.centerY);
            
            this.currentMonster = this.monsters.getRandom();
            this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        }

    },
    render: function() {
        game.debug.text(this.currentMonster.details.name, this.game.world.centerX - this.currentMonster.width / 2, this.game.world.centerY);
    }
});




game.state.start("play");