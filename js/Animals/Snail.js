function Snail(){
    this.character = CharactersEnum.SNAIL;
    //snails are slow, so most of time they just stay at their places
    this.directions = new Dictionary(
        {0: new Point( 0, 0),
         1: new Point(-1, 0),
         2: new Point( 1, 0),
         3: new Point( 0, 0),
         4: new Point( 0, 0),
         5: new Point( 0, 0),
         6: new Point( 0, 0),
         7: new Point( 0, 0),
         8: new Point( 0, 0),
         9: new Point( 0, 0),
         10: new Point( 0, 0),
         11: new Point( 0, 0),
         12: new Point( 0, 0),
         13: new Point( 0, 0),
         14: new Point( 0, 0),
         15: new Point( 0, 0)
        }
    );

    this.name = "snail";
}

Snail.prototype = new Animal(15, 1000, 100, 20);

