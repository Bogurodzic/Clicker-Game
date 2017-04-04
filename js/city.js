var cityState = {
    create: function() {

      this.background = this.game.add.tileSprite(0, 0, 708, 511, "background-day");

      this.uiFrame = this.game.add.image(0, 0, "ui-frame");
      this.uiFrame.scale.setTo(1.2);

      //icons
      this.iconInventory = this.game.add.sprite(30,210,"icon-inventory");
      this.iconInventory.scale.setTo(0.3);
      this.iconInventory.inputEnabled = true;
      //this.iconInventory.events.onInputDown.add(toggleInventory, this);

      this.iconCity = this.game.add.sprite(30, 150, "icon-sword");
      this.iconCity.scale.setTo(0.3);
      this.iconCity.inputEnabled = true;
      this.iconCity.events.onInputDown.add(goToFight, this);

      function goToFight() {
        game.state.start("play");
      }

    }
};
