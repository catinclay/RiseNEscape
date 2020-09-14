// Simple class example

function BombItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "bomb";
}

BombItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

BombItem.prototype.getItemTag = function() {
	return this.itemTag;
}

//A function for drawing the particle.
BombItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

BombItem.prototype.shouldDestroy = function(theContext) {
	return false;
}