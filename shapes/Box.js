// Simple class example

function Box(player, posX, posY, imageManager, roomTag, bomb) {
	this.roomTag = roomTag;
	this.player = player;

	this.imageManager = imageManager;

	this.image = imageManager.get("boxImage");
	this.brokenWLImage = imageManager.get("brokenBoxWLImage");
	this.brokenWoLImage = imageManager.get("brokenBoxWoLImage");
	this.x = posX;
	this.y = posY;
	this.bomb = bomb;
	this.bomb.applyBox(this);
	this.bomb.isCollected = true;
	this.isBroken = false;
	this.hasLetter = true;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Box.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2));
}

Box.prototype.bombCollect = function() {
	if (this.fbox) {
		this.fbox.isBroken = false;
	}
}

Box.prototype.applyFutureBox = function(fbox) {
	this.fbox = fbox;
}

Box.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag;
}

Box.prototype.interact = function(item) {
	if (item.getItemTag() === "bomb") {
		this.bomb.isCollected = false;
		if(this.fbox) {
			this.fbox.isBroken = true;
		}
		return true;
	}
	return false;
}

Box.prototype.collect = function() {
	if (this.isBroken && this.hasLetter) {
		this.hasLetter = false;
		return new LetterItem(this.imageManager, "letterItemImage");
	}
	return;
}

//A function for drawing the particle.
Box.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	theContext.save();
	theContext.translate(this.x, this.y);
	if (!this.isBroken) {
	  	theContext.drawImage(this.image, 
	  						-this.image.width / 2, 
	  						-this.image.height / 2);
	} else {
		if (this.hasLetter) {
		  	theContext.drawImage(this.brokenWLImage, 
						-this.brokenWLImage.width / 2, 
						-this.brokenWLImage.height / 2);
		} else {
			theContext.drawImage(this.brokenWoLImage, 
						-this.brokenWoLImage.width / 2, 
						-this.brokenWoLImage.height / 2);
		}
	}

  	theContext.restore();
}

Box.prototype.shouldDestroy = function(theContext) {
	return false;
}