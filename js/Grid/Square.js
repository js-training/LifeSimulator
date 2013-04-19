var Square = function(character, tableCell) {
        this.background = "empty";
//        if (character === "#")    {
//            this.background = "wall";
//        } else if (character === "*")  {
//            this.background = "exit";
//        }

        this.tableCell = tableCell;
        this.tableCell.className = this.background;

        this.content = null;
        if (character === CharactersEnum.FOOD) {
            this.content = "food";
        } else if (character === CharactersEnum.SNAIL)   {
            this.content = "snail";
        } else if (character === CharactersEnum.WALL)   {
            this.content = "wall";
        }  else if (character === CharactersEnum.FISH)   {
            this.content = "fish";
        } else if (character === CharactersEnum.SLOW_FISH)   {
            this.content = "fish_2";
        }  else if (character === CharactersEnum.PEARL)   {
            this.content = "pearl";
        }

        if (this.content !== null) {
            var image = dom("IMG", {src: "img/" +
                this.content + ".gif"});
            this.tableCell.appendChild(image);
        }

    this.hasPlayer = function() {
        return this.content == "player";
    };
    this.hasFood = hasFood;

    this.hasWall = function() {
        return this.content == "wall";
    };
   this.isEmpty = function() {
        return this.content == null && this.background == "empty";
    };
   this.clear = function(){
        this.content = null;
        this.background = "empty";
    } ;
};

hasFood = function() {
    return this.content == "food";
};


Square.moveContent = function(target) {
    target.content = this.content;
    this.content = null;
    target.tableCell.appendChild(this.tableCell.lastChild);
};

Square.copyContent = function(target) {
    var image = dom("IMG", {src: "img/player.gif"});
    target.content = "player";
    target.tableCell.appendChild(image);
};

Square.clearContent = function() {
    this.content = null;
    var image = this.tableCell.lastChild;
    var size = 100;

    var animate = setInterval(function() {
        size -= 10;
        image.style.width = size + "%";
        image.style.height = size + "%";
        if (size < 30) {
            clearInterval(animate);
            removeElement(image);
        }
    }, 70);
};