function SlowFish(){
    this.character = CharactersEnum.SLOW_FISH;
    this.directions = new Dictionary(
        {0: new Point( 0, 0),
            1: new Point( 1, -1),
            2: new Point( 1,  1),
            3: new Point(-1,  1),
            4: new Point(-1, -1),
            5: new Point( -1, -1),
            6: new Point( 0, 0),
            7: new Point( 0, 0),
            8: new Point( 0, 0),
            9: new Point( 0, 0),
            10: new Point( 0, 0)
        }
    );
    this.name = "blueFish";
}

SlowFish.prototype = new Animal(10, 100, 50, 70);