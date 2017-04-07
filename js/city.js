var cityState = {
    create: function() {

      var state = this;

      this.player = {
          maxHp: 100,
          currentHp: 100,
          clickDamage: 1,
          dps: 0,
          gold: 0
      };

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

      loadFromLocalStorage();

      function goToFight() {
        game.state.start("play");
        saveToLocalStorage();
      };

      function saveToLocalStorage() {
        //save basic player stats
        localStorage.maxHp = state.player.maxHp;
        localStorage.currentHp = state.player.currentHp;
        localStorage.clickDamage = state.player.clickDamage;
        localStorage.dps = state.player.dps
        localStorage.gold = state.player.gold;

        console.log("Saved");
      };

      function loadFromLocalStorage() {
        //load basic player stats
        state.player.maxHp = localStorage.getItem("maxHp");
        state.player.currentHp = localStorage.getItem("currentHp");
        state.player.clickDamage = localStorage.getItem("clickDamage");
        state.player.dps = localStorage.getItem("dps");
        state.player.gold = localStorage.getItem("gold");

        console.log("loaded");
      }

    }
};
