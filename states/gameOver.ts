module SnakeGameSetup {
    export class gameOver extends Phaser.State {
        game: Phaser.Game;
        endText: string;
        create() {
            
            this.game.stage.backgroundColor = "#000000";
            this.endText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game over.\nClick on the screen to restart", { font: "22px Arial", fill: "#ffffff", align: "center" });
            this.endText.anchor.setTo(0.5);

            this.input.onTap.addOnce(this.clickToStart, this);
        }

        clickToStart() {
            this.game.state.start("PlayGame");
        }
    }
}