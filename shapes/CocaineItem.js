// Simple class example

function CocaineItem(imageManager, imageName) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = "cocaine";
}

CocaineItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

CocaineItem.prototype.getItemTag = function() {
	return this.itemTag;
}

CocaineItem.prototype.getItemDescription = function() {
	let description = {};
	description["itemName"] = "C*****n";
	description["0"] = ""
	description["1"] = "";
	description["2"] = "shhh..";
	description["3"] = "";
	description["4"] = "";
	return description;
}

//A function for drawing the particle.
CocaineItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

CocaineItem.prototype.shouldDestroy = function(theContext) {
	return false;
}