/**
 * Created with JetBrains WebStorm.
 * User: K.Guselshchykova
 * Date: 4/8/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var aquariumDefault =
    ["*                                  % *",
    "*  0                                 *",
    "* 0                       $          *",
    "*0                                   *",
    "*0                                   *",
    "*0         %                         *",
    "* 00                                 *",
    "*   0                                *",
    "*                 0                  *",
    "*                 0 0     0          *",
    "*                   0   0            *",
    "*    %               0 0             *",
    "*                    0               *",
    "*   0         $     0                *",
    "*   0 0          0 0             %   *",
    "*   000        0 00                  *",
    "*   0          0 0                   *",
    "*0  0          00        $           *",
    "*0  0          0                     *",
    "*0  0          0     0   0           *",
    "*0  0           0    00 0            *",
    "*0000    @    0000000000       @     *",
    "**************************************"];

//var aquariumDefault =
//    ["*                                    *",
//        "*  0                                 *",
//        "* 0                                  *",
//        "*0                                   *",
//        "*0                                   *",
//        "*0         %                         *",
//        "* 00                                 *",
//        "*   0                                *",
//        "*                 0                  *",
//        "*                 0 0     0          *",
//        "*                   0   0            *",
//        "*                    0 0             *",
//        "*                    0               *",
//        "*   0               0                *",
//        "*   0 0          0 0                 *",
//        "*   000        0 00                  *",
//        "*   0          0 0                   *",
//        "*0  0          00                    *",
//        "*0  0          0                     *",
//        "*0  0          0     0   0           *",
//        "*0  0           0    00 0            *",
//        "*0000         0000000000             *",
//        "**************************************"];

// game logic
function Aquarium(plan) {
    this.statistics;
    this.grid = new Grid(plan[0].length, plan.length);
    for (var y = 0; y < plan.length; y++) {
        var line = plan[y];
        for (var x = 0; x < line.length; x++) {
            this.grid.setValueAt(new Point(x, y),
                elementFromCharacter(line.charAt(x)));
        }
    }
};

Aquarium.prototype.render = function(place){
    if (this.statistics) {
        removeElement(this.statistics);
    }
    this.renderStatistics();
    this.grid.render();
    this.grid.place(place);
};

function makeAnimalsInformation(arrayAnimals, title, attrName){
    var animalDiv = "";
    if (arrayAnimals.length > 1) {
        animalDiv = dom("DIV",  {"class": "statisticsItem"}, title + " : " + arrayAnimals.length);
        for (var i = 0; i < arrayAnimals.length; i++){
            console.log(arrayAnimals[i].object);
            var animalInfo = "                # " + i + " " + attrName+ ": " + arrayAnimals[i].object.getEnergy();
            animalDiv.appendChild(dom("DIV", null, animalInfo));
        }
    }
    return animalDiv;
};

Aquarium.prototype.renderStatistics = function(){
    var blueFishes = makeAnimalsInformation(this.arrayOfItems(CharactersEnum.SLOW_FISH), "Small blue fishes", "energy");
    var stripedFishes = makeAnimalsInformation(this.arrayOfItems(CharactersEnum.FISH), "Striped fishes", "energy");
    var snails = makeAnimalsInformation(this.arrayOfItems(CharactersEnum.SNAIL), "Snails", "energy");
    var pears = makeAnimalsInformation(this.arrayOfItems(CharactersEnum.PEARL), "Pearls (when age is 50 someone will be born)", "age");

    this.statistics = dom("DIV", {"class": "statistics"},
        dom("H1", null, "Aquarium"),
        dom("DIV", {"class": "statisticsItem"}, "Food (plants) : "+this.arrayOfItems(CharactersEnum.FOOD).length),
        blueFishes, stripedFishes, snails, pears);
    document.body.appendChild(this.statistics);
};

Aquarium.prototype.listActingCreatures = function() {
    var found = [];
    this.grid.each(function(point, value) {
        if (value != undefined && value.act){
            found.push({object: value, point: point});
        }
    });
    return found;
};

Aquarium.prototype.listSurroundings = function(center) {
    var result = {};
    var grid = this.grid;
    globalDirections.each(function(name, direction) {
        var place = center.add(direction);
        if (grid.isInside(place)) {
            result[name] = characterFromElement(grid.valueAt(place));
        }
    });
    return result;
};

Aquarium.prototype.arrayOfItems = function(character) {
    var found = [];
    this.grid.each(function(point, value) {
        if (value != undefined && value.character === character){
            found.push({object: value, point: point});
        }
    });
    return found;
};

Aquarium.prototype.growFood = function(food){
    var emptyPlaces = [];

    while (emptyPlaces.length === 0){
        var randomFood = randomElement(food);
        var surroundings = this.listSurroundings(randomFood.point);
        emptyPlaces = findDirections(surroundings, " ");
    }

    var randomEmptyPlace = randomElement(emptyPlaces);
    this.grid.setValueAt(randomFood.point.add(globalDirections.lookup(randomEmptyPlace)),
        new Food());
}

Aquarium.prototype.processCreature = function(creature) {
    var surroundings = this.listSurroundings(creature.point);
    var action = creature.object.act(surroundings);

    if (action.type == "move") {
        var to = creature.point.add(action.direction);
        if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined) {
            this.grid.moveValue(creature.point, to);
        }
    } else if (action.type == "eat")   {
        var to = creature.point.add(action.direction);
        this.grid.deleteValue(to);
        if (this.grid.valueAt(to) == undefined) {
            this.grid.moveValue(creature.point, to);
        }
    } else if (action.type == "die")   {
        this.grid.deleteValue(creature.point);
        this.grid.setValueAt(creature.point, new Pearl(creature.object.name));
    } else if (action.type == "wait") {
        // do nothing
    } else if (action.type == "newAnimal") {
       if (creature.object.animal === "blueFish"){
           this.grid.setValueAt(creature.point, new SlowFish());
       }  else if (creature.object.animal === "stripedFish"){
           this.grid.setValueAt(creature.point, new Fish());
       } else if (creature.object.animal === "snail"){
           this.grid.setValueAt(creature.point, new Snail());
       }
    }else {
        throw new Error("Unsupported action: " + action.type);
    }

    var food = this.arrayOfItems(CharactersEnum.FOOD);
    if (food.length < 55) {
        var length =  food.length;
        while (length < 60) {
            this.growFood(this.arrayOfItems(CharactersEnum.FOOD));
            length++;
        }
    }
};

Aquarium.prototype.step = function() {
    forEach(this.listActingCreatures(),
        bind(this.processCreature, this));
    this.render(document.body);
};

Aquarium.prototype.start = function() {
    if (!this.running)
        this.running = setInterval(bind(this.step, this), 500);
};

Aquarium.prototype.stop = function() {
    if (this.running) {
        clearInterval(this.running);
        this.running = null;
    }
};

function elementFromCharacter(character) {
        if (character == " ")  {
            return undefined;
        } else if (character == CharactersEnum.WALL){
            return new Wall();
        } else if (character == CharactersEnum.FISH){
            return new Fish();
        } else if (character == CharactersEnum.SLOW_FISH){
            return new SlowFish();
        } else if (character == CharactersEnum.SNAIL){
            return new Snail();
        } else if (character == CharactersEnum.FOOD){
            return new Food();
        }
}

window.onload = function () {
    var aquarium = new Aquarium(aquariumDefault);
    aquarium.start();
};