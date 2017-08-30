function impossiblemission(root) {
    
    var self = {
        game: undefined
        ,
        bg: undefined
        ,
        map: undefined
        ,
        layer: undefined
        ,
        player: undefined
        ,
        elevators: []
        ,
        furnitures: []
        ,
        robots: []
        ,
        cursorButtons: undefined
        ,
        jumpButton: undefined
    };
    root.base = self;
       
    root.start = function() {
        self.game = new Phaser.Game(640, 400, Phaser.CANVAS, root.parentId, { 
            preload: root.preload
            , create: root.create
            , update: root.update
            , render: root.render 
        });    
    }

    // events
    
    self.preload = function(){
    };
    
    self.create = function()
    {
        self.game.physics.startSystem(Phaser.Physics.ARCADE);
        self.game.physics.arcade.gravity.y = 500;
    
        // self.bg = self.game.add.tileSprite(0, 0, 640, 400);
        // self.bg.fixedToCamera = true;
    
        self.map = self.game.add.tilemap('room');
        self.map.addTilesetImage('room');
        self.layer = self.map.createLayer('room');
        self.layer.resizeWorld();
        //  Un-comment this on to see the collision tiles
        // self.layer.debug = true;
    
        self.cursorButtons = self.game.input.keyboard.createCursorKeys();
        self.jumpButton = self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };
    
    self.update = function() { 
         
        for(var i = 0; self.robots.length; i++) {
            self.robots[i].update();
        }
        self.player.update();
        
        //
        //  input handling - movement
        //
        if (self.cursorButtons.left.isDown)
        {
            self.player.moveLeft();
        }
        else if (self.cursorButtons.right.isDown)
        {
            self.player.moveRight();
        }        
        else if (self.cursorButtons.up.isDown)
        {
            self.player.moveUp();
        }  
        else if (self.cursorButtons.down.isDown)
        {
            self.player.moveDown();
        }          
        else
        {
            self.player.idle();
        }
        
        if (self.jumpButton.isDown)
        {
            self.player.jump();
        }
    };
    
    self.render = function(){
        
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    
    };
    
    // API
    
    self.create_4125 = function(x, y) {
        var _4125 = self.game.add.sprite(x, y, '4125');
        self.game.camera.follow(_4125);

        //
        //  state
        //
        _4125.facing = "right";
        _4125.frame = 56;
        _4125.jumpTimer = 0;

        //
        //  physics
        //    
        // player.body.bounce.y = 0.0;
        self.game.physics.enable(_4125, Phaser.Physics.ARCADE);
        _4125.body.collideWorldBounds = false;
        _4125.body.setSize(20, 70, 25, 10);
    
        //
        //  animations
        //
        _4125.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11,12,13], 20, true);
        _4125.animations.add('jump-right', [28,29,30,31,32,32,34,35,36,37,38,39,40,41], 20, true);
        _4125.animations.add('left', [14,15,16,17,18,19,20,21,22,23], 20, true);
        _4125.animations.add('jump-left', [42,43,44,45,46,47,48,49,50,51,52,53,54,55], 20, true);
        
        // 
        //  updating
        //
        _4125.update = function() {
       
            //
            //  furniture handling
            //
            // if already on an elevator, try again
            if (_4125.onfurniture())
            {
                // if no more on that elevator
                if (!self.game.physics.arcade.overlap(_4125, _4125.furniture))
                {
                    // delete
                    _4125.disconnect_furniture();
                }
                else
                {
                    // if overlap do nothing
                    // do only on up key
                }
            }
            // so retry (and nothing if already...impossible being on two elevators)
            if (_4125.furniture == undefined)
            {
                for(var i = 0; i<self.furnitures.length; i++) {
                    var f = self.furnitures[i];
                    if (self.game.physics.arcade.overlap(_4125, f))
                    {
                        _4125.furniture = f;
                        break;
                    }
                }
            }
            
            //
            //  elevator handling
            //
            // if already on an elevator, try again
            if (_4125.onelevator())
            {
                // if no more on that elevator
                if (!self.game.physics.arcade.collide(_4125, self.player.elevator))
                {
                    // delete
                    _4125.disconnect_elevator();
                }
                else
                {
                    // in movement...
                    _4125.elevator.onMove(self.player);
                }
            }
            // so retry (and nothing if already...impossible being on two elevators)
            if (_4125.elevator == undefined)
            {
                for(var i = 0; i<self.elevators.length; i++) {
                    var e = self.elevators[i];
                    if (self.game.physics.arcade.collide(_4125, e))
                    {
                        _4125.elevator = e;
                        break;
                    }
                }
            }
            
            //
            //  layer collision
            //
            self.game.physics.arcade.collide(_4125, self.layer);            
        };
        
        //
        //  self movement
        //
        _4125.idle = function() {
            _4125.body.velocity.x = 0;
            
            if (_4125.facing == "furniture-scanning"){
                _4125.stop_scan_furniture();
            }
    
            if (_4125.facing != 'idle')
            {
                _4125.animations.stop();
    
                if (_4125.facing == 'left')
                {
                    _4125.frame = 57;
                }
                else // if (_4125.facing == 'right')
                {
                    _4125.frame = 56;
                }
    
                _4125.facing = 'idle';
            }            
        };
        _4125.moveRight = function() {
            _4125.body.velocity.x = 150;
    
            if (self.player.facing != 'right')
            {
                _4125.animations.play('right');
                _4125.facing = 'right';
            }            
        };
        _4125.moveLeft = function() {
            _4125.body.velocity.x = -150;
            if (_4125.facing != 'left')
            {
                _4125.animations.play('left');
                _4125.facing = 'left';
            }            
        };
        _4125.jump = function() {
            if (_4125.body.onFloor() && (self.game.time.now > _4125.jumpTimer))
            {
                _4125.body.velocity.y = -100;
                _4125.jumpTimer = self.game.time.now + 750;
                if (_4125.facing == 'right')
                {
                    _4125.animations.play('jump-right');
                }
                else if (self.player.facing == 'left')
                {
                    _4125.animations.play('jump-left');
                }
            }            
        };
        _4125.moveUp = function() {
            _4125.body.velocity.x = 0;

            if (_4125.onelevator()) {
                _4125.elevator.moveUp(_4125);
            }  
            else if (_4125.onfurniture()) {
                _4125.scan_furniture();
            }  
        };
        _4125.moveDown = function() {
            _4125.body.velocity.x = 0;

            if (_4125.onelevator()) {
                _4125.elevator.moveDown(_4125);
            }  
        };
        
        // 
        //  elevator handling
        //
        _4125.onelevator = function() {
            return _4125.elevator != undefined;
        };
        _4125.elevator = undefined;
        _4125.disconnect_elevator = function() {
            if (_4125.onelevator()) {
                var elevator = _4125.elevator;
                 _4125.elevator = undefined;                
            }          
        };
          
        // 
        //  furniture handling
        //
        _4125.onfurniture = function() {
            return _4125.furniture != undefined;
        };
        _4125.furniture = undefined;
        _4125.stop_scan_furniture = function(){
            if (_4125.furniture != undefined) {
                var furniture = _4125.furniture;
                if (furniture.content_scan_text != undefined)
                {
                    furniture.content_scan_text.destroy();
                    furniture.content_scan_text = undefined;
                }
            }
        };
        _4125.scan_furniture = function() {
            if (_4125.furniture != undefined) {
                _4125.frame = 58;
                _4125.facing = "furniture-scanning";

                var furniture = _4125.furniture;
                if (furniture.content_scan_text == undefined)
                {
                    furniture.content_scan_text = self.game.add.text(furniture.body.x, furniture.body.y-32, "0");
                }
                
                if (furniture.content_scan_index < furniture.content.length) {
                    furniture.content_scan_index++;
                    furniture.content_scan_text.text = furniture.content_scan_index;
                } else {
                    _4125.contents.push(furniture.content);
                    furniture.content = undefined;
                    furniture.content_scan_index = undefined;
                    // raise event
                    
                    furniture.content_scan_text.destroy();
                    furniture.content_scan_text = undefined;
                    furniture.kill();
                     _4125.disconnect_furniture();
                }
            }  
        };
        _4125.disconnect_furniture = function() {
            if (_4125.onfurniture()) {
                var furniture = _4125.furniture;
                if (furniture.content_scan_text != undefined)
                {
                    furniture.content_scan_text.destroy();
                    furniture.content_scan_text = undefined;
                }
                 _4125.furniture = undefined;                
            }          
        };
        
        //
        //  content handling
        //
        _4125.contents = [];
        
        return _4125;
    };
    
    self.create_elevator = function(x, yy, index) {
        var elevator = self.game.add.sprite(x, yy[index], "elevator");
        elevator.yy = yy;
        elevator.index = index;
        self.game.physics.enable(elevator, Phaser.Physics.ARCADE);

        elevator.body.allowGravity = false;
        elevator.body.immovable = true;
        elevator.body.collideWorldBounds = false;
        elevator.body.setSize(48, 16, 0, 0);
              
        elevator.body.velocity.x = 0;
        elevator.body.velocity.y = 0;
     
        elevator.frame = 0;

        //
        //  custom members
        //
        elevator.moveUp = function(sprite) {
            if (elevator.index == 0) return;
            
            elevator.body.velocity.y = -40;
        };
        elevator.moveDown = function(sprite) {
            if (elevator.index == elevator.yy.length-1) return;  
            
            elevator.body.velocity.y = 40;
        };
        elevator.onMove = function(sprite){
            if (elevator.body.velocity.y<0) {
                if (elevator.body.y < elevator.yy[elevator.index-1]) {
                    elevator.body.velocity.y = 0;                    
                    elevator.index--;
                    elevator.body.y = elevator.yy[elevator.index];
                }
            }
            else if (elevator.body.velocity.y>0){
                if (elevator.body.y > elevator.yy[elevator.index+1]) {
                    elevator.body.velocity.y = 0;                    
                    elevator.index++;
                    elevator.body.y = elevator.yy[elevator.index];
                }                
            }            
        };

        return elevator;
    };  
        
    self.create_furniture = function(x, y, width, height, type, content) {
        var furniture = self.game.add.sprite(x, y, type);
        self.game.physics.enable(furniture, Phaser.Physics.ARCADE);

        furniture.body.allowGravity = false;
        furniture.body.immovable = true;
        furniture.body.collideWorldBounds = false;
        furniture.body.setSize(width, height, 0, 0);
        furniture.body.z = -100;

        furniture.frame = 0;
        
        furniture.content = content;
        furniture.content_scan_index = 0;

        return furniture;
    };  
    
    return root;
}