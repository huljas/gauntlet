/**
 * A bare bones Sprite and sprite Group example.
 *
 * We move a lot of Ship sprites across the screen with varying speed. The sprites
 * rotate themselves randomly. The sprites bounce back from the bottom of the
 * screen.
 */

var gamejs = require('gamejs');

/**
 * The ship Sprite has a randomly rotated image und moves with random speed (upwards).
 */
var Ship = function(rect) {
   // call superconstructor
   Ship.superConstructor.apply(this, arguments);
   this.speed = 100;
   this.rotationSpeed = 360;
   this.originalImage = gamejs.image.load("images/ship.png");
   this.rotation = parseInt(360*Math.random());
   this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
   this.rect = new gamejs.Rect(rect);
   this.acceleration = 0;
   this.movementDirection = 0;
   this.rotationDirection = 0;
   gamejs.log("New ship ", this.rotation, this.speed);
   return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);
Ship.prototype.update = function(msDuration) {
    var timePassedSeconds = msDuration / 1000;
    this.rotation += this.rotationDirection * this.rotationSpeed * timePassedSeconds;
    var heading = gamejs.utils.vectors.rotate([1,0], gamejs.utils.math.radians(this.rotation));
	heading = gamejs.utils.vectors.multiply(heading, this.movementDirection);
	var moveV = gamejs.utils.vectors.multiply(heading, this.speed * timePassedSeconds);
	var oldSize = this.image.getSize();
    this.image = gamejs.transform.rotate(this.originalImage, this.rotation);
    var newSize = this.image.getSize();
    this.rect.moveIp([moveV[0] + (oldSize[0] - newSize[0])/2, moveV[1] + (oldSize[1] - newSize[1])/2]);
	this.movementDirection = 0;
	this.rotationDirection = 0;
};

function main() {
    // screen setup
    gamejs.display.setMode([800, 600]);
    gamejs.display.setCaption("Example Sprites");
    // create some ship sprites and put them in a group
    var ship = new Ship([100, 100]);
    var gShips = new gamejs.sprite.Group();
    for (var j=0;j<4;j++) {
        for (var i=0; i<3; i++) {
        //gShips.add(new Ship([10 + i*20, j * 20]));
        }
    }
	var keysDown = {};
    // game loop
    var mainSurface = gamejs.display.getSurface();
    // msDuration = time since last tick() call
    var tick = function(msDuration) {
        mainSurface.fill("#000000");
        // update and draw the ships
        gShips.update(msDuration);
        gShips.draw(mainSurface);
        ship.update(msDuration);
        ship.draw(mainSurface);

        var events = gamejs.event.get();
        events.forEach(function(event) {
            if (event.type === gamejs.event.KEY_DOWN) {
                gamejs.log("key down", event.key);
				keysDown[event.key] = true;
			}
			if (event.type === gamejs.event.KEY_UP) {
				gamejs.log("key up", event.key);
				keysDown[event.key] = false;
			}			
        });
		if (keysDown[gamejs.event.K_a]) {
			ship.rotationDirection = -1;
		}
		if (keysDown[gamejs.event.K_d]) {
			ship.rotationDirection = 1;
		}
		if (keysDown[gamejs.event.K_w]) {
			ship.movementDirection = 1;
		}
		if (keysDown[gamejs.event.K_s]) {
			ship.movementDirection = -1;                    
		}
    };
	gamejs.time.fpsCallback(tick, this, 60);
}


/**
 * M A I N
 */
gamejs.preload(['images/ship.png']);
gamejs.ready(main);
