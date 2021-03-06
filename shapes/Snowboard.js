// Simple class example

function Snowboard(player, posX, posY, imageManager, roomTag, sbImageName, sbItemImageName, sbtag) {
	this.roomTag = roomTag;
	this.player = player;
	this.imageManager = imageManager;
	this.image = imageManager.get(sbImageName);
	this.sbItemImageName = sbItemImageName;
	this.sbtag = sbtag;
	this.x = posX;
	this.y = posY;
	this.isCollected = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Snowboard.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Snowboard.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag && !this.isCollected;
}

Snowboard.prototype.collect = function() {
	this.isCollected = true;
	return new SnowboardItem(this.imageManager, this.sbItemImageName, this.sbtag);
}

Snowboard.prototype.interact = function(item) {
	return false;
}

//A function for drawing the particle.
Snowboard.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

Snowboard.prototype.shouldDestroy = function(theContext) {
	return false;
}