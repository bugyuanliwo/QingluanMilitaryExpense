function Window_VariableDisplay() {
    this.initialize.apply(this, arguments);
}

Window_VariableDisplay.prototype = Object.create(Window_Base.prototype);
Window_VariableDisplay.prototype.constructor = Window_VariableDisplay;

Window_VariableDisplay.prototype.initialize = function(x, y) {
    var width = 240;  // Adjust width as needed
    var height = this.fittingHeight(3);  // Adjust height as needed
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_VariableDisplay.prototype.refresh = function() {
    this.contents.clear();
    var variableValue = $gameVariables.value(4);  // Change '4' to any variable ID you need
    this.drawText("第 " + variableValue + " 天", 1, 0, this.width, 'left');
    this.drawText("堕落度：" + $gameVariables.value(2), 1, this.lineHeight(), this.width, 'left');
    this.drawText("察觉度：" + $gameVariables.value(1), 1, this.lineHeight() * 2, this.width, 'left');
};

var _Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this.createVariableWindow();
};

Scene_Menu.prototype.createVariableWindow = function() {
    var x = 0;  // Adjust X position as needed
    var y = this._commandWindow.height;  // Adjust Y position as needed
    this._variableWindow = new Window_VariableDisplay(x, y);
    this.addWindow(this._variableWindow);
};
