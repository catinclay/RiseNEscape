// Simple class example

function Cocaine(player, posX, posY, imageManager, roomTag) {
	this.roomTag = roomTag;
	this.player = player;
	this.imageManager = imageManager;
	this.image = imageManager.get("cocaineImage");
	this.x = posX;
	this.y = posY;
	this.fp = 1;
	this.isCollected = false;
	this.revealed = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Cocaine.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Cocaine.prototype.isVisible = function() {
	return this.revealed && this.player.currentRoomTag == this.roomTag && !this.isCollected;
}

Cocaine.prototype.collect = function() {
	this.isCollected = true;
	return new CocaineItem(this.imageManager, "cocaineItemImage");
}

Cocaine.prototype.interact = function(item) {
	return false;
}

//A function for drawing the particle.
Cocaine.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

Cocaine.prototype.shouldDestroy = function(theContext) {
	return false;
}