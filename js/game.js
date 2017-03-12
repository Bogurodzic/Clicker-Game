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
        
        this.player = {
            clickDmg: 1,
            gold: 0
        };
        
        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });
        
        
        var monsterData = [
            {name: "Skeleton", image: "skeleton", maxHealth: 5},
            {name: "Nagaruda", image: "nagaruda", maxHealth: 10},
            {name: "Arcane Drake", image: "arcanedrake", maxHealth: 15},
            {name: "Deceleon", image: "deceleon", maxHealth: 20}
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
            monster.health = monster.maxHealth = data.maxHealth;

            
            //enable input so we can click it!
            monster.inputEnabled = true;
            monster.events.onInputDown.add(onClickMonster, state)
            
            // hook into health and lifecycle events
            monster.events.onKilled.add(onKilledMonster, state);
            monster.events.onRevived.add(onRevivedMonster, state);
            
        });
        
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        
        this.monsterInfoUI = this.game.add.group();
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 250, this.currentMonster.y);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name), {
            font: "48px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        });
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 30, this.currentMonster.health + " HP"), {
            font: "32px Arial Black",
            fill: "#ff0000",
            strokeThickness: 4
        });
        
        this.dmgTextPool = this.add.group();
        var dmgText;
              
        for (var i=0; i<50; i++){
            dmgText = this.add.text(0, 0, "1", {
                font: "64px Arial Black",
                color: "#fff",
                strokeThickness: 4
            });
            //start out not existing, so we don't draw it yet
            dmgText.exists = false;
            dmgText.tween = game.add.tween(dmgText).to({
                alpha: 0,
                y: 100,
                x: this.game.rnd.integerInRange(100, 700)
            }, 1000, Phaser.Easing.Cubic.Out);
            
            dmgText.tween.onComplete.add(function(text, tween){
               text.kill(); 
            });
            this.dmgTextPool.add(dmgText);
        }
        

        function onClickMonster(){
            this.currentMonster.damage(this.player.clickDmg);
            this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + " HP" : "DEAD";
            console.log(this.currentMonster.health);
            
            var dmgText = this.dmgTextPool.getFirstExists(false);
            if (dmgText) {
                dmgText.text = this.player.clickDmg;
                dmgText.reset(game.input.mousePointer.x, game.input.mousePointer.y);
                dmgText.alpha = 1;
                dmgText.tween.start();
            }
        };
        
        function onKilledMonster(monster){
            //move the monster off-screen once again
            monster.position.set(1000, this.game.world.centerY);
            
            //pick a new monster
            this.currentMonster = this.monsters.getRandom();
            //make sure they are fully healed
            this.currentMonster.revive(this.currentMonster.maxHealth);
        };
        
        function onRevivedMonster(monster){
            this.monsterNameText.text = this.currentMonster.details.name;
            this.monsterHealthText.text = this.currentMonster.health + " HP";
            this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        }
        

    },
    update: function() {
    },
    render: function() {
        //game.debug.text(this.currentMonster.details.name, this.game.world.centerX - this.currentMonster.width / 2, this.game.world.centerY);
    }
});




game.state.start("play");