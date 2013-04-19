function randomTarget() {
    var min = -20;
    var max = 20;
    return new Point(getRandom(max, min), getRandom(max, min));
}

function clone(object) {
    function OneShotConstructor(){}
    OneShotConstructor.prototype = object;
    return new OneShotConstructor();
}

function getRandom(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//var arrowKeyCodes = new Dictionary({
//    37: new Point(-1, 0), // left
//    38: new Point(0, -1), // up
//    39: new Point(1, 0),  // right
//    40: new Point(0, 1)   // down
//});

function forEachIn(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            action(property, object[property]);
        }
    }
}

function forEach(array, action) {
    var len = array.length;
 //  try {
        for (var i = 0; i < len; i++)
            action(array[i]);
 //   }
//    catch(e) {
//        if (e != Break)
//            throw e;
//    }
}

function asArray(quasiArray, start) {
    var result = [];
    for (var i = (start || 0); i < quasiArray.length; i++)
        result.push(quasiArray[i]);
    return result;
}

function partial(func) {
    var fixedArgs = asArray(arguments, 1);
    return function(){
        return func.apply(null, fixedArgs.concat(asArray(arguments)));
    };
}

function bind(func, object) {
    return function(){
        return func.apply(object, arguments);
    };
}

function method(object, name) {
    return function() {
        object[name].apply(object, arguments);
    };
}

function randomElement(array) {
    if (array.length == 0)
        throw new Error("The array is empty.");
    return array[Math.floor(Math.random() * array.length)];
}

function findDirections(surroundings, wanted) {
    var found = [];
    globalDirections.each(function(name) {
        if (surroundings[name] == wanted)
            found.push(name);
    });
    return found;
}