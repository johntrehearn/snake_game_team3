import { useEffect, useState, useRef } from "react";
import { useInterval } from "./useInterval";

import {
  board_size,
  start_snake,
  start_apple,
  difficulty,
  movement,
} from "./constants";

const App = () => {
  const [snake, setSnake] = useState(start_snake);
  const [apple, setApple] = useState(start_apple);
  const [speed, setSpeed] = useState(null);
  const [dir, setDir] = useState([0, -1]);
  const [squareSize, setSquareSize] = useState(difficulty.medium.size);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef();

  useInterval(() => gameLoop(), speed);

  const startGame = (size, speed) => {
    setSnake(start_snake);
    setApple(start_apple);
    setDir([0, -1]);
    setSquareSize(size);
    setSpeed(speed);
    setGameOver(false);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const createApple = () =>
    apple.map((_, i) =>
      Math.floor(Math.random() * (board_size[i] / squareSize))
    );

  const snakeMove = ({ keyCode }) => {
    const keys = Object.keys(movement).map(Number);
    if (keys.includes(keyCode)) {
      setDir(movement[keyCode]);
    }
  };

  const gameLoop = () => {
    const snakeCopy = [...snake];
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!cheakAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const checkCollision = (snakeHead, snk = snake) => {
    if (
      snakeHead[0] * squareSize >= board_size[0] ||
      snakeHead[0] < 0 ||
      snakeHead[1] * squareSize >= board_size[1] ||
      snakeHead[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (snakeHead[0] === segment[0] && snakeHead[1] === segment[1])
        return true;
    }
    return false;
  };

  const cheakAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const img = new Image();
    img.onload = draw;
    img.src = "https://i.stack.imgur.com/CbEMh.png";
    function draw() {
      context.drawImage(img, apple[0], apple[1], 1, 1);
    }
    context.setTransform(squareSize, 0, 0, squareSize, 0, 0);
    context.clearRect(0, 0, board_size[0], board_size[0]);
    img.src = "https://i.stack.imgur.com/CbEMh.png";

    context.drawImage(img, 0, 0);
    context.fillStyle = "blue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  }, [snake, apple, gameOver, squareSize]);

  return (
    <div className="app" role="button" tabIndex="0" onKeyDown={snakeMove}>
      <button
        onClick={() => startGame(difficulty.easy.size, difficulty.easy.speed)}
      >
        Easy
      </button>
      <button
        onClick={() =>
          startGame(difficulty.medium.size, difficulty.medium.speed)
        }
      >
        Medium
      </button>
      <button
        onClick={() => startGame(difficulty.hard.size, difficulty.hard.speed)}
      >
        Hard
      </button>
      <canvas
        style={{ border: "10px solid green" }}
        width={`${board_size[0]}px`}
        height={`${board_size[1]}px`}
        ref={canvasRef}
      />
      {gameOver && <div>GAME OVER</div>}
    </div>
  );
};

export default App;
