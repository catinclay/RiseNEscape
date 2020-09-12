// Simple class example

function Inventory(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.height = 1/6*this.canvasHeight;
	this.cellNumber = 9;
	this.cellWidth = this.canvasWidth / this.cellNumber;
	this.items = [];

	this.selectedIndex = -1;
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
	return(hitY > this.canvasHeight - this.height);
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
}

Inventory.prototype.shouldDestroy = function(theContext) {
	return false;
}