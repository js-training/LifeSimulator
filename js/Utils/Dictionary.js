function Dictionary(startValues) {
    this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
    this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this.values, name) &&
        Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
    forEachIn(this.values, action);
};

Dictionary.prototype.valuesLength = function(){
    var length = 0;
    console.log(this);
    for (var i in this) {
        console.log(i);
       length++;
   }
   return length;
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