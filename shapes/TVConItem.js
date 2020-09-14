// Simple class example

function TVConItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "tvCon";
}

TVConItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

TVConItem.prototype.getItemTag = function() {
	return this.itemTag;
}

TVConItem.prototype.getItemDescription = function() {
	let description = {};
	description["itemName"] = "TV Controller";
	description["0"] = ""
	description["1"] = "A controller to control TV[1]";
	description["2"] = "";
	description["3"] = "";
	description["4"] = "[1]: Television";
	return description;
}

//A function for drawing the particle.
TVConItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

TVConItem.prototype.shouldDestroy = function(theContext) {
	return false;
}