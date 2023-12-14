import { useState } from 'react';

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
  const [gameOver, setGameOver] = useState(true);
  

  const startGame = () => {
    setSnake(start_snake);
    setApple(start_apple);
    setDir([0, -1]);
    setSpeed(snake_speed);
    setGameOver(false);
  };

  const createApple = () => apple.map((_, i) => Math.floor(Math.random() * (board_size[i] / square_size)));

  const snakeMove = ({keyCode}) => {
    const keys = Object.keys(movement)
  
 
 
    console.log("direction", movement[keyCode])


    if (keys.includes(keyCode)){
      console.log("It includes")
      setDir(movement[keyCode])
    } else {
      return
    }
  }


  return (
    

    <div className='app' role="button" tabIndex="0" onKeyDown={snakeMove}>


    <button>Start</button>
    <canvas
    style={{border: "10px solid green"}}
    width={`${board_size[0]}px`}
    height={`${board_size[1]}px`}
    />
    </div>
  
  )
}

export default App;



