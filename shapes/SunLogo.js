// Simple class example

function SunLogo(player, posX, posY, imageManager, roomTag, soundManager, ftvScreen) {
	this.roomTag = roomTag;
	this.player = player;

	this.imageManager = imageManager;
	this.soundManager = soundManager;

	this.imageWoGoggle = imageManager.get("sunwoGoggleImage");
	this.imageWithGoggle = imageManager.get("sunwithGoggleImage");
	this.ftvScreen = ftvScreen;
	this.image = this.imageWoGoggle;
	this.x = posX;
	this.y = posY;
	this.hasGoggle = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SunLogo.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

SunLogo.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag;
}

SunLogo.prototype.interact = function(item) {
	if (item.getItemTag() === "goggle" && !this.hasGoggle) {
		this.hasGoggle = true;
		this.image = this.imageWithGoggle;
		this.soundManager.play("rnrGreeting");
		this.ftvScreen.isRevealed = true;
		return true;
	}
	return false;
}

SunLogo.prototype.collect = function() {
	return;
}

//A function for drawing the particle.
SunLogo.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

SunLogo.prototype.shouldDestroy = function(theContext) {
	return false;
}