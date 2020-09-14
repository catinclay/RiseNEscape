// Simple class example

function GuitarItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "guitar";
}

GuitarItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

GuitarItem.prototype.getItemTag = function() {
	return this.itemTag;
}

GuitarItem.prototype.getItemDescription = function() {
	let description = {};
	description["itemName"] = "Guitar";
	description["0"] = "Good quality,"
	description["1"] = "not sure why it's left here.";
	description["2"] = "Looks like belongs to a super star.";
	description["3"] = "Maybe I should return this to him?";
	description["4"] = "";
	return description;
}

//A function for drawing the particle.
GuitarItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

GuitarItem.prototype.shouldDestroy = function(theContext) {
	return false;
}