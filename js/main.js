var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 3000, //in milliseconds
  spawnrate: 1,
  enemyCount: 0,
  totalEnemies: 0,
  lives: 3,
}

function gameStart () {
    if (game.gameRun === true) {
      setInterval(spawnEnemy, game.timer)
    }
}

function gameMain () {
  let startGame = document.getElementsByClassName("game-start-button")[0]
  startGame.addEventListener('click', clickGameStart)
} 

function clickGameStart () {
  spawnHeart()
  game.gameRun = true
  this.parentNode.remove()
  gameStart()
}

function gameOver () {
    // let getState = document.getElementsByClassName("game-start-button")[0]
    let getLives = document.querySelector("#lives")
    if (game.totalEnemies >= 10) {
        game.lives -= 1
        getLives.removeChild(getLives.childNodes[0])
    }
    if (game.lives === 0) {
        getLives.remove()
        let parentNode = document.querySelector(".game-space")
        let gameOverBox = document.createElement('div')
        gameOverBox.id = 'game-over'
        parentNode.insertBefore(gameOverBox, parentNode.childNodes[0])
        let innerGameOverBox = document.querySelector("#game-over")
        let highScoreElement = document.createElement('div')
        highScoreElement.id = "highscore" 
        innerGameOverBox.appendChild(highScoreElement)    
        // startGame.addEventListener('click', clickGameStart)
        game.gameRun = false
    }
}

function getRandomPosition(element) {
  let parentElement = document.getElementsByClassName("game-space")[0]
  var x = parentElement.offsetHeight-element.clientHeight;
  var y = parentElement.offsetWidth-element.clientWidth;
  do {
    var randomX = Math.floor(Math.random()*x)
    var randomY = Math.floor(Math.random()*y)
  } while (randomX <= 300 && randomX >= 900 && randomY <= 200 && randomY >= 500)
  return [randomX,randomY];
}

function spawnHeart () {
    let parentNode = document.querySelector(".game-space")
    let heartBox = document.createElement('div')
    heartBox.id = 'lives'
    parentNode.insertBefore(heartBox, parentNode.childNodes[0])
    let innerHeartBox = document.querySelector("#lives")
    for (let i = 0; i < 3; i++) {
        let heartElement = document.createElement('img')
        heartElement.src = 'assets/heart.png'
        heartElement.className = 'heart' 
        innerHeartBox.appendChild(heartElement)
    }
}


function spawnEnemy() {
   for (let i = 0; i < game.spawnrate; i++) {
     game.totalEnemies += 1
     console.log(game.totalEnemies)
     if (game.enemyCount === game.spawnrate + 2 && game.spawnrate < 8) {
       game.spawnrate += 1
       game.enemyCount = 0
    } 
    let enemyElement = document.createElement('img')
    enemyElement.src = 'assets/pixelcat.png'
    var xy = getRandomPosition(enemyElement)
    while (typeof(xy) === 'undefined') {
      xy = getRandomPosition(enemyElement)
    }
    enemyElement.style.top = xy[0] + 'px'
    enemyElement.style.left = xy[1] + 'px'
    // enemyElement.style.right = xy[1] + 'px'
    // enemyElement.style.bottom = xy[0] + 'px'
    enemyElement.className = 'pixelcat' 
    enemyElement.addEventListener('click', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
  // }
  let enemyAnim = anime({
    targets: document.querySelectorAll('.pixelcat'),
    scale: {
      value: 1.5,
      duration: 1600,
      delay: 0,
      easing: 'easeOutQuad',
    }, 
    rotate: {
      value: 360,
      duration: 1600,
      easing: 'easeOutQuad',  
    },
  })
  game.enemyCount++
  game.timer -= 50
  }
  gameOver()
}

function clickEnemy () {
  game.points += 10
  game.totalEnemies -= 1
  console.log(game.totalEnemies)
  this.parentNode.removeChild(this)
}





gameMain()