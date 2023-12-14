const board_size = [500, 500];

const start_snake = [
  [3, 8],
  [3, 9],
  [3, 10],
];

const start_apple = [6, 2];

// difficulty level by speed and scaling
const difficulty = {
  easy: {
    speed: 500,
    size: 40,
  },
  medium: {
    speed: 350,
    size: 30,
  },
  hard: {
    speed: 200,
    size: 20,
  },
};

// Arrow keys and gaming code configation (WASD)
const movement = {
  38: [0, -1],
  40: [0, 1],
  37: [-1, 0],
  39: [1, 0],
  65: [-1, 0],
  83: [0, 1],
  68: [1, 0],
  87: [0, -1],
};

export { board_size, start_snake, start_apple, movement, difficulty };
