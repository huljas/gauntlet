/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

// game resources
var g_resources= [{
	name: "area01_level_tiles",
	type: "image",
	src: "data/area01_tileset/area01_level_tiles.png"
},{
	name: "area01",
	type: "tmx",
	src: "data/area01.tmx"
},{
    name: "gripe_run_right",
    type: "image",
    src: "data/sprite/gripe_run_right.png"
}];

/*------------------- 
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({

    /* -----

    constructor

    ------ */

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the walking & jumping speed
        this.setVelocity(3, 3);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    /* -----

    update the player pos

    ------ */
    update: function() {

        hadSpeed =    this.vel.y != 0 || this.vel.x != 0             
            if (me.input.isKeyPressed('left'))
            {
                this.vel.x = -this.accel.x * me.timer.tick
                this.direction = 'left'
            }
            else if (me.input.isKeyPressed('right'))
            {
                this.vel.x = this.accel.x * me.timer.tick 
                this.direction = 'right'
            }
            else
            {
                this.vel.x = 0;
            }

            if (me.input.isKeyPressed('up'))
            {
                this.vel.y = -this.accel.y * me.timer.tick 
                this.direction = 'up'
            }
            else if (me.input.isKeyPressed('down'))
            {
                this.vel.y = this.accel.y * me.timer.tick 
                this.direction = 'down'
            }
            else
            {
                this.vel.y = 0;
            }
        
        // check & update player movement
        updated = this.updateMovement();

        // update animation
        if (updated) {
            // update objet animation
            this.parent(this);
        }
        return updated;
    }

});



var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
      // init the video
		if (!me.video.init('jsapp', 320, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
      
	  // add our player entity in the entity pool
      me.entityPool.add("mainPlayer", PlayerEntity);
			
      // enable the keyboard
      me.input.bindKey(me.input.KEY.A, "left");
      me.input.bindKey(me.input.KEY.D, "right");
      me.input.bindKey(me.input.KEY.W, "up");
	  me.input.bindKey(me.input.KEY.S, "down");
	  
      // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
   {	
        me.levelDirector.loadLevel("area01");
   },
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
