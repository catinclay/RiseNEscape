// Simple class example

function Background(player, canvasWidth, canvasHeight, imageManager, soundManager) {
	this.player = player;
	this.backgroundImages = {};
	this.backgroundImages["0"] = imageManager.get("bg-0");
	this.backgroundImages["1"] = imageManager.get("bg-1");
	this.backgroundImages["2"] = imageManager.get("bg-2");
	this.backgroundImages["3"] = imageManager.get("bg-3");
	this.backgroundImages["4"] = imageManager.get("bg-4");
	this.backgroundImages["5"] = imageManager.get("bg-5");
	this.backgroundImages["99"] = imageManager.get("bg-99");
	this.soundManager = soundManager;

	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.endingCutCountup = -200;
	this.defaultLightChangeCounter = 30;
	this.lightChangeCounter = this.defaultLightChangeCounter;
	this.lightMarginX = 0;
	this.lightMarginY = 0;

	this.isRunningCredit = false;
	this.creditCountup = 0;

	this.isBlowingCandle = false;
	this.blowCandleCounter = 15;
	this.isPlayingHBSong = false;

	this.credits = [
		"-Credits-",
		"(in arphabatical order)",
		"",
		"",
		"+Test Player+",
		"",
		"Ariel Kuo",
		"Connie Chen",
		"David Su",
		"Henry Ong",
		"Jasmine Lin",
		"Sandy Hsiao",
		"",
		"",
		"+Art Lead+",
		"",
		"Jasmine Lin",
		"",
		"",
		"+Guitar+",
		"",
		"David Su",
		"Eric Clapton",
		"",
		"",
		"+Shakerer+",
		"",
		"Sandy Hsiao",
		"",
		"",
		"+Puzzle Designer+",
		"",
		"Connie Chen",
		"Wen-Shiu Hung",
		"",
		"",
		"+TypeWriter+",
		"",
		"Connie Chen",
		"Wen-Shiu Hung",
		"",
		"",
		"",
		"And the most important",
		"",
		"",
		"",
		"",
		"",
		"",
		"+Birthdayer+",
		"",
		"Sien Chang",
		"",
		"",
		"-THANK YOU-",
		"FOR PLAYING OUR GAME!",
		];
}

Background.prototype.blowCandle = function() {
	if (this.endingCutCountup >= 900 && !this.isBlowingCandle){
		// blow candle
		this.soundManager.play("blow");
		this.isBlowingCandle = true;
    }
}

Background.prototype.goToCredit = function() {
	if (!this.isRunningCredit) {
		if (this.hbsong) {
			this.hbsong.pause();
		}
		this.isRunningCredit = true;
		this.soundManager.play("negi");
	}
}


//A function for drawing the particle.
Background.prototype.drawToContext = function(theContext) {
	// Credits
	if (this.isRunningCredit) {
		if (this.creditCountup < 2090) {
			this.creditCountup++;
		}
		theContext.fillStyle = "rgba(0, 0, 0, 1)";
		theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		

		theContext.textAlign = "center";
		let creditTopMargin = this.canvasHeight - this.creditCountup;
		let creditMargin = 0;
		for (var i = 0; i < this.credits.length; i++) {
			let line = this.credits[i];
			if (line.startsWith("-")) {
				theContext.font = "50px Comic Sans MS";
				theContext.fillStyle = "rgba(255, 255, 0, 1)";
				creditMargin+= 55;
			} else if (line.startsWith("+")) {
				theContext.font = "40px Comic Sans MS";
				theContext.fillStyle = "rgba(255, 255, 0, 1)";
				creditMargin+= 50;
			} else {
				theContext.font = "25px Comic Sans MS";
				theContext.fillStyle = "rgba(255, 255, 255, 1)";
				creditMargin+= 30;
			}

			theContext.fillText(this.credits[i], 450, creditTopMargin + creditMargin);
		}
		return;
	}

	if (this.isBlowingCandle) {
		this.blowCandleCounter--;
		if (this.blowCandleCounter <= 0) {
			this.goToCredit();
		}
	}

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
		if (this.endingCutCountup >= -120 && !this.isPlayingHBSong) {
			this.isPlayingHBSong = true;
			this.hbsong = this.soundManager.play("hbsong");
		}
		if (this.endingCutCountup < 500) {
			theContext.globalAlpha = 1;
			theContext.drawImage(mask, -30 + this.lightMarginX, -50 + this.lightMarginY);
		} else if (this.endingCutCountup < 1500) {
			theContext.globalAlpha = 1 - (this.endingCutCountup - 500) / 1000;
			theContext.drawImage(mask, -30 + this.lightMarginX, -50 + this.lightMarginY);
		}
		theContext.restore();

		if (this.endingCutCountup < 180) {
			theContext.fillStyle = "rgba(0, 0, 0, 1)";
			theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		
		} else if(this.endingCutCountup >= 180 && this.endingCutCountup <= 500) {
			theContext.fillStyle = "rgba(0, 0, 0, " + (1 - (this.endingCutCountup-180)/320) + ")";
			theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);		
		}
	}
	
}

Background.prototype.shouldDestroy = function(theContext) {
	return false;
}