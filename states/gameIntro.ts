module SnakeGameSetup {
    export class gameIntro extends Phaser.State {
        game: Phaser.Game;
        //music: Phaser.Sound;

        introLogoDisplay: Phaser.Sprite;
        /*
        preload() {
            this.game.load.audio("TitleSong", ["sounds/snek.mp3", "sounds/snek.ogg", "sounds/snek.wav"]);
        }
        */
        create() {
            this.introLogoDisplay = this.add.sprite(0, 0, "introLogo");
            /*
            this.music = this.game.add.audio("TitleSong");
            this.music.volume = 30;
            this.music.loop = true;
            this.music.play();
            */
            this.input.onTap.addOnce(this.clickToStart, this);

        }

        clickToStart() {
            //this.music.stop();
            this.game.state.start("PlayGame");
        }
    }
}