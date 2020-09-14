// Simple class example

function Inventory(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.height = 1/6*this.canvasHeight;
	this.cellNumber = 9;
	this.cellWidth = this.canvasWidth / this.cellNumber;
	this.items = [];

	this.selectedIndex = -1;
	this.hoverIndex = -1;

	this.defaultHoverCountDown = 15;
	this.hoverCountDown = this.defaultHoverCountDown;
}

Inventory.prototype.collect = function(item) {
	if (!item) return;
	this.setItemPosition(item, this.items.length);
	this.items.push(item);
}

Inventory.prototype.setItemPosition = function(item, idx) {
	item.setXY(idx * this.cellWidth + this.cellWidth/2, this.canvasHeight - this.height/2);
}

Inventory.prototype.hitTest = function(hitX,hitY) {
	return(hitY > this.canvasHeight - this.height && hitY < this.canvasHeight);
}

Inventory.prototype.selectedIndex = function() {
	return this.selectedIndex;
}

Inventory.prototype.select = function(posX, posY) {
	let newSelectIndex = Math.floor(posX / this.cellWidth);
	if (newSelectIndex >= this.items.length) return;
	if (this.selectedIndex == newSelectIndex) {
		this.selectedIndex = -1;
	} else {
		this.selectedIndex = newSelectIndex;
	}
}

Inventory.prototype.hover = function(posX, posY) {
	let hoverIndex = Math.floor(posX / this.cellWidth);
	if (hoverIndex < this.items.length) {
		this.hoverIndex = hoverIndex;
	} else {
		this.unHover();
	}
}

Inventory.prototype.unHover = function() {
	this.hoverIndex = -1;
}

Inventory.prototype.tryUse = function() {
	return this.items[this.selectedIndex];
}

Inventory.prototype.consume = function() {
	this.items.splice(this.selectedIndex, 1);
	for (var i = this.items.length - 1; i >= 0; i--) {
		this.setItemPosition(this.items[i], i);
	}
	this.selectedIndex = -1;
}

//A function for drawing the particle.
Inventory.prototype.drawToContext = function(theContext) {
	// Draw the top/bottom line.
	theContext.strokeStyle = "#FF0000";
	theContext.beginPath();
 	theContext.moveTo(0, this.canvasHeight - this.height); 
	theContext.lineTo(this.canvasWidth, this.canvasHeight - this.height);
	theContext.moveTo(0, this.canvasHeight); 
	theContext.lineTo(this.canvasWidth, this.canvasHeight);
	theContext.lineWidth = 2;
	theContext.stroke();

	// Draw the inventory grid.
	theContext.strokeStyle = "#FF0000";
	theContext.beginPath();
	for (let i = 0; i <= this.cellNumber; ++i) {
	 	theContext.moveTo(i * this.cellWidth, this.canvasHeight - this.height); 
		theContext.lineTo(i * this.cellWidth, this.canvasHeight);
		theContext.lineWidth = 2;
	}
	theContext.stroke();

	if (this.selectedIndex != -1) {
		// is selected something, draw background.
		theContext.fillStyle = "rgba(255, 0, 0, 0.5)";
		theContext.fillRect(this.selectedIndex * this.cellWidth, this.canvasHeight - this.height, this.cellWidth, this.height);
	}

	// Draw all the items
	for (var i = this.items.length - 1; i >= 0; i--) {
		this.items[i].drawToContext(theContext);
	}

	if (this.hoverIndex != -1) {
		this.hoverCountDown--;
		if (this.hoverCountDown <= 0) {
			theContext.strokeStyle = "#000000";
			theContext.lineWidth = 4;
			theContext.fillStyle = "rgba(255, 255, 255, 0.95)";
			let w = 700;
			let h = 400;
			theContext.fillRect(450-w/2, 250-h/2, w, h);
			theContext.strokeRect(450-w/2, 250-h/2, w, h);
			let itemDescription = this.items[this.hoverIndex].getItemDescription();

			theContext.textAlign = "center";
			theContext.font = "35px Comic Sans MS";
			theContext.fillStyle = "rgba(0, 0, 255, 1)";
			if (itemDescription["itemName"]) {
				theContext.fillText(itemDescription["itemName"], 450, 125);
			}

			theContext.font = "25px Comic Sans MS";
			theContext.fillStyle = "rgba(0, 0, 0, 1)";
			let desTopMargin = 200;
			let desGap = 45;
			if (itemDescription["0"]) {
				theContext.fillText(itemDescription["0"], 450, desTopMargin);
			}
			if (itemDescription["1"]) {
				theContext.fillText(itemDescription["1"], 450, desTopMargin + desGap);
			}
			if (itemDescription["2"]) {
				if (this.items[this.hoverIndex].itemTag == "bomb") {
					theContext.fillStyle = "rgba(255, 0, 0, 1)";
					theContext.fillText(itemDescription["2"], 450, desTopMargin + desGap * 2);
					theContext.fillStyle = "rgba(0, 0, 0, 1)";
				} else {
					theContext.fillText(itemDescription["2"], 450, desTopMargin + desGap * 2);
				}
			}
			if (itemDescription["3"]) {
				theContext.fillText(itemDescription["3"], 450, desTopMargin + desGap * 3);
			}
			if (itemDescription["4"]) {
				theContext.fillText(itemDescription["4"], 450, desTopMargin + desGap * 4);
			}
		}
	} else {
		this.hoverCountDown = this.defaultHoverCountDown;
	}
}

Inventory.prototype.shouldDestroy = function(theContext) {
	return false;
}