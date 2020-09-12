// Simple class example

function GoggleItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "goggle";
}

GoggleItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

GoggleItem.prototype.getItemTag = function() {
	return this.itemTag;
}

//A function for drawing the particle.
GoggleItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

GoggleItem.prototype.shouldDestroy = function(theContext) {
	return false;
}