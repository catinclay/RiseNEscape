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
	// Inventory
	this.inventory = new Inventory(this.canvasWidth, this.canvasHeight);
	this.uiHolder = [];
	this.uiHolder.push(this.inventory);
	this.drawables.push(this.uiHolder);

	// Items on the ground.
	this.itemsOnTheGround = [];
	this.drawables.push(this.itemsOnTheGround);

	// Player.
	this.player = new Player(this.canvasWidth, this.canvasHeight);
	this.uiHolder.push(this.player);

	// Guitar.
	this.itemsOnTheGround.push(new Guitar(this.player, 200, 300, this.imageManager, "1"));

	// Goggle
	this.itemsOnTheGround.push(new Goggle(this.player, 600, 200, this.imageManager, "2"));


	// Eric poster
	this.itemsOnTheGround.push(new EricPoster(this.player, 400, 200, this.imageManager, "0"));

	// Sun Logo
	this.itemsOnTheGround.push(new SunLogo(this.player, 200, 100, this.imageManager, "1"))

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