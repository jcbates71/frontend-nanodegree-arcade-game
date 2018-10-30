const BOARD_COLUMN_WIDTH = 101;
const BOARD_ROW_HEIGHT = 83;
const BOARD_COLUMN_COUNT = 4;
const BOARD_ROW_COUNT = 5;
const STARTING_ENEMY_SPEED = 150;
const ENEMY_SPEED_INCREASE = 20;
const ENEMY_COUNT = 3;
const PLAYER_COLLISION_BUFFER = 40;
const PLAYER_STARTING_COLUMN = 2;
const PLAYER_STARTING_ROW = 5;
let allEnemies, player;
let score = 0;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.resetEnemy();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  let movement = (STARTING_ENEMY_SPEED + score * ENEMY_SPEED_INCREASE) * this.speed * dt;
  this.x += movement;
  if (this.x > (BOARD_COLUMN_COUNT + 1) * BOARD_COLUMN_WIDTH) {this.resetEnemy()};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y * BOARD_ROW_HEIGHT);
};
Enemy.prototype.resetEnemy = function () {
  this.speed = Math.floor(Math.random() * 3) + 1;
  this.y = Math.floor(Math.random() * 3) + 1;
  this.x = -BOARD_COLUMN_WIDTH;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.moveToStartingPosition();
}
Player.prototype.update = function(direction) {
  switch (direction) {
    case 0:
      if (this.y > 0) {this.y -= 1;}
      if (this.y == 0) {this.reachedGoal();}
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
Player.prototype.reachedGoal = function () {
  score += 1;
  this.moveToStartingPosition();
};
Player.prototype.moveToStartingPosition = function () {
  this.x = PLAYER_STARTING_COLUMN;
  this.y = PLAYER_STARTING_ROW;
};

let checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (player.y == allEnemies[i].y) {
      if (allEnemies[i].x + BOARD_COLUMN_WIDTH > player.x * BOARD_COLUMN_WIDTH + PLAYER_COLLISION_BUFFER && allEnemies[i].x < (player.x + 1) * BOARD_COLUMN_WIDTH - PLAYER_COLLISION_BUFFER) {
        updateCollision();
        return;
      }
    }
  }
}

let updateCollision = function() {
  if (score > 0) {score -= 1;}
  player.moveToStartingPosition();
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
allEnemies = new Array();
for (var i = 0; i < ENEMY_COUNT; i++) {
  allEnemies.push(new Enemy());
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
