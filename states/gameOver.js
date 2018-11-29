var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SnakeGameSetup;
(function (SnakeGameSetup) {
    var gameOver = (function (_super) {
        __extends(gameOver, _super);
        function gameOver() {
            _super.apply(this, arguments);
        }
        gameOver.prototype.create = function () {
            this.game.stage.backgroundColor = "#000000";
            this.endText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game over.\nClick on the screen to restart", { font: "22px Arial", fill: "#ffffff", align: "center" });
            this.endText.anchor.setTo(0.5);
            this.input.onTap.addOnce(this.clickToStart, this);
        };
        gameOver.prototype.clickToStart = function () {
            this.game.state.start("PlayGame");
        };
        return gameOver;
    })(Phaser.State);
    SnakeGameSetup.gameOver = gameOver;
})(SnakeGameSetup || (SnakeGameSetup = {}));
//# sourceMappingURL=gameOver.js.map