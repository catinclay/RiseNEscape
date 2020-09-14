// Simple class example

function SnowboardHolder(player, posX, posY, imageManager, roomTag) {
	this.roomTag = roomTag;
	this.player = player;

	this.imageManager = imageManager;

	this.image = imageManager.get("sbholderImage");
	this.x = posX;
	this.y = posY;
	this.hasSB = false;
	this.sbTag = "";
	this.isCleared = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SnowboardHolder.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

SnowboardHolder.prototype.applyGate = function(gate) {
	this.gate = gate;
}

SnowboardHolder.prototype.clear = function() {
	this.isCleared = true;
}

SnowboardHolder.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag && !this.isCleared;
}

SnowboardHolder.prototype.putsb = function(sbImageName, sbtag) {
	this.hasSB = true;
	this.sbTag = sbtag;
	this.sbImage = this.imageManager.get(sbImageName);
}

SnowboardHolder.prototype.interact = function(item) {
	if (item.getItemTag() === "jumesb" && !this.hasSB) {
		this.hasSB = true;
		this.sbTag = item.getItemTag();
		this.sbImage = this.imageManager.get("hangjumesbImage");
		this.gate.checkAnswer();
		return true;
	}
	if (item.getItemTag() === "011sb" && !this.hasSB) {
		this.hasSB = true;
		this.sbTag = item.getItemTag();
		this.sbImage = this.imageManager.get("hang011sbImage");
		this.gate.checkAnswer();
		return true;
	}

	if (item.getItemTag() === "sdoasb" && !this.hasSB) {
		this.hasSB = true;
		this.sbTag = item.getItemTag();
		this.sbImage = this.imageManager.get("hangsdoasbImage");
		this.gate.checkAnswer();
		return true;
	}
	return false;
}

SnowboardHolder.prototype.collect = function() {
	if (this.hasSB) {
		if (this.sbTag == "jumesb") {
			this.sbTag = "";
			this.hasSB = false;
			this.sbImage = '';
			return new SnowboardItem(this.imageManager, "jumesbItemImage", "jumesb");
		}

		if (this.sbTag == "011sb") {
			this.sbTag = "";
			this.hasSB = false;
			this.sbImage = '';
			return new SnowboardItem(this.imageManager, "011sbItemImage", "011sb");
		}

		if (this.sbTag == "sdoasb") {
			this.sbTag = "";
			this.hasSB = false;
			this.sbImage = '';
			return new SnowboardItem(this.imageManager, "sdoasbItemImage", "sdoasb");
		}
	}
	return;
}

//A function for drawing the particle.
SnowboardHolder.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
  	theContext.drawImage(this.image, 
  						-this.image.width / 2, 
  						-this.image.height / 2);
  	if (this.hasSB) {
  		theContext.drawImage(this.sbImage, 
  						-this.sbImage.width / 2, 
  						-this.sbImage.height / 2)
  	}

  	theContext.restore();
}

SnowboardHolder.prototype.shouldDestroy = function(theContext) {
	return false;
}