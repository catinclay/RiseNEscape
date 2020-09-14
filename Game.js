function Game(){}

Game.prototype.init = function(fp, canvasWidth, canvasHeight, imageManager, soundManager){
	this.fp = fp;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.imageManager = imageManager;
	this.soundManager = soundManager;

	this.initGame();
}

Game.prototype.initGame = function() {
	this.drawables = [];

	this.uiHolder = [];

	// Player.
	this.player = new Player(this.canvasWidth, this.canvasHeight);
	this.uiHolder.push(this.player);

	// Backgrounds.
	this.backgrounds = [];
	this.backgrounds.push(new Background(this.player, this.imageManager));
	this.drawables.push(this.backgrounds);

	// Inventory
	this.inventory = new Inventory(this.canvasWidth, this.canvasHeight);
	this.uiHolder.push(this.inventory);
	this.drawables.push(this.uiHolder);


	// Items on the ground.
	this.itemsOnTheGround = [];
	this.drawables.push(this.itemsOnTheGround);

	// Guitar.
	this.itemsOnTheGround.push(new Guitar(this.player, 500, 400, this.imageManager, "1"));

	// Goggle
	this.itemsOnTheGround.push(new Goggle(this.player, 500, 325, this.imageManager, "0"));

	// TV Controller
	this.itemsOnTheGround.push(new TVCon(this.player, 400, 335, this.imageManager, "0"));

	// TV
	this.itemsOnTheGround.push(new TVScreen(this.player, 467, 175, this.imageManager, "2", this.itemsOnTheGround));

	// Eric poster
	this.itemsOnTheGround.push(new EricPoster(this.player, 450, 110, this.imageManager, "0"));

	// Song name locker
	this.itemsOnTheGround.push(new SongNameLocker(this.player, 330, 160, this.imageManager, "0", this.canvasWidth, this.canvasHeight));

	// Sun Logo
	this.itemsOnTheGround.push(new SunLogo(this.player, 175, 90, this.imageManager, "2"));

	// Snowboard holder, player, posX, posY, imageManager, roomTag, itemsOnTheGround
	this.itemsOnTheGround.push(new SnowboardHolder(this.player, 450, 70, this.imageManager, "1", this.itemsOnTheGround));
	this.itemsOnTheGround.push(new SnowboardHolder(this.player, 450, 130, this.imageManager, "1", this.itemsOnTheGround));
	// put sdoa on the third sb holder;
	let sbholder = new SnowboardHolder(this.player, 450, 190, this.imageManager, "1", this.itemsOnTheGround);
	sbholder.putsb("hangsdoasbImage", "sdoasb");
	this.itemsOnTheGround.push(sbholder);


	// Snowboards, sbImageName, sbItemImageName, sbtag
	this.itemsOnTheGround.push(new Snowboard(this.player, 175, 300, this.imageManager, "2", "jumesbImage", "jumesbItemImage", "jumesb"));

	this.particles = [];
	this.drawables.push(this.particles);
}

Game.prototype.update = function() {
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {

	if (this.inventory.hitTest(touchX, touchY)) {
		this.inventory.select(touchX, touchY);
		return;
	}

	if (this.player.hitTest(touchX, touchY)) {
		this.player.move(this.player.getMoveDirection(touchX, touchY));
	}
	if (this.inventory.selectedIndex == -1) {
		// Does not holding anything in the hand.
		for (var i = this.itemsOnTheGround.length - 1; i >= 0; i--) {
			if (this.itemsOnTheGround[i].hitTest(touchX, touchY)) {
				this.inventory.collect(this.itemsOnTheGround[i].collect());
			}
		}
	} else {
		for (var i = this.itemsOnTheGround.length - 1; i >= 0; i--) {
			if (this.itemsOnTheGround[i].hitTest(touchX, touchY)) {
				if(this.itemsOnTheGround[i].interact(this.inventory.tryUse())) {
					this.inventory.consume();
				}
			}
		}
	}
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}