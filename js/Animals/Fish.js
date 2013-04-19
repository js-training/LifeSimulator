function Fish(){
    this.character = CharactersEnum.FISH;
    this.directions = new Dictionary(
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
    this.name = "stripedFish";
}

Fish.prototype = new Animal(8, 100, 50, 70);