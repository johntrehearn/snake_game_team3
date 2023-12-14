import { useEffect, useState, useRef } from 'react';
import { useInterval } from './useInterval';


import {
  board_size,
  start_snake,
  start_apple,
  square_size,
  snake_speed,
  movement
} from "./constants";

const App = () => {
  const [snake, setSnake] = useState(start_snake);
  const [apple, setApple] = useState(start_apple);
  const [speed, setSpeed] = useState(null);
  const [dir, setDir] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef();


  
  useInterval(() => gameLoop(), speed);

  const startGame = () => {
    setSnake(start_snake);
    setApple(start_apple);
    setDir([0, -1]);
    setSpeed(snake_speed);
    setGameOver(false);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const createApple = () => apple.map((_, i) => Math.floor(Math.random() * (board_size[i] / square_size)));

  const snakeMove = ({keyCode}) => {
    setDir(movement[keyCode])
/*     const keys = Object.keys(movement)
    if (keys.includes(keyCode)){
      console.log("direction", movement[keyCode]) 
    } else {
      return
    } */
  }

  const gameLoop = () => {
    const snakeCopy = [...snake];
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!cheakAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const checkCollision = (snakeHead, snk = snake) => {
    if(
      snakeHead[0] * square_size >= board_size[0] ||
      snakeHead[0] < 0 ||
      snakeHead[1] * square_size >= board_size[1] ||
      snakeHead[1] < 0
    )
    return true;

    for (const segment of snk) {
      if (snakeHead[0] === segment[0] && snakeHead[1] === segment[1]) return true;
    }
    return false;
  };

  const cheakAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  }

  useEffect (() => {
    const context = canvasRef.current.getContext("2d");
    const img = new Image();
  img.onload = draw;
  img.src = 'https://i.stack.imgur.com/CbEMh.png';
  function draw() {
    context.drawImage(img, apple[0], apple[1], 1, 1); 
  }
    context.setTransform(square_size, 0, 0, square_size, 0, 0);
    context.clearRect(0, 0, board_size[0], board_size[0]);
    img.src = 'https://i.stack.imgur.com/CbEMh.png';
    
    context.drawImage(img, 0, 0);
    context.fillStyle = "blue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  }, [snake, apple, gameOver]);


  return (
    

    <div className='app' role="button" tabIndex="0" onKeyDown={snakeMove}>


    <button onClick={startGame} >Start</button>
    <canvas
    style={{border: "10px solid green"}}
    width={`${board_size[0]}px`}
    height={`${board_size[1]}px`}
    ref ={canvasRef}

    />

    {gameOver && <div>GAME OVER</div>}
    </div>
  
  )

}

export default App;



