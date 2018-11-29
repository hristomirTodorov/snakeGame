module Game {
    export class SnakeGame {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload
            });
        }


        preload() {
            this.game.load.image('introLogo', 'images/intro.gif');

        }

        create() {
            
            //start on start game screen
            this.game.state.add("gameIntro", SnakeGameSetup.gameIntro, true);
            this.game.state.add("PlayGame", SnakeGameSetup.PlayGame, false);
            this.game.state.add("gameOver", SnakeGameSetup.gameOver, false);

            //var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            //logo.anchor.setTo(0.5, 0.5);

            //this should scale automatically. Do not use for this game
            //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    }

}

window.onload = () => {
    var game = new Game.SnakeGame();

};