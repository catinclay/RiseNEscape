// Simple class example

function FTVScreen(player, posX, posY, imageManager, roomTag, itemsOnTheGround) {
	this.roomTag = roomTag;
	this.player = player;

	this.imageManager = imageManager;
	this.soundManager = soundManager;
	this.imageRNRCM = imageManager.get("rnrCMImage");
	this.imageBombCM = imageManager.get("bombCMImage");
	this.image = this.imageRNRCM;
	this.itemsOnTheGround = itemsOnTheGround;
	this.x = posX;
	this.y = posY;
	this.isBombCM = false;
	this.isRevealed = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
FTVScreen.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

FTVScreen.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag && this.isRevealed;
}

FTVScreen.prototype.interact = function(item) {
	if (item.getItemTag() === "cocaine" && !this.isBombCM) {
		this.image = this.imageBombCM;
		this.itemsOnTheGround.unshift(new Bomb(this.player, 375, 170, this.imageManager, this.roomTag));
		this.isBombCM = true;
		return true;
	}
	return false;
}

FTVScreen.prototype.collect = function() {
	return;
}

//A function for drawing the particle.
FTVScreen.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

FTVScreen.prototype.shouldDestroy = function(theContext) {
	return false;
}