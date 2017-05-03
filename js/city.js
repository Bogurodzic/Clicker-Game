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


      function goToFight() {
        game.state.start("play");
      };

    }
};
