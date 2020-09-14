// Simple class example

function Player(canvasWidth, canvasHeight, imageManager) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.imageManager = imageManager;
	this.introImage = imageManager.get("introImage");

	this.directionBottonWidth = this.canvasWidth/30;

	this.currentRoomTag = "0";

	this.bombCountDownSecond = 1261440000;
	this.fpsPassed = 0;
	this.defaultTimeWarpCountdown = 75
	this.timeWarpCountdown = 0;

	this.defaultIntroCountdown = 2500;
	this.introCountdown = this.defaultIntroCountdown;
	this.introScripts = [
	"This is a beautiful day", 
	"Birds are singing",
	"Flowers are blooming",
	"",
	"However",
	"You found you're late ",
	"for an important meeting",
	"You wake up,",
	"On the sofa",
	"(since you slept on the sofa last night)",
	"And you notice that",
	"There is no door to exit",
	"",
	"'Uhh, that's not good..'",
	"",
	"You keep your confusing in your mind",
	"Now the first thing to do",
	"Is to figure out how to leave this place",
	"So that you can catch up the important meeting",
	"So that you won't get fired",
	"So that you can keep earning money",
	"So that you can pay the bill ",
	"So that you don't have to beg on the street",
	".",
	".",
	".",
	"You don't want to beg on the street, right?",
	".",
	".",
	"So now, Rise and Escape.....",
	];
}


//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Player.prototype.hitTest = function(hitX,hitY) {
	return ((hitX > 0) && 
		(hitX < this.directionBottonWidth)) ||
		((hitX > this.canvasWidth - this.directionBottonWidth) && 
		(hitX < this.canvasWidth));
}

Player.prototype.warpAnimation = function(theContext) {
	this.timeWarpCountdown = this.defaultTimeWarpCountdown;
}

Player.prototype.skipIntro = function() {
	if (this.introCountdown < this.defaultIntroCountdown - 75) {
		this.introCountdown = 0;
	}
}

//A function for drawing the particle.
Player.prototype.drawToContext = function(theContext) {
	if (this.currentRoomTag == "99") {
		if (this.timeWarpCountdown > 0) {
			theContext.fillStyle = "rgba(255, 255, 255, " + this.timeWarpCountdown / this.defaultTimeWarpCountdown + ")";
			this.timeWarpCountdown--;
			theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		
		}
		return;
	}
	if (this.introCountdown >= 0) {
		this.introCountdown--;
		theContext.fillStyle = "rgba(0, 0, 0, 1)";
		theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		if (this.introCountdown < this.defaultIntroCountdown - 150) {
			theContext.textAlign = "center";
			theContext.font = "15px Comic Sans MS";
			theContext.fillStyle = "rgba(255, 255, 255, 1)";	
			theContext.fillText("click to skip", 800, 50)
		}

		theContext.textAlign = "center";
		theContext.font = "40px Comic Sans MS";
		theContext.fillStyle = "rgba(255, 255, 0, 1)";
		let introTopMargin = this.canvasHeight + 50 + (this.introCountdown - this.defaultIntroCountdown);
		let introGap = 60;
		for (var i = this.introScripts.length - 1; i >= 0; i--) {
			theContext.fillText(this.introScripts[i], 450, introTopMargin + i * introGap);
		}
		return;
	}

	this.fpsPassed++;
	if(this.fpsPassed >= 30) {
		this.fpsPassed = 0;
		this.bombCountDownSecond--;
	}

	theContext.fillStyle = "rgba(255, 0, 0, 0.3)";
	theContext.fillRect(0, 0, this.directionBottonWidth, this.canvasHeight - 1/6*this.canvasHeight);
	theContext.fillRect(this.canvasWidth - this.directionBottonWidth, 0, this.canvasWidth, this.canvasHeight - 1/6*this.canvasHeight);

	if (this.timeWarpCountdown > 0) {
		theContext.fillStyle = "rgba(255, 255, 255, " + this.timeWarpCountdown / this.defaultTimeWarpCountdown + ")";
		this.timeWarpCountdown--;
		theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight - 1/6*this.canvasHeight);		
	}
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