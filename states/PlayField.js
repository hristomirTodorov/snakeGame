var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SnakeGameSetup;
(function (SnakeGameSetup) {
    var PlayGame = (function (_super) {
        __extends(PlayGame, _super);
        function PlayGame() {
            _super.apply(this, arguments);
        }
        PlayGame.prototype.create = function () {
            this.game.stage.backgroundColor = '#add640';
        };
        return PlayGame;
    })(Phaser.State);
    SnakeGameSetup.PlayGame = PlayGame;
})(SnakeGameSetup || (SnakeGameSetup = {}));
//# sourceMappingURL=PlayField.js.map