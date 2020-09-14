// Simple class example

function LetterItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "letter";
}

LetterItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

LetterItem.prototype.getItemTag = function() {
	return this.itemTag;
}

//A function for drawing the particle.
LetterItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

LetterItem.prototype.shouldDestroy = function(theContext) {
	return false;
}