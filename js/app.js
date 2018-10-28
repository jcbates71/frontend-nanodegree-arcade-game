const BOARD_COLUMN_WIDTH = 101;
const BOARD_ROW_HEIGHT = 83;
const BOARD_COLUMN_COUNT = 4;
const BOARD_ROW_COUNT = 5;
const ROW_Y_VALUES = {};
const ENEMY_SPEED = 1;
const ENEMY_COUNT = 3;
const PLAYER_STARTING_COLUMN = 2;
const PLAYER_STARTING_ROW = 5;
let allEnemies = new Array(), player;

// Enemies our player must avoid
var Enemy = function(speed, leftToRight, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.leftToRight = leftToRight;
    if (leftToRight) {
      this.x = 0;
    } else {
      this.x = 505;
    }
    this.row = row;
    this.y = ROW_Y_VALUES[row];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let movement = ENEMY_SPEED * this.speed * dt;
    if (!this.leftToRight) {movement *= -1}
    this.x += movement;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = PLAYER_STARTING_COLUMN;
  this.y = PLAYER_STARTING_ROW;
}
Player.prototype.update = function(direction) {
  switch (direction) {
    case 0:
      if (this.y > 0) {this.y -= 1;}
      break;
    case 1:
      if (this.x < BOARD_COLUMN_COUNT) {this.x += 1;}
      break;
    case 2:
      if (this.y < BOARD_ROW_COUNT) {this.y += 1;}
      break;
    case 3:
      if (this.x > 0) {this.x -= 1;}
      break;
  }
}
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x * BOARD_COLUMN_WIDTH, this.y * BOARD_ROW_HEIGHT);
}
Player.prototype.handleInput = function (keyCode) {
  if (keyCode == 'up') {
    this.update(0);
  } else if (keyCode == 'right'){
    this.update(1);
  } else if (keyCode == 'down') {
    this.update(2);
  } else if (keyCode == 'left'){
    this.update(3);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
for (var i = 0; i < ENEMY_COUNT; i++) {
  const randomSpeed = Math.floor(Math.random() * 3) + 1;
  const randomDirection = Math.floor(Math.random() * 2) == 0;
  const randomRow = Math.floor(Math.random() * 3) + 1;
  allEnemies.push(new Enemy(randomSpeed, randomDirection, randomRow));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
