var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 3000, //in milliseconds
  spawnrate: 1,
  enemyCount: 0,
  totalEnemies: 0,
  lives: 3,
  waveCount: 0,
}

var audio = document.querySelector('#my_audio')

function gameStart () {
  if (game.gameRun === true) {
    enemySpawner = setInterval(spawnEnemy, game.timer)
  } 
}

function gameMain () {
  let startGame = document.getElementsByClassName("game-start-button")[0]
  startGame.addEventListener('click', clickGameStart)
} 

function clickGameStart () {
  if (audio.paused) {
    audio.volume = 0.1
    audio.play()
  } else {
     audio.currentTime = 0
  }
  let gameBackground = document.getElementsByClassName('game-space')[0]
  gameBackground.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  spawnPoints()
  spawnHeart()
  let logoClick = document.querySelector('.logo a')
  logoClick.href = '#'
  game.gameRun = true
  document.getElementById('game-start').remove()
  gameStart()
}

function gameOver () {
  let gameBackground = document.getElementsByClassName('game-space')[0]
  if (game.lives >= 0) {
    let getLives = document.querySelector("#lives")
    if (game.totalEnemies > 10) {
      game.lives -= 1
      let numberOfLives = getLives.children
      if (numberOfLives.length > 0) {
        getLives.removeChild(getLives.childNodes[0])  
        if (numberOfLives.length === 2) {
          gameBackground.style.background = 'linear-gradient(to left, #b861a2, #aa3535)'
        }    
        if (numberOfLives.length === 1) {
          gameBackground.style.background = 'linear-gradient(to left, #c4b6b6, #554952)'

        }
      }
        if (game.lives === 0) {
          gameBackground.style.background = 'black'
          game.spawnrate = 1
          game.enemyCount = 0
          game.timer = 3000
          game.lives = 3
          clearInterval(enemySpawner)
          game.gameRun = false
          let enemyList = document.querySelectorAll('img')
          for (let i = 0; i < enemyList.length; i++) {
            enemyList[i].remove()
          } 
          let removePoints = document.getElementById("points")
          removePoints.remove()
          game.totalEnemies = 0
          let parentNode = document.querySelector(".game-space")
          let gameOverBox = document.createElement('div')
          gameOverBox.id = 'game-start'
          let gameOver = document.createElement('h1')
          gameOver.className = 'title'
          gameOver.innerHTML = 'GAME OVER'
          if (game.points > game.highScore) {
            game.highScore = game.points
          }
          let highScore = document.createElement('h4')
          highScore.className = 'title'
          highScore.innerHTML = `BEST SCORE: ${game.highScore} CAT DESTRUCTIONS`
          let currentPoints = document.createElement('h4')
          currentPoints.className = 'title'
          currentPoints.innerHTML = `YOUR SCORE: ${game.points} CAT DESTRUCTIONS`
          game.points = 0
          let restartGame = document.createElement('h3')
          restartGame.className = 'game-start-button'
          restartGame.innerHTML = 'RESTART'
          parentNode.insertBefore(gameOverBox, parentNode.childNodes[0])
          let parentGameOver = document.querySelector('#game-start')
          parentGameOver.appendChild(gameOver)
          parentGameOver.appendChild(highScore)
          parentGameOver.appendChild(currentPoints)
          parentGameOver.appendChild(restartGame)
          let logoClickGameOver = document.querySelector('.logo a')
          logoClickGameOver.href = '../../index.html'
          gameMain()
        }
      }
    }
}

function getRandomPosition(element) {
  let parentElement = document.getElementsByClassName("game-space")[0]
  var x = parentElement.offsetHeight-element.clientHeight;
  var y = parentElement.offsetWidth-element.clientWidth;
  var randomX = Math.floor(Math.random()*(x - 100))
  var randomY = Math.floor(Math.random()*(y - 100))
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

function spawnPoints () {
  let parentNode = document.querySelector(".game-space")
  let pointBox = document.createElement('div')
  pointBox.id = 'points'
  pointBox.className = 'score'
  pointBox.style.fontSize = '50px'
  parentNode.appendChild(pointBox)
  let innerPointBox = document.querySelector("#points")
  innerPointBox.innerHTML = `${game.points} CAT DESTRUCTIONS`
}

function spawnEnemy() {
  game.waveCount += 1
  console.log(`Wave ${game.waveCount}`)
  if (game.waveCount === 4) {
    game.spawnrate += 1
    console.log(`Wave ${game.spawnrate}`)
  } else if (game.waveCount === 8) {
    game.spawnrate += 2
    console.log(`Wave ${game.spawnrate}`)
  } else if (game.waveCount === 12) {
    game.spawnrate += 2
    console.log(`Wave ${game.spawnrate}`)
  } else if (game.waveCount === 16) {
    game.spawnrate += 1
    console.log(`Wave ${game.spawnrate}`)
  }
  for (let i = 0; i < game.spawnrate; i++) {
    game.totalEnemies += 1
    let enemyElement = document.createElement('img')
    enemyElement.src = 'assets/pixelcat.png'
    var xy = getRandomPosition(enemyElement)
    while (typeof(xy) === 'undefined') {
      xy = getRandomPosition(enemyElement)
    }
    let positionX = xy[0]
    let positionY = xy[1]
    enemyElement.style.top = `${positionX}px`
    enemyElement.style.left = `${positionY}px`
    enemyElement.style.right = `${positionX}px`
    enemyElement.style.bottom = `${positionY}px`
    enemyElement.className = 'pixelcat' 
    enemyElement.addEventListener('click', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
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
  let audioEnemy = document.getElementById('cat_death')
  audioEnemy.load()
  audioEnemy.volume = 0.5
  audioEnemy.play()
  game.points += 1
  game.totalEnemies -= 1
  let pointsUpdate = document.querySelector("#points")
  pointsUpdate.innerHTML = `${game.points} CAT DESTRUCTIONS`
  this.removeEventListener('click', clickEnemy)
  this.src = 'assets/spaceexplosion.gif'
  setTimeout(() => {
    this.remove()
  }, 1000);
}

gameMain()