const board_size = [500, 500];

const start_snake = [
    [3, 3],
    [3, 4],  
    [3, 5]  
];

const start_apple = [6, 2]


const square_size = 50;

const snake_speed = 400;

// Arrow keys and gaming code configation (WASD)
const movement = {
    38: [0, -1],
    40: [0, 1],
    37: [-1, 0],
    39: [1, 0],
    65: [-1, 0],
    83: [0, 1],
    68: [1, 0],
    87: [0, -1]
};

export {
    board_size,
    start_snake,
    start_apple,
    square_size,
    snake_speed,
    movement
};

