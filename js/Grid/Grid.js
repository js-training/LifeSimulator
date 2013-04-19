function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new Array(width * height);
}
Grid.prototype.valueAt = function(point) {
    return this.cells[point.y * this.width + point.x];
};
Grid.prototype.setValueAt = function(point, value) {
    this.cells[point.y * this.width + point.x] = value;
};
Grid.prototype.isInside = function(point) {
    return point.x >= 0 && point.y >= 0 &&
        point.x < this.width && point.y < this.height;
};
Grid.prototype.moveValue = function(from, to) {
    this.setValueAt(to, this.valueAt(from));
    this.setValueAt(from, undefined);
};
Grid.prototype.deleteValue = function(value) {
    this.setValueAt(value, undefined);
};
Grid.prototype.each = function(action) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var point = new Point(x, y);
            action(point, this.valueAt(point));
        }
    }
};

Grid.prototype.render = function(){
    if (this.table != undefined) {
        this.remove();
    }

    var tbody = dom("TBODY", {"class": "gameField"});
    this.squares = [];
    var endOfLine =  this.width - 1;

    for (var y = 0; y <  this.height; y++) {
        var tableRow = dom("TR");
        var squareRow = [];
        for (var x = 0; x < this.width; x++) {
            var tableCell = dom("TD");
            tableRow.appendChild(tableCell);
            var square = new Square(characterFromElement(this.valueAt(new Point(x, y))), tableCell);
            squareRow.push(square);
        }
        tbody.appendChild(tableRow);
        this.squares.push(squareRow);
    }

    this.table = dom("TABLE", {"class": "gameField"}, tbody);
};

Grid.prototype.place = function(where) {
    where.appendChild(this.table);
};

Grid.prototype.remove = function() {
   removeElement(this.table);
};

function characterFromElement(element) {
    return (element == undefined) ? " " : element.character;
};