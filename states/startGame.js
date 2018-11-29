var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var gameIntro = (function (_super) {
        __extends(gameIntro, _super);
        //music: Phaser.Sound;
        function gameIntro() {
            _super.call(this);
        }
        gameIntro.prototype.create = function () {
            this.introLogoDisplay = this.add.sprite(0, 0, "introLogo");
            //this.music = this.game.add.audio("TitleSong");
            //this.music.volume = 100;
            //this.music.loop = true;
            //this.music.play();
            this.input.onTap.addOnce(this.clickToStart, this);
        };
        gameIntro.prototype.clickToStart = function () {
            //this.music.stop();
            this.game.state.start("startGame");
        };
        return gameIntro;
    })(Phaser.State);
    Game.gameIntro = gameIntro;
})(Game || (Game = {}));
//# sourceMappingURL=startGame.js.map