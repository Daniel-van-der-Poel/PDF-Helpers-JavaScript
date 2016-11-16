//Creates a popup menu, with possible submenus. The items parameter must be an array. Secondary arrays will create submenus, with the first item serving as the name of the submenu. E.g. createMenu(["new", "open", ["open recent", recent1, recent2, recent3], "save"])
function createMenu(items, divider = ":") {
  var menu = [];
  function addItem(item, prefix) {
    if (!Array.isArray(item)) {
      return({cName: item, cReturn: prefix + divider + item});
    } else {
      var submenu = [];
      for (var i = 1; i < item.length; i++) {
        submenu.push(addItem(item[i], prefix + divider + item[0]));
      }
      return({cName: item[0], oSubMenu: submenu});
    }
  }
  for (var i = 0; i < items.length; i++) {
    menu.push(addItem(items[i], "Menu"));
  }
  return app.popUpMenuEx.apply(app, menu);
}


//Returns true if a field or other object exists, false if not.
function fieldExists(target) {
    return (this.getField(target) !== null) ? true : false;
}


//Returns the value of a field.
function getValue(target) {
	if (this.getField(target) !== null) {
		return this.getField(target).value;
	}
}


//Returns the value (true or false) of a checkbox/button.
function isChecked(target) {
    if (this.getField(target) !== null) {
        return this.getField(target).isBoxChecked(0);
    }
}


//Checks or unchecks a checkbox/button. Flips this status by default.
function setButton(target, action = "flip") {
    if (this.getField(target) !== null) {
        if (action == "flip") {
            if (this.getField(target).isBoxChecked(0)){
                this.getField(target).checkThisBox(0, false);
            } else {
                this.getField(target).checkThisBox(0, true);
            }
        } else {
            this.getField(target).checkThisBox(0, action);
        }
    }
}


//Sets the readonly status of a field. Flips this status by default.
function setReadonly(target, action = "flip") {
    if (this.getField(target) !== null) {
        if (action == "flip"){
            this.getField(target).readonly = !this.getField(target).readonly;
        } else {
        this.getField(target).display = action;
        }
    }
}


//Sets the visibility of a field. Flips the visilibity by default.
function setFieldVisibility(target, action = "flip") {
    if (this.getField(target) !== null) {
        if (action == "flip"){
            this.getField(target).display = (this.getField(target).display == display.hidden) ? display.visible : display.hidden;
        } else {
        this.getField(target).display = action ? display.visible : display.hidden;
        }
    }
}


//Sets the font, font size, font colour, and text alignment of a field.
function setFont(target, fontname = font.Helv, size = 16, colorname = ["RGB", 0, 0, 0], align = "center") {
    if (this.getField(target) !== null) {
        this.getField(target).textFont = fontname;
        this.getField(target).textSize = size;
        this.getField(target).alignment = align;
        this.getField(target).textColor = colorname;
    }
}


//Sets the font, font size, font colour, and text alignment of all text fields, with optional  starting/ending field name selector. Example: massSetFont(font.HelvB, 12, color.red, "left", "customer")
function massSetFont(fontname = font.Helv, size = 9, colorname = ["RGB", 0, 0, 0], align = "left", startname = "", endname = "") {
    for (i = 0; i < this.numFields; i++) {
        var target = this.getNthFieldName(i);
        if (target.slice(0, startname.length) == startname && target.substr(-endname.length, endname.length) == endname && this.getField(target).type == "text") { //another option is "combobox"
            this.getField(target).textFont = fontname;
            this.getField(target).textSize = size;
            this.getField(target).alignment = align;
            this.getField(target).textColor = colorname;
            /* there are many more interesting field properties that can be changed this way, e.g.:
            this.getField(target).richText = true;
            this.getField(target).defaultValue = "";
            this.getField(target).doNotScroll = false;
            this.getField(target).doNotSpellCheck = false;
            this.getField(target).editable = false; (for combo-boxes)
            this.getField(target).fillColor = "T";
            this.getField(target).userName = "";
            */
        }
    }
}


//Sets the visibility of a layer (such as those created in InDesign). Flips the visibility by default.
function setLayerVisibility(target, action = "flip") {
	var a = this.getOCGs();
	for (i = 0; i < a.length; i++) {
		if (a[i].name === target) {
			if (action == "flip") {
                a[i].state = !a[i].state;
            } else {
				a[i].state = action;
			}
		}
	}
}


//Sets the title of the document.
function setTitle(name) {
	this.info.title = name;
}


//Sets the tooltip of a field or other object.
function setTooltip(target, value = "Tooltip") {
    if (this.getField(target) !== null) {
        this.getField(target).userName = value;
    }
}


//Sets the value of a field.
function setValue (target, input) {
	if (this.getField(target) !== null) {
		this.getField(target).value = input;
	}
}
