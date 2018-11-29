var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SnakeGameSetup;
(function (SnakeGameSetup) {
    var mySnake = (function (_super) {
        __extends(mySnake, _super);
        function mySnake() {
            _super.apply(this, arguments);
        }
        mySnake.prototype.constructior = function () {
            _super.call(this);
        };
        mySnake.prototype.preload = function () {
            this.game.load.image('snakeSkin', 'images/snake_skin.gif');
        };
        mySnake.prototype.create = function () {
            //snakePart = this.game.add.sprite(20, 20, 'snakeSkin');
            alert(1);
        };
        return mySnake;
    })(Phaser.State);
    SnakeGameSetup.mySnake = mySnake;
})(SnakeGameSetup || (SnakeGameSetup = {}));
//# sourceMappingURL=mySnake.js.map