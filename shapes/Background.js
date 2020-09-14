// Simple class example

function Background(player, imageManager) {
	this.player = player;
	this.backgroundImages = {};
	this.backgroundImages["0"] = imageManager.get("bg-0");
	this.backgroundImages["1"] = imageManager.get("bg-1");
	this.backgroundImages["2"] = imageManager.get("bg-2");

}


//A function for drawing the particle.
Background.prototype.drawToContext = function(theContext) {
	// if (!this.isVisible()) return;
	theContext.save();
	// theContext.translate(this.x, this.y);
	if (this.backgroundImages[this.player.currentRoomTag]) {
		this.image = this.backgroundImages[this.player.currentRoomTag];
	  	theContext.drawImage(this.image, 0, 0);
	  	theContext.restore();
	}
}

Background.prototype.shouldDestroy = function(theContext) {
	return false;
}