function Game(){}

// TODO:
// - item info
// - SB holder hint
// - Song name locker hint
// - Time warp animation

// Option
// - Hover hint image?


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


	// Items on the ground.
	this.itemsOnTheGround = [];
	this.drawables.push(this.itemsOnTheGround);

	// Inventory, UI
	this.inventory = new Inventory(this.canvasWidth, this.canvasHeight);
	this.uiHolder.push(this.inventory);
	this.drawables.push(this.uiHolder);

	// Guitar.
	this.itemsOnTheGround.push(new Guitar(this.player, 500, 400, this.imageManager, "1"));

	// Goggle
	this.itemsOnTheGround.push(new Goggle(this.player, 600, 400, this.imageManager, "5"));

	// Furture TV
	let ftvScreen = new FTVScreen(this.player, 450, 168, this.imageManager, "5", this.itemsOnTheGround);
	this.itemsOnTheGround.push(ftvScreen);

	// Cocaine
	let cocaine = new Cocaine(this.player, 450, 310, this.imageManager, "SongNameLockerZI");
	this.itemsOnTheGround.push(cocaine);

	// TV Controller
	this.itemsOnTheGround.push(new TVCon(this.player, 400, 335, this.imageManager, "0"));

	// TV
	this.itemsOnTheGround.push(new TVScreen(this.player, 467, 175, this.imageManager, "2", this.itemsOnTheGround));

	// Eric poster
	this.itemsOnTheGround.push(new EricPoster(this.player, 450, 110, this.imageManager, "0", this.soundManager));

	// Song name locker
	this.itemsOnTheGround.push(new SongNameLocker(this.player, 330, 160, this.imageManager, "0", this.canvasWidth, this.canvasHeight, cocaine));

	// Sun Logo
	this.itemsOnTheGround.push(new SunLogo(this.player, 450, 100, this.imageManager, "3", this.soundManager, ftvScreen));

	// Snowboard holder, player, posX, posY, imageManager, roomTag, itemsOnTheGround
	let sbholder1 = new SnowboardHolder(this.player, 450, 70, this.imageManager, "1");
	let sbholder2 = new SnowboardHolder(this.player, 450, 130, this.imageManager, "1");
	this.itemsOnTheGround.push(sbholder1);
	this.itemsOnTheGround.push(sbholder2);

	// put sdoa on the third sb holder;
	let sbholder3 = new SnowboardHolder(this.player, 450, 190, this.imageManager, "1");
	sbholder3.putsb("hangsdoasbImage", "sdoasb");
	this.itemsOnTheGround.push(sbholder3);

	// Time Machince Gate, roomTag, toRoomTag, gateImageName, forceOn
	let oldGate = new Gate(this.player, 450, 218, this.imageManager, "1", "3", "oldGateImage", false);
	oldGate.applySBHolders([sbholder1, sbholder2, sbholder3]);
	this.itemsOnTheGround.push(oldGate);

	let newGate = new Gate(this.player, 450, 218, this.imageManager, "4", "0", "newGateImage", true);
	this.itemsOnTheGround.push(newGate);

	// Boxes
	let futureBomb = new Bomb(this.player, 250, 300, this.imageManager, "4");
	let futureBox = new Box(this.player, 250, 375, this.imageManager, "4", 
		futureBomb);
	this.itemsOnTheGround.push(futureBomb);
	this.itemsOnTheGround.push(futureBox);

	let bomb = new Bomb(this.player, 250, 300, this.imageManager, "1");
	let box = new Box(this.player, 250, 375, this.imageManager, "1", 
		bomb);
	box.applyFutureBox(futureBox);
	this.itemsOnTheGround.push(bomb);
	this.itemsOnTheGround.push(box);

	// Snowboards, sbImageName, sbItemImageName, sbtag
	this.itemsOnTheGround.push(new Snowboard(this.player, 175, 300, this.imageManager, "2", "jumesbImage", "jumesbItemImage", "jumesb"));

	this.particles = [];
	this.drawables.push(this.particles);

	// Test code
	// this.inventory.collect(new CocaineItem(this.imageManager, "cocaineItemImage"));
	this.player.currentRoomTag = "0";
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
	if (this.inventory.hitTest(touchX, touchY)) {
		this.inventory.hover(touchX, touchY);
	} else {
		this.inventory.unHover();
	}
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}