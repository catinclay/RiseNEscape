// Simple class example

function TVScreen(player, posX, posY, imageManager, roomTag, itemsOnTheGround) {
	this.roomTag = roomTag;
	this.player = player;
	this.itemsOnTheGround = itemsOnTheGround;
	this.imageManager = imageManager;
	this.x = posX;
	this.y = posY;
	this.isOn = false;
	this.width = 350;
	this.height = 170;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
TVScreen.prototype.hitTest = function(hitX,hitY) {
	return this.isVisible() &&
		((hitX > this.x - this.width / 2) && 
		(hitX < this.x + this.width / 2) && 
		(hitY > this.y - this.height / 2) && 
		(hitY < this.y + this.height / 2));
}

TVScreen.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag;
}

TVScreen.prototype.interact = function(item) {
	if (item.getItemTag() === "tvCon" && !this.isOn) {
		this.isOn = true;
		this.itemsOnTheGround.unshift(new Snowboard(this.player, 465, 200, this.imageManager, "2", "hang011sbImage", "011sbItemImage", "011sb"));
		return true;
	}
	return false;
}

TVScreen.prototype.collect = function() {
	return;
}

//A function for drawing the particle.
TVScreen.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	if (this.isOn) {
		theContext.textAlign = "center";
		theContext.fillStyle = "rgba(255, 255, 255, 1)";
		theContext.fillRect(this.x - this.width/2, this.y - this.height/2, 
			this.width, this.height);
		theContext.fillStyle = "#000000";
		theContext.font = "15px Comic Sans MS";
		theContext.fillText("011 DOUBLE", this.x + 50, this.y - 15);
		theContext.fillText("ON SALE", this.x + 50, this.y);
		theContext.fillStyle = "#FF0000";
		theContext.font = "35px Comic Sans MS";
		theContext.fillText("$699", this.x - 50, this.y);
    }
}

TVScreen.prototype.shouldDestroy = function(theContext) {
	return false;
}