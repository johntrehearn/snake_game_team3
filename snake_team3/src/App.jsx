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
    const keys = Object.keys(movement)
    /* console.log("direction", movement[keyCode]) */
    if (keys.includes(keyCode)){
      setDir(movement[keyCode])
    } else {
      return
    }
  }

  useEffect (() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(square_size, 0, 0, square_size, 0, 0);
    context.clearRect(0, 0, board_size[0], board_size[0]);
    context.fillStyle = "blue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "green";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);


  return (
    

    <div className='app' role="button" tabIndex="0" onKeyDown={snakeMove}>


    <button>Start</button>
    <canvas
    style={{border: "10px solid green"}}
    width={`${board_size[0]}px`}
    height={`${board_size[1]}px`}
    ref ={canvasRef}
    />
    </div>
  
  )
}

export default App;



