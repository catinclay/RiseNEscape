// Simple class example

function Goggle(player, posX, posY, imageManager, roomTag) {
	this.roomTag = roomTag;
	this.player = player;
	this.imageManager = imageManager;
	this.image = imageManager.get("goggleImage");
	this.x = posX;
	this.y = posY;
	this.fp = 1;
	this.isCollected = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Goggle.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Goggle.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag && !this.isCollected;
}

Goggle.prototype.collect = function() {
	this.isCollected = true;
	return new GoggleItem(this.imageManager, "goggleItemImage");
}

//A function for drawing the particle.
Goggle.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

Goggle.prototype.shouldDestroy = function(theContext) {
	return false;
}