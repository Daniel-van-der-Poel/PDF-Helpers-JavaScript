//Returns the value of a field. 

function getValue (target) {
	if (this.getField(target) !== null) {
		return this.getField(target).value;
	}
}



//Returns the value (true or false) of a checkbox.

function isOn(target) {
    if (this.getField(target) !== null) {
        return this.getField(target).isBoxChecked(0);
    }
}



//Sets the value of a field. Returns false is the field doesn't exist.

function setValue (target, data) {
	if (this.getField(target) !== null) {
		this.getField(target).value = data;
	} else {
        return false;
    }
}



//Sets the visibility of a field. By default, hidden fields are made visible and vice versa

function switchField(target, action) { 
	this.getField(target).display = action ? display.visible : display.hidden;
}



//Sets the readonly status of a field. By default, readonly fields are made editable and vice versa

function switchLock(target, action) {
	this.getField(target).readonly = action;
}



//Sets the visibility of a layer (such as those created in InDesign). By default, hidden layers are made visible and vice versa

function switchLayer(target, action) {
	var a = this.getOCGs();
	for (i = 0; i < a.length; i++) {
		if (a[i].name === target) {
			if (action) {
				a[i].state = true;
			} else if (!action) {
				a[i].state = false;
			} else {
				a[i].state = !a[i].state;
			}
		}
	}
}