"use strict";

function forEachIn(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            action(property, object[property]);
        }
    }
}

function forEach(array, action) {
    var len = array.length;
   for (var i = 0; i < len; i++) {
            action(array[i]);
   }
}

function bind(func, object) {
    return function(){
        return func.apply(object, arguments);
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