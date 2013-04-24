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
            action(array[i], i);
   }
}

function reduce(combine, base, array) {
    forEach(array, function (element) {
        base = combine(base, element);
    });
    return base;
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

function mapGrid(plan){
    var newGrid = new Grid(plan[0].length, plan.length);
    forEachInGrid(plan, function(plan, point){
        newGrid.setValueAt(point, elementFromCharacter(plan[point.y].charAt(point.x)));
    })
    return  newGrid;
}

//
function forEach(array, action) {
    var len = array.length;
    for (var i = 0; i < len; i++) {
        action(array[i], i);
    }
}

function forEachInGrid(grid, action) {
    var y = 0;
    forEach(grid, function(line, y){
        for (var x = 0; x < line.length; x++) {
            action(grid, new Point(x, y));
        }
        y++;
    });
}