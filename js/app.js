// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    //this.checkCollision();
    if(this.x > 505) {//限定每个蟑螂大的远东极限。
        this.x = -60;
    }
    this.x += dt * this.speed;
    //console.log(`the enemy Y is ${this.y}`);
};


// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//checkCollision();
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

//var player = new Player()
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";

};
Player.prototype.checkCollision = function() {
//给玩家碰撞的方法赋值。
  for(var i = 0; i<allEnemies.length; i++){
    if (Math.abs(this.y-allEnemies[i].y ) == 0) {
      if (Math.abs(this.x- allEnemies[i].x)<50) {
        alert("You are lose")
        this.y = 400;
        this.x = 200;

      }
    }
  }
}
Player.prototype.update = function(dt) {
    this.checkCollision();
//console.log(`the player Y is ${this.y}`);
    if (this.y < -11) {//判定玩家获胜条件。
    setTimeout(function () {
      alert("You are Win");
    },3);
      this.y = 400;
      this.x = 200;
    }

    //console.log(this.y);
}

Player.prototype.handleInput = function(movement) {
    switch(movement) {//限定player的运动原则。
        case 'left':
            if(this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if(this.x < 402) {
                this.x += 101;
            }
            break;
        case 'up':
            if(this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if(this.y < 400) {
                this.y += 83;
            }
            break;

    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for(var i = 0; i < 6; i++) {//在数组中加入每个蟑螂，且规定了其实位置。
    var bug = new Enemy(-20, 83 * (i % 3)+68);
    allEnemies.push(bug);
} //[new Enemy(1, 151),new Enemy(1, 233),new Enemy(1, 68)];
var player = new Player(200, 400);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
