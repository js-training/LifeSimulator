"use strict";

function Dictionary(startValues) {
    this.values = startValues || {};
}
Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.each = function(action) {
    forEachIn(this.values, action);
};

var globalDirections = new Dictionary(
   {0: new Point( 0, 0),
    1: new Point(-1,  0),
    2: new Point( 1,  0),
    3: new Point( 0, -1),
    4: new Point( 1, -1),
    5: new Point( 1,  1),
    6: new Point( 0,  1),
    7: new Point(-1,  1),
    8: new Point(-1, -1)
    }
);