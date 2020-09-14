// Simple class example

function Background(player, canvasWidth, canvasHeight, imageManager) {
	this.player = player;
	this.backgroundImages = {};
	this.backgroundImages["0"] = imageManager.get("bg-0");
	this.backgroundImages["1"] = imageManager.get("bg-1");
	this.backgroundImages["2"] = imageManager.get("bg-2");
	this.backgroundImages["3"] = imageManager.get("bg-3");
	this.backgroundImages["4"] = imageManager.get("bg-4");
	this.backgroundImages["5"] = imageManager.get("bg-5");
	this.backgroundImages["99"] = imageManager.get("bg-99");

	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.endingCutCountup = -200;
	this.defaultLightChangeCounter = 20;
	this.lightChangeCounter = this.defaultLightChangeCounter;
	this.lightMarginX = 0;
	this.lightMarginY = 0;
}


//A function for drawing the particle.
Background.prototype.drawToContext = function(theContext) {
	theContext.save();
	if (this.backgroundImages[this.player.currentRoomTag]) {
		this.image = this.backgroundImages[this.player.currentRoomTag];
	  	theContext.drawImage(this.image, 0, 0);
	}
	theContext.restore();
	if (this.player.currentRoomTag == 99) {
		this.endingCutCountup++;
		let mask = imageManager.get("endingSceneMaskImage");
		this.lightChangeCounter--;
		if (this.lightChangeCounter <= 0) {
			this.lightChangeCounter = this.defaultLightChangeCounter;
			this.lightMarginX = Math.random() * 14 - 7;
			this.lightMarginY = Math.random() * 14 - 7;
		}
		
		theContext.save();
		if (this.endingCutCountup < 200) {
			theContext.globalAlpha = 1;
			theContext.drawImage(mask, -30 + this.lightMarginX, -50 + this.lightMarginY);
		} else if (this.endingCutCountup < 1000) {
			theContext.globalAlpha = 1 - (this.endingCutCountup - 200) / 800;
			theContext.drawImage(mask, -30 + this.lightMarginX, -50 + this.lightMarginY);
		}
		theContext.restore();

		if (this.endingCutCountup < 0) {
			theContext.fillStyle = "rgba(0, 0, 0, 1)";
			theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		
		} else if(this.endingCutCountup >= 0 && this.endingCutCountup <= 200) {
			theContext.fillStyle = "rgba(0, 0, 0, " + (1 - this.endingCutCountup/200) + ")";
			theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		
		}
	}
	
}

Background.prototype.shouldDestroy = function(theContext) {
	return false;
}