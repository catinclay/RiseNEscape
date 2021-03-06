// Simple class example

function Guitar(player, posX, posY, imageManager, imageName) {
	this.isCollectedItem = false;
	this.imageManager = imageManager;
	this.image = imageManager.get(imageName);
	this.x = posX;
	this.y = posY;
	this.fp = 1;
	this.isCollected = false;
	this.roomTag = "1"
	this.player = player;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Guitar.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Guitar.prototype.isVisible = function() {
	return this.player.currentRoomTag = this.roomTag && !this.isCollected;
}

Guitar.prototype.collect = function() {
	this.isCollected = true;
	return new GuitarItem(this.imageManager, "guitarItemImage");
}

//A function for drawing the particle.
Guitar.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

Guitar.prototype.shouldDestroy = function(theContext) {
	return false;
}