var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SnakeGameSetup;
(function (SnakeGameSetup) {
    var gameIntro = (function (_super) {
        __extends(gameIntro, _super);
        function gameIntro() {
            _super.apply(this, arguments);
        }
        /*
        preload() {
            this.game.load.audio("TitleSong", ["sounds/snek.mp3", "sounds/snek.ogg", "sounds/snek.wav"]);
        }
        */
        gameIntro.prototype.create = function () {
            this.introLogoDisplay = this.add.sprite(0, 0, "introLogo");
            /*
            this.music = this.game.add.audio("TitleSong");
            this.music.volume = 30;
            this.music.loop = true;
            this.music.play();
            */
            this.input.onTap.addOnce(this.clickToStart, this);
        };
        gameIntro.prototype.clickToStart = function () {
            //this.music.stop();
            this.game.state.start("PlayGame");
        };
        return gameIntro;
    })(Phaser.State);
    SnakeGameSetup.gameIntro = gameIntro;
})(SnakeGameSetup || (SnakeGameSetup = {}));
//# sourceMappingURL=gameIntro.js.map