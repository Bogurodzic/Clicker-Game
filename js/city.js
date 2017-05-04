var cityState = {
    create: function() {

      var state = this;


      this.background = this.game.add.tileSprite(0, 0, 708, 511, "background-day");

      game.ui.renderAll();
      game.inventory.create();



      //icons
      this.iconInventory = this.game.add.sprite(30,210,"icon-inventory");
      this.iconInventory.scale.setTo(0.3);
      this.iconInventory.inputEnabled = true;
      this.iconInventory.events.onInputDown.add(game.inventory.toggleInventory, game.inventory);

      this.iconCity = this.game.add.sprite(30, 150, "icon-sword");
      this.iconCity.scale.setTo(0.3);
      this.iconCity.inputEnabled = true;
      this.iconCity.events.onInputDown.add(goToFight, this);

      /*this.merchant = {

        create: function(){
            this.createSprite();
            this.createPanel();
        },

        createSprite: function(){
          this.merchantSprite = game.add.sprite(450, 250, "merchant");
        },

        createPanel: function(){
          this.merchantPanel = game.add.sprite(0, 0, "panel");
          this.merchantPanel.anchor.setTo(0.5);
          this.merchantPanel.x = game.world.centerX;
          this.merchantPanel.y = game.world.centerY;
        }
      }*/


      class Npc {
        constructor(x, y, key) {
          this.x = x;
          this.y = y;
          this.key = key;
        }

        create(){
          this.createSprite();
          this.addListeners();
        }

        createSprite(){
          this.sprite = game.add.sprite(this.x, this.y, this.key);
        }

        addListeners(){
          this.sprite.inputEnabled = true;
          //this.sprite.events.onInputDown.add(this.con, this);
        }

      }

      class Merchant extends Npc {

      }
      this.merchant = new Merchant(450, 250, "merchant");
      this.merchant.create();


      function goToFight() {
        game.state.start("play");
      };

    }
};
