const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const snakeSize = 10;
        const canvasSize = 400;
        let snake = [{ x: 200, y: 200 }];
        let food = generateFood();
        let dx = snakeSize;
        let dy = 0;
        let score = 0;
        let paused = false;
        let gameover = false;

        document.addEventListener('keydown', keyDownHandler);

        function keyDownHandler(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;
            const SPACE_KEY = 32;

            if (event.keyCode === SPACE_KEY) {
                paused = !paused;
                return;
            }

            if (gameover && (event.keyCode === LEFT_KEY || event.keyCode === RIGHT_KEY || event.keyCode === UP_KEY || event.keyCode === DOWN_KEY)) {
                restartGame();
                return;
            }

            if (!paused) {
                changeDirection(event);
            }
        }

        function changeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            const keyPressed = event.keyCode;
            const goingUp = dy === -snakeSize;
            const goingDown = dy === snakeSize;
            const goingRight = dx === snakeSize;
            const goingLeft = dx === -snakeSize;

            if (keyPressed === LEFT_KEY && !goingRight) {
                dx = -snakeSize;
                dy = 0;
            }

            if (keyPressed === UP_KEY && !goingDown) {
                dx = 0;
                dy = -snakeSize;
            }

            if (keyPressed === RIGHT_KEY && !goingLeft) {
                dx = snakeSize;
                dy = 0;
            }

            if (keyPressed === DOWN_KEY && !goingUp) {
                dx = 0;
                dy = snakeSize;
            }
        }

        function drawSnake() {
            snake.forEach(drawSnakePart);
        }

        function drawSnakePart(snakePart) {
            ctx.fillStyle = 'lime';
            ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
        }

        function moveSnake() {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                food = generateFood();
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            return {
                x: Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize,
                y: Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize
            };
        }

        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
        }

        function drawScore() {
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 25);
        }

        function main() {
            if (gameOver()) {
                gameover = true;
                ctx.fillStyle = 'white';
                ctx.font = '30px Arial';
                ctx.fillText('Game Over', 150, canvasSize / 2);
                return;
            }

            if (!paused) {
                clearCanvas();
                drawFood();
                moveSnake();
                drawSnake();
                drawScore();
            }
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
        }

        function gameOver() {
            if (
                snake[0].x < 0 || 
                snake[0].x >= canvasSize || 
                snake[0].y < 0 || 
                snake[0].y >= canvasSize
            ) {
                return true;
            }

            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }

            return false;
        }

        function restartGame() {
            snake = [{ x: 200, y: 200 }];
            food = generateFood();
            dx = snakeSize;
            dy = 0;
            score = 0;
            gameover = false;
        }

        setInterval(main, 100);