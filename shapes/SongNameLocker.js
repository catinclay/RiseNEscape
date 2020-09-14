// Simple class example

function SongNameLocker(player, posX, posY, imageManager, roomTag, canvasWidth, canvasHeight, cocaine) {
	this.roomTag = roomTag;
	this.player = player;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.imageManager = imageManager;
	this.image = imageManager.get("songNameLockerImage");
	this.x = posX;
	this.y = posY;
	this.zoomInTag = "SongNameLockerZI";
	this.answer = "COCAINE";
	this.charCodes = [65,65,65,65,65,65,65];

	this.backButtonWidth = 180;
	this.backButtonHeight = 50;

	this.switchButtonWidth = 50;
	this.switchButtonHeight = 50;
	this.cocaine = cocaine;
	this.cocaine.revealed = false;
	this.isCleared = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SongNameLocker.prototype.hitTest = function(hitX,hitY) {
	return (this.player.currentRoomTag == this.roomTag &&
		((hitX > this.x - this.image.width / 2) && 
		(hitX < this.x + this.image.width / 2) && 
		(hitY > this.y - this.image.height / 2) && 
		(hitY < this.y + this.image.height / 2)))
		||
		(this.player.currentRoomTag == this.zoomInTag && this.press(hitX, hitY))
	;
}

SongNameLocker.prototype.press = function(hitX, hitY) {
	// Press on back button
	if (this.isPressOnBackButton(hitX, hitY)) {
		this.player.currentRoomTag = this.roomTag;
		return;
	}
	if (!this.isCleared) {
		this.pressOnSwitchButton(hitX, hitY);
	}
}

SongNameLocker.prototype.isPressOnBackButton = function(hitX, hitY) {
	return hitX >= this.canvasWidth/2 - this.backButtonWidth/2 && 
		   hitX <= this.canvasWidth/2 + this.backButtonWidth/2 && 
		   hitY >= this.canvasHeight*2/3 - this.backButtonHeight/2 && 
		   hitY <= this.canvasHeight*2/3 + this.backButtonHeight/2;
}

SongNameLocker.prototype.pressOnSwitchButton = function(hitX, hitY) {
	let charGap = this.canvasWidth/10;
	for (var i = this.charCodes.length - 1; i >= 0; i--) {
		if (hitX >= this.canvasWidth/2 + (i-3) * charGap - 25 &&
			hitX <= this.canvasWidth/2 + (i-3) * charGap - 25 + this.switchButtonWidth &&
			hitY >= this.canvasHeight/3 - 70 &&
			hitY <= this.canvasHeight/3 - 70 + this.switchButtonHeight) {
			// press -- for ith char
			this.charCodes[i]--;
		} else if (hitX >= this.canvasWidth/2 + (i-3) * charGap - 25 &&
			hitX <= this.canvasWidth/2 + (i-3) * charGap - 25 + this.switchButtonWidth &&
			hitY >= this.canvasHeight/3 + 45 &&
			hitY <= this.canvasHeight/3 + 45 + this.switchButtonHeight) {
			// press ++ for ith char
			this.charCodes[i]++;
		}
		if (this.charCodes[i] < 65) {
			this.charCodes[i] += 26;
		} else if (this.charCodes[i] > 90) {
			this.charCodes[i] -= 26;
		}
	}
	let currentString = 
	String.fromCharCode(this.charCodes[0],this.charCodes[1],this.charCodes[2],
		this.charCodes[3],this.charCodes[4],this.charCodes[5],this.charCodes[6]);
	if (!this.isCleared && currentString == this.answer) {
		this.cocaine.revealed = true;
		this.isCleared = true;
		this.player.stopCocaineSong();
	}
}

SongNameLocker.prototype.isVisible = function() {
	return this.player.currentRoomTag == this.roomTag || this.player.currentRoomTag == this.zoomInTag;
}

SongNameLocker.prototype.interact = function(item) {
	return false;
}

SongNameLocker.prototype.collect = function() {
	this.player.currentRoomTag = this.zoomInTag;
	return;
}

//A function for drawing the particle.
SongNameLocker.prototype.drawToContext = function(theContext) {
	if (!this.isVisible()) return;
	if (this.player.currentRoomTag == this.roomTag) {
		theContext.save();
		theContext.translate(this.x, this.y);
	  	theContext.drawImage(this.image, 
	  						-this.image.width / 2, 
	  						-this.image.height / 2);
	  	theContext.restore();
 	} 	
 	if (this.player.currentRoomTag == this.zoomInTag) {
		theContext.fillStyle = "#0000FF88";
 		theContext.fillText("SONG NAME", this.canvasWidth/2, this.canvasHeight/6);

 		theContext.textAlign = "center";
 		let charGap = this.canvasWidth/10;
 		theContext.font = "60px Comic Sans MS";
		theContext.fillStyle = "#000000";
		for (var i = 0; i < this.charCodes.length; i++) {
			theContext.fillStyle = "#000000";
			theContext.fillText(String.fromCharCode(
				this.charCodes[i]), this.canvasWidth/2 + (i-3) * charGap, this.canvasHeight/3 + 35);
			if (!this.isCleared) {
				theContext.fillStyle = "rgba(0, 0, 0, 0.2)";
				theContext.fillRect(this.canvasWidth/2 + (i-3) * charGap - 25, 
				this.canvasHeight/3 - 70, this.switchButtonWidth, this.switchButtonHeight);
				theContext.fillRect(this.canvasWidth/2 + (i-3) * charGap - 25, 
				this.canvasHeight/3 + 45 , this.switchButtonWidth, this.switchButtonHeight);
			}
		}
		theContext.fillStyle = "rgba(0, 0, 0, 0.2)";
		let bottonWidth = 180;
		let bottonHeight = 50;
		theContext.fillRect(this.canvasWidth/2 - this.backButtonWidth/2, 
			this.canvasHeight*2/3 - this.backButtonHeight/2, this.backButtonWidth, this.backButtonHeight);
		theContext.fillStyle = "#000000";
		theContext.font = "45px Comic Sans MS";
		theContext.fillText("BACK", this.canvasWidth/2, this.canvasHeight*2/3);
 	}
}

SongNameLocker.prototype.shouldDestroy = function(theContext) {
	return false;
}