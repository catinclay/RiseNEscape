// Simple class example

function Player(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.directionBottonWidth = this.canvasWidth/30;

	this.currentRoomTag = "1";
}


//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Player.prototype.hitTest = function(hitX,hitY) {
	return ((hitX > 0) && 
		(hitX < this.directionBottonWidth)) ||
		((hitX > this.canvasWidth - this.directionBottonWidth) && 
		(hitX < this.canvasWidth));
}


//A function for drawing the particle.
Player.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = "rgba(255, 0, 0, 0.5)";
	theContext.fillRect(0, 0, this.directionBottonWidth, this.canvasHeight - 1/6*this.canvasHeight);
	theContext.fillRect(this.canvasWidth - this.directionBottonWidth, 0, this.canvasWidth, this.canvasHeight - 1/6*this.canvasHeight);
}

Player.prototype.getMoveDirection = function(hitX, hitY) {
	if (hitX < this.directionBottonWidth) return "left";
	return "right";
}

Player.prototype.move = function(direction) {
	let toRoom = "";
	if (this.currentRoomTag == "1") {
		if (direction == "left") {
			toRoom = "0";
		} else {
			toRoom = "2";
		}
	} else if (this.currentRoomTag == "0") {
		if (direction == "left") {
			toRoom = "2";
		} else {
			toRoom = "1";
		}
	} else if (this.currentRoomTag == "2") {
		if (direction == "left") {
			toRoom = "1";
		} else {
			toRoom = "0";
		}
	}
	this.moveTo(toRoom);

}

Player.prototype.moveTo = function(toRoom) {
	this.currentRoomTag = toRoom;
}

Player.prototype.shouldDestroy = function(theContext) {
	return false;
}