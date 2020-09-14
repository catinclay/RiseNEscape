// Simple class example

function Bomb(player, posX, posY, imageManager, roomTag) {
	this.roomTag = roomTag;
	this.player = player;
	this.imageManager = imageManager;
	this.image = imageManager.get("timeBombImage");
	this.x = posX;
	this.y = posY;
	this.fp = 1;
	this.isCollected = false;
	this.isExploded = false;
}

Bomb.prototype.applyBox = function(box) {
	this.box = box;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Bomb.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Bomb.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag && !this.isCollected;
}

Bomb.prototype.collect = function() {
	this.isCollected = true;
	if (this.box) {
		this.box.bombCollect();
	}
	return new BombItem(this.imageManager, "timeBombItemImage");
}

Bomb.prototype.interact = function(item) {
	return false;
}

//A function for drawing the particle.
Bomb.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

Bomb.prototype.shouldDestroy = function(theContext) {
	return false;
}