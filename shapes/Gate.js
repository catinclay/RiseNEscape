// Simple class example

function Gate(player, posX, posY, imageManager, roomTag, toRoomTag, gateImageName, forceOn) {
	this.roomTag = roomTag;
	this.player = player;
	this.imageManager = imageManager;
	this.image = this.imageManager.get(gateImageName);
	this.x = posX;
	this.y = posY;
	this.isOn = forceOn;
	this.toRoomTag = toRoomTag;

	this.clickOnDate = false;
	this.clickOnGate = false;

	this.isLastGate = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Gate.prototype.hitTest = function(hitX,hitY) {
	if (!this.isVisible()) return false;
	if (((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2))) {
		if (hitY - (this.y - this.image.height / 2) < 40) {
			return false;
		}
		if (hitY - (this.y - this.image.height / 2) < 75) {
			this.clickOnGate = false;
			this.clickOnDate = true;
		}
		if (hitY - (this.y - this.image.height / 2) >= 75) {
			this.clickOnGate = true;
			this.clickOnDate = false;
		}
		return true;
	}
	return false;	
}

Gate.prototype.applySBHolders = function(sbholders) {
	this.sbholders = sbholders;
	for (var i = this.sbholders.length - 1; i >= 0; i--) {
		this.sbholders[i].applyGate(this);
	}
}

Gate.prototype.checkAnswer = function() {
	if (this.sbholders[0].sbTag == "sdoasb" &&
		this.sbholders[1].sbTag == "jumesb" &&
		this.sbholders[2].sbTag == "011sb") {
		for (var i = this.sbholders.length - 1; i >= 0; i--) {
			this.sbholders[i].clear();
		}
		this.isOn = true;
	}
}

Gate.prototype.isVisible = function() {
	return this.isOn && this.player.currentRoomTag == this.roomTag;
}

Gate.prototype.interact = function(item) {
	if (this.clickOnDate && item.getItemTag() === "letter") {
		this.isLastGate = true;
		this.image = this.imageManager.get("lastGateImage");
		return true;
	}
	return false;
}

Gate.prototype.collect = function() {
	if (this.clickOnGate && !this.isLastGate) {
		this.player.currentRoomTag = this.toRoomTag;
	} else if (this.clickOnGate && this.isLastGate) {
		this.player.currentRoomTag = 99;
		this.player.stopCocaineSong();
	}
	return;
}

//A function for drawing the particle.
Gate.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	if (this.isOn) {
		theContext.save();
		theContext.translate(this.x, this.y);
	  	theContext.drawImage(this.image, 
	  						-this.image.width / 2, 
	  						-this.image.height / 2);
	  	theContext.restore();
    }
}

Gate.prototype.shouldDestroy = function(theContext) {
	return false;
}