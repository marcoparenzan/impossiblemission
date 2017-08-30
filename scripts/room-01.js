(function(parentId){
    
    var self = impossiblemission({
        parentId: parentId    
    });
    var base = self.base;
    
    self.preload = function() {
        
        base.preload();
        
        base.game.load.spritesheet('4125', 'content/assets/games/impossiblemission/4125-spritesheet.png', 70, 82);
        base.game.load.tilemap('room', 'content/assets/games/impossiblemission/room-01.json', null, Phaser.Tilemap.TILED_JSON);
        base.game.load.image('room', 'content/assets/games/impossiblemission/room-tiles-blue.png');
        base.game.load.spritesheet('control-pc', 'content/assets/games/impossiblemission/furnitures/control-pc.png');
        base.game.load.spritesheet('desk', 'content/assets/games/impossiblemission/furnitures/desk.png');
        base.game.load.spritesheet('pc', 'content/assets/games/impossiblemission/furnitures/pc.png');
        base.game.load.spritesheet('printer', 'content/assets/games/impossiblemission/furnitures/printer.png');
        base.game.load.spritesheet('data-store', 'content/assets/games/impossiblemission/furnitures/data-store.png');
        base.game.load.spritesheet('elevator', 'content/assets/games/impossiblemission/elevator-yellow.png', 48, 16);
     }    
    
    self.create = function() {
    
        base.create();
    
        // specific
        base.map.setCollisionBetween(2,5);
    
        base.elevators[0] = base.create_elevator(16, [288, 384], 1);        
        base.elevators[1] = base.create_elevator(96, [288, 384], 1);
        base.elevators[2] = base.create_elevator(176, [192, 288], 1);
        base.elevators[3] = base.create_elevator(256, [192, 288], 1);
        base.elevators[4] = base.create_elevator(336, [96, 192], 1);
        base.elevators[5] = base.create_elevator(416, [96, 192], 1);
        
        base.furnitures[0] = base.create_furniture(80, 48, 48, 48, "control-pc", { length: 100, message: "Hello World" });
        base.furnitures[1] = base.create_furniture(160, 336, 48, 48, "control-pc", { length: 100, message: "Hello World" });
        base.furnitures[2] = base.create_furniture(400, 240, 108, 48, "desk", { length: 100, message: "Hello World" });
        base.furnitures[3] = base.create_furniture(524, 240, 32, 48, "pc", { length: 100, message: "Hello World" });
        base.furnitures[4] = base.create_furniture(224, 320, 80, 64, "data-store", { length: 100, message: "Hello World" });
        base.furnitures[5] = base.create_furniture(320, 336, 48, 48, "printer", { length: 100, message: "Hello World" });
        base.furnitures[6] = base.create_furniture(384, 336, 48, 48, "printer", { length: 100, message: "Hello World" });
        base.furnitures[7] = base.create_furniture(450, 336, 48, 48, "printer", { length: 100, message: "Hello World" });

        // at the end for z
        base.player = base.create_4125(0, 0);
    }
    
    self.update = function() {
        
        base.update();
        
    }
    
    self.render = function() {
    
        base.render();
    
    }
    
    self.start();
    
    return self;   
})("screen");