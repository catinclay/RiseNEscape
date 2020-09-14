// Simple class example

function Player(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.directionBottonWidth = this.canvasWidth/30;

	this.currentRoomTag = "0";

	this.bombCountDownSecond = 1261440000;
	this.fpsPassed = 0;
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
	this.fpsPassed++;
	if(this.fpsPassed >= 30) {
		this.fpsPassed = 0;
		this.bombCountDownSecond--;
	}
	theContext.fillStyle = "rgba(255, 0, 0, 0.3)";
	theContext.fillRect(0, 0, this.directionBottonWidth, this.canvasHeight - 1/6*this.canvasHeight);
	theContext.fillRect(this.canvasWidth - this.directionBottonWidth, 0, this.canvasWidth, this.canvasHeight - 1/6*this.canvasHeight);
}

Player.prototype.getMoveDirection = function(hitX, hitY) {
	if (hitX < this.directionBottonWidth) return "left";
	return "right";
}

Player.prototype.move = function(direction) {
	let toRoom = this.currentRoomTag;
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
	} else if (this.currentRoomTag == "3") {
		if (direction == "left") {
			toRoom = "5";
		} else {
			toRoom = "4";
		}
	} else if (this.currentRoomTag == "4") {
		if (direction == "left") {
			toRoom = "3";
		} else {
			toRoom = "5";
		}
	} else if (this.currentRoomTag == "5") {
		if (direction == "left") {
			toRoom = "4";
		} else {
			toRoom = "3";
		}
	}
	this.moveTo(toRoom);
}

Player.prototype.stopCocaineSong = function() {
	if (this.cocaineAudio) {
		this.cocaineAudio.pause();
	}
}

Player.prototype.moveTo = function(toRoom) {
	this.currentRoomTag = toRoom;
}

Player.prototype.shouldDestroy = function(theContext) {
	return false;
}