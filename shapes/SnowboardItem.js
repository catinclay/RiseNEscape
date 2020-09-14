// Simple class example

function SnowboardItem(imageManager, imageName, itemTag) {
	this.image = imageManager.get(imageName);
	this.x = 0;
	this.y = 0;
	this.itemTag = itemTag;
}

SnowboardItem.prototype.setXY = function(posX, posY) {
	this.x = posX;
	this.y = posY;
}

SnowboardItem.prototype.getItemTag = function() {
	return this.itemTag;
}

SnowboardItem.prototype.getItemDescription = function() {
	let description = {};
	if (this.itemTag == "jumesb") {
		description["itemName"] = "Jones Ultra Mind Expander";
		description["0"] = "Perfect for Powder day!!";
		description["1"] = "Feels like ride on the top of cloud!!";
		description["2"] = "...";
		description["3"] = "if there is powder.";
		description["4"] = "Usually prefer medium length";
	} else if (this.itemTag == "sdoasb") {
		description["itemName"] = "Super DOA";
		description["0"] = "";
		description["1"] = "Fast!!";
		description["2"] = "";
		description["3"] = "";
		description["4"] = "Usually prefer long length";
	} else if (this.itemTag == "011sb") {
		description["itemName"] = "011 DOUBLE";
		description["0"] = "Legendary snowboard for ground trick";
		description["1"] = "Comes from Japan";
		description["2"] = "Pretty rare, hard to find";
		description["3"] = "";
		description["4"] = "Usually prefer short length";
	}	
	return description;
}


//A function for drawing the particle.
SnowboardItem.prototype.drawToContext = function(theContext) {
	if (!this.image) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	theContext.restore();
}

SnowboardItem.prototype.shouldDestroy = function(theContext) {
	return false;
}