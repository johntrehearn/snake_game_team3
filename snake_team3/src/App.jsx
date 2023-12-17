import { useEffect, useState, useRef } from "react";
import { useInterval } from "./useInterval";
import {
  board_size,
  start_snake,
  start_apple,
  difficulty,
  movement,
} from "./constants";
import useSound from "use-sound"; //use-sound install by 'npm add use-sound'

const App = () => {
  const [snake, setSnake] = useState(start_snake);
  const [apple, setApple] = useState(start_apple);
  const [speed, setSpeed] = useState(null);
  const [dir, setDir] = useState([0, -1]);
  const [squareSize, setSquareSize] = useState(difficulty.medium.size);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef();

  const [playSound] = useSound("../assets/sound/swallow.mp3"); 

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
      playSound();
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

    //add apple img
    const appleImg = new Image();
    appleImg.onload = draw;
    appleImg.src = "assets/apple2.png";

    //add snakeHead img
    const snakeHead = new Image();
    snakeHead.onload = draw;
    snakeHead.src = "assets/snakeHead2.PNG";

    const context = canvasRef.current.getContext("2d");
    context.setTransform(squareSize, 0, 0, squareSize, 0, 0);
    context.clearRect(0, 0, board_size[0], board_size[0]);

    context.fillStyle = "#74B72E" /* "#98BF64" */; 
    snake.forEach(([x, y]) => 
    {
      context.beginPath();
      context.arc(x+0.5,y+0.5,0.5,0,Math.PI*2,true);
      context.closePath();
      context.fill();
    });    

    function draw() {
      context.drawImage(appleImg, apple[0], apple[1], 1, 1);
      context.clearRect(snake[0][0],snake[0][1], 1, 1);
      let a = context.drawImage(snakeHead, snake[0][0] , snake[0][1], 1, 1);
    }

  }, [snake, apple, gameOver, squareSize]);

  return (
    <div className="app" role="button" tabIndex="0" onKeyDown={snakeMove}>
      <h1>Snake Game - Team 3</h1>
      <div className='info_box'>

      <div className='difButtons'>

        {gameOver && <div>GAME OVER</div>}
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
      </div>
      <div className='game_canvas'>

      <canvas
        style={{ border: "10px solid black", background: 'white' }}

main
        width={`${board_size[0]}px`}
        height={`${board_size[1]}px`}
        ref={canvasRef}
        />
        </div>
        </div>

      <div className='footer'>

          <h3>&copy; Team 3</h3>

          <h2>Find us on github </h2><i className="bi bi-emoji-smile-fill"></i>
          <a href='https://github.com/ThienPham15'>Thien</a>

          <a href="https://github.com/aj-kivimaki">Atte</a>

          <a href="https://github.com/johntrehearn">John</a>

</div>



    </div>
    
  );
};

export default App;
