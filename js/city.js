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
      class Modal {
        constructor(x, y, width, height){
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;

          this.visible = false;
        }

        createBitmap(){
          var bitmap = game.add.bitmapData(this.width, this.height);
          bitmap.ctx.beginPath();
          bitmap.ctx.rect(0, 0, this.width, this.height);
          bitmap.ctx.fillStyle = "brown";
          bitmap.ctx.fill();
          return bitmap;
        }

        createSprite(){
          this.modalSprite = game.add.sprite(1000, 1000, this.createBitmap());
        }

        delete(){
          if(this.modalSprite){
            this.modalSprite.destroy();
          }
        }

        changeSize(width, height){
          this.delete();
          this.width = width;
          this.height = height;
          this.createSprite();
        }

        changePosition(x, y){
          this.modalSprite.x = x;
          this.modalSprite.y = y;
        }

        toggle(){
          if(this.visible){
            this.changePosition(1000, 1000);
            this.visible = false;
          } else if (!this.visible) {
            this.changePosition(this.x, this.y);
            this.visible = true;
          }
        }

      }

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
          if(this.modal){
            this.sprite.events.onInputDown.add(this.modal.toggle, this.modal);
          }
        }

        addModal(x, y, width, height){
          this.modal = new Modal(x, y, width, height);
          this.modal.createSprite.call(this.modal);
          this.addListeners();
        }

      }

      class Merchant extends Npc {

      nextItem(item){
        switch(item) {
          case "weapons":
              return "shields"
              break;
          case "shields":
              return "armors";
              break;
          case "armors":
              return "helmets";
              break;
          case "helmets":
              return "boots";
              break;
          case "boots":
              return "weapons";
              break;
            }
        }

        prevItem(item){
          switch(item) {
            case "shields":
                return "weapons"
                break;
            case "armors":
                return "shields";
                break;
            case "helmets":
                return "armors";
                break;
            case "boots":
                return "helmets";
                break;
            case "weapons":
                return "boots";
                break;
              }
          }

        switchTab(items){
          this.removeItems();
          this.addModal(525, 200, 100, (game.equipment.equipmentList[items].length*65));
          this.modal.toggle();
          this.createItems(items);
        }

        createItems(items){
          self = this;

          if(!this.modal){
            this.addModal(525, 200, 100, game.equipment.equipmentList[items].length*65);
          }

          this[items] = this.modal.modalSprite.addChild(game.add.group());
          this[items].arrowLeft = this[items].create(23,32, "arrow");
          this[items].arrowRight = this[items].create(75 ,0, "arrow");
          this[items].arrowLeft.angle = 180;
          this[items].text = this[items].addChild(game.add.text(26, 5, items, {
              font: "19px 'Jim Nightshade', cursive",
              fill: "black"}));
          this[items].arrowRight.inputEnabled = true;
          this[items].arrowLeft.inputEnabled = true;
          this[items].arrowRight.events.onInputDown.add(function(){
            this.switchTab(this.nextItem(items));
          }, this);

          this[items].arrowLeft.events.onInputDown.add(function(){
            this.switchTab(this.prevItem(items));
          }, this);
          //this.arrows.scale.setTo(0.1);
          [].forEach.call(game.equipment.equipmentList[items], function(data, index){
            let item = self[items].create(0, 28 + (40 * index), data.icon);
            let text = self[items].addChild(game.add.text(40, 28 + (40 * index), "cost: "+ data.cost + "\nlevel: " + data.level, {
                font: "21px 'Jim Nightshade'",
                fill: "black"}));
            text.lineSpacing = -10;
            item.scale.setTo(0.3);
            item.inputEnabled = true;
            item.events.onInputOver.add(function(){
              game.infoWindow.render(data.name);
            }, game.infoWindow);
            item.events.onInputOut.add(game.infoWindow.close, this);
            item.events.onInputDown.add(self.updateItem, data);
            item.events.onInputDown.add(function(){
              self.updateItemText(text, data);
            }, data);
          });
        }

        removeItems(){
          this.modal.modalSprite.destroy();
        }

        updateItem(item){
          if((game.player.gold - this.cost) >= 0 ){
            game.player.gold -= Math.round(this.cost);
            game.ui.updateGold();
            this.level++;
            this.cost = Math.round(self.calculateUpgradeCost(this.cost, this.level));
          } else {
            console.log("you dont have enough money");
          }
        }

        updateItemText(text, item){
          text.text = "cost: "+ item.cost + "\nlevel: " + item.level;
        }

        calculateUpgradeCost(cost, level){
          return cost * level * 1.66;
        }

      }


      this.merchant = new Merchant(450, 250, "merchant");
      this.merchant.create();
      //this.merchant.addModal(525, 200, 100, 100);
      this.merchant.createItems("weapons");

      this.king = new Npc(200, 250, "king");
      this.king.create();
      this.king.addModal(300, 300, 100, 100);



      function goToFight() {
        game.state.start("play");
      };

    }
};
