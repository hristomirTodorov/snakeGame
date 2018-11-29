module SnakeGameSetup {
    export class PlayGame extends Phaser.State {
        game: Phaser.Game;
        cursors: Phaser.CursorKeys;
        snakePart: Phaser.Sprite;
        moveHorizontal: number;
        moveVertical: number;
        currMovement: string = "down";
        restOfSnake: Phaser.Group;
        snakeFood: Phaser.Sprite;
        score: number = 0;
        scoreDisplay: string;
        spritesData: Object;
        gameSpeed: Object;
        validXplacement: Object;
        validYplacement: Object;
        snakeLen: number;

        preload() {
            this.load.text('mySprites', 'data/loadData.json');
            this.game.load.image('snakeSkin', 'images/snake_head_skin.gif');
            this.game.load.image('snakeBody', 'images/snake_body_skin.gif');
            this.game.load.image('food', 'images/snake_food.gif');
        }

        create() {
            //debug
            //this.game.time.desiredFps = 1;

            //load json
            this.spritesData = JSON.parse(this.game.cache.getText('mySprites'));

            // create the cursor key object
            this.cursors = this.game.input.keyboard.createCursorKeys();
            
            //set game speed
            this.gameSpeed = this.game.time.events.loop(this.spritesData.game.startSpeed, this.updateCounter, this);
            
            this.game.stage.backgroundColor = this.spritesData.gameBkg;

            //generate initial snake
            this.snakeLen = this.spritesData.snake.len;
            this.snakePart = this.game.add.sprite(this.spritesData.snake.startFromX, this.spritesData.snake.startFromY, 'snakeSkin');

            //generate food
            //todo use a grid to check if food can be spawned
            this.validXplacement = Phaser.ArrayUtils.numberArrayStep(this.spritesData.snake.startFromX, this.game.width, this.snakePart.width);
            this.validYplacement = Phaser.ArrayUtils.numberArrayStep(this.spritesData.snake.startFromY, this.game.height, this.snakePart.height);
            this.snakeFood = this.game.add.sprite(this.game.rnd.pick(this.validXplacement), this.game.rnd.pick(this.validYplacement), 'food');

            //setup world border. Disabled for now

            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            /*
            for (let key in this.game.physics.arcade.checkCollision) {
                this.game.physics.arcade.checkCollision[key] = false;
            }
            */
            //snake and food collision
            this.snakePart.checkWorldBounds = true;
            this.game.physics.enable(this.snakePart, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.snakeFood, Phaser.Physics.ARCADE);
            this.snakeFood.body.collideWorldBounds = true;
            this.snakeFood.body.immovable = true;


            //handle out of the window game over
            //this.snakePart.events.onOutOfBounds.add(this.gameOver, this);
            
            //generate the initial 3 long snake
            this.initialSnake();

            //setup starting movement
            this.moveHorizontal = 0;
            this.moveVertical = this.snakePart.width;

            //add score on screen
            this.scoreDisplay = this.game.add.text(this.game.scale.width - 130, this.game.scale.height - 50, this.spritesData.scoreDisplay + this.score, { font: "22px Arial", fill: "#969696", align: "left" });
        }
        update() {
            //handle movement
            if (this.cursors.down.isDown && this.currMovement != "up") {
                this.moveHorizontal = 0;
                this.moveVertical = this.snakePart.width;
                this.currMovement = "down";
            }
            if (this.cursors.up.isDown && this.currMovement != "down") {
                this.moveHorizontal = 0;
                this.moveVertical = this.snakePart.width * -1;
                this.currMovement = "up";
            }
            if (this.cursors.left.isDown && this.currMovement != "right") {
                this.moveHorizontal = this.snakePart.height * -1;
                this.moveVertical = 0;
                this.currMovement = "left";
            }
            if (this.cursors.right.isDown && this.currMovement != "left") {
                this.moveHorizontal = this.snakePart.height;
                this.moveVertical = 0;
                this.currMovement = "right";
            }

            //collide the snake with food
            this.game.physics.arcade.collide(this.snakePart, this.snakeFood, this.eatFood, null, this);
            
        }

        updateCounter() {
            //make the body of the snake follow the head
            //pop the last part, reposition it to the head and unshift
            let lastPiece = this.restOfSnake.children.pop();
            lastPiece.x = this.snakePart.position.x;
            lastPiece.y = this.snakePart.position.y;
            //alert(lastPiece.y);
            
            //check if out of screen
            if (this.snakePart.position.x < this.snakePart.width) {
                this.snakePart.position.x = this.game.width - this.snakePart.width
            } else if (this.snakePart.position.x > this.game.width - this.snakePart.width) {
                this.snakePart.position.x = this.snakePart.width
            } else if (this.snakePart.position.y < this.snakePart.height) {
                this.snakePart.position.y = this.game.height - this.snakePart.height
            } else if (this.snakePart.position.y > this.game.height - this.snakePart.height) {
                this.snakePart.position.y = this.snakePart.height
            } else {
                //set head position
                this.snakePart.position.add(this.moveHorizontal, this.moveVertical);
            }

            this.restOfSnake.children.unshift(lastPiece);

            //handle self harm
            for (let key in this.restOfSnake.children) {
                if (this.restOfSnake.children[key].x === this.snakePart.position.x && this.restOfSnake.children[key].y === this.snakePart.position.y) {
                    this.gameOver();
                    break;
                }
            }
        }

        eatFood(snake, food) {
            //change food location
            food.x = this.game.rnd.pick(this.validXplacement);
            food.y = this.game.rnd.pick(this.validYplacement);

            //increase score
            this.score++;

            //increase snake
            this.snakeLen++;
            this.restOfSnake.create(1000, 1000, 'snakeBody');

            //display score
            this.scoreDisplay.text = this.spritesData.scoreDisplay + this.score;

            //increase speed
            if (this.score % this.spritesData.game.increaseSpeedLevels == 0 && this.gameSpeed.delay > this.spritesData.game.maxSpeed) {
                this.gameSpeed.delay = this.gameSpeed.delay - this.spritesData.game.speedIncrease;
            }
        }

        initialSnake() {
            this.restOfSnake = this.game.add.group();
            for (let i = 1; i <= this.snakeLen; i++) {
                this.restOfSnake.create(1000, 1000, 'snakeBody');
            }
        }

        gameOver() {
            this.game.state.start("gameOver", true, false, this.score);
            this.score = 0;
            this.snakeLen = this.spritesData.snake.len;
            this.currMovement = "down";
            this.restOfSnake.kill();
            this.initialSnake();
        }
        
    }
}