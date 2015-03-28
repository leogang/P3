/* TODO: Swap out the default game images for others.
   TODO: Expand number of enemy rows.
   TODO: Make enemy speed gradually increase as score 
         increases.
   TODO: Have enemies go directly after player (off 
         of their "tracks") if player stays on the 
         grass for too long.
   TODO: High score list.
*/      

// Player movement increments
var MOVE_X = 101;
var MOVE_Y = 83;
// Borders of game/canvas 
var BORDER_LEFT = 0;
var BORDER_RIGHT = 400;
var BORDER_UP = 83; // Edge of the water
var BORDER_DOWN = 415;

var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    var enemySpeeds = [66, 138, 171, 178, 199, 234, 299, 370];
    var rndmSpeed = enemySpeeds[Math.floor(Math.random() * enemySpeeds.length)];
    this.speed = rndmSpeed; 
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > BORDER_RIGHT + 100) {
        this.x = Math.floor(Math.random() * -150);
    }
    // Handle enemy collisions with player
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= allEnemies[i].x + 66 &&
            player.x + 66 >= allEnemies[i].x &&   
            player.y <= allEnemies[i].y + 66 &&
            player.y + 66 >= allEnemies[i].y) {
            
            player.score = 0;
            player.reset();
        }
    }
};

// Draw the enemies on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};

// Update the player's position
Player.prototype.update = function() {
   };

// Reset the player's position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 415;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Arrow key input
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if(this.x > BORDER_LEFT) 
                this.x -= MOVE_X;
                break;
            
        case 'right':
            if(this.x < BORDER_RIGHT) 
                this.x += MOVE_X;
                break;
            
        case 'up':
            if(this.y > BORDER_UP) {
                this.y -= MOVE_Y;
                break;
            // Upon reaching the water, reset the player
            } else {
                this.reset();
                this.score++;
                break;
            }
        case 'down':
            if(this.y < BORDER_DOWN) 
                this.y += MOVE_Y;
                break;
        default:
            return;
            
    }
};

var enemy1 = new Enemy(-100, 83);
var enemy2 = new Enemy(200, 83);
var enemy3 = new Enemy(400, 166);
var enemy4 = new Enemy(100, 249);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player(200, 415);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
