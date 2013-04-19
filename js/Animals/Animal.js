"use strict";

function Animal(numberOfDirections, initEnergy, foodCalories, hungerLevel){
    this.numberOfDirections = numberOfDirections;
    this.energy = initEnergy;
    this.foodCalories = foodCalories;
    this.hungerLevel = hungerLevel;
}

Animal.prototype.act = function(surroundings) {
    var foodSpace = findDirections(surroundings, CharactersEnum.FOOD);

    if (foodSpace.length > 0 && this.energy < this.hungerLevel) {
        this.energy +=  this.foodCalories;
        return {type: "eat", direction: globalDirections.lookup(randomElement(foodSpace))};
    } else if (this.energy < 1){
        return {type: "die"};
    }else {
        this.energy--;
        var randomDirection = Math.floor((Math.random()*this.numberOfDirections));
        return {type: "move", direction: this.directions.lookup(randomDirection)};
    }
};

Animal.prototype.getEnergy = function() {
    return this.energy;
};