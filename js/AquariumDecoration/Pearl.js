function Pearl(animal){
    this.character = CharactersEnum.PEARL;
    this.age = 1;
    this.animal = animal;
}

Pearl.prototype.getEnergy = function() {
    return this.age;
};

Pearl.prototype.act = function(surroundings){
    if (this.age >= 50) {
        return {type: "newAnimal"};
    } else {
        this.age++;
        return {type: "wait"};
    }
}