var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 3000, //in milliseconds
  spawnrate: 1,
  enemyCount: 0,
  totalEnemies: 0,
  lives: 3,
  roundCount: 0,
  audio: document.querySelector('#my_audio'),
  bombs: 3,
}

function gameStart () {
  if (game.gameRun === true) {
    enemySpawner = setInterval(spawnEnemy, game.timer)
  } 
}

function gameMain () {
  let startGame = document.getElementsByClassName("game-start-button")[0]
  let instructionsButton = document.getElementsByClassName("instructions-button")[0]
  instructionsButton.addEventListener('click', clickInstructions)
  instructionsButton.addEventListener('mouseover', function(){
    let instructionsColor = document.getElementsByClassName('instructions-button')[0]
    instructionsColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #0400da, #0051ff)'
  })
  instructionsButton.addEventListener('mouseout', function(){
    let instructionsColor = document.getElementsByClassName('instructions-button')[0]
    instructionsColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #f35626, #feab3a)'
  })
  startGame.addEventListener('click', clickGameStart)
  startGame.addEventListener('mouseover', function() {
    let gameStartColor = document.getElementsByClassName('game-start-button')[0]
    gameStartColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #0400da, #0051ff)'
  })
  startGame.addEventListener('mouseout', function(){
    let gameStartColor = document.getElementsByClassName('game-start-button')[0]
    gameStartColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #f35626, #feab3a)'
  })
} 

function returnToTitle () {
  game.spawnrate = 1
  game.enemyCount = 0
  game.roundCount = 0
  game.timer = 3000
  let titleMain = document.getElementsByClassName('game-space')[0]
  titleMain.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  let titleChild = titleMain.lastElementChild
  while (titleChild) {
    titleMain.removeChild(titleChild)
    titleChild = titleMain.lastElementChild
  }
  let parentNode = document.querySelector(".game-space")
  let titleBox = document.createElement('div')
  titleBox.id = 'game-start'
  parentNode.insertBefore(titleBox, parentNode.childNodes[0])
  let innerTitleBox = document.querySelector("#game-start")
  let titleText = document.createElement('h1')
  titleText.className = 'title'
  titleText.innerHTML = 'CAT CHAOS'
  let instructionsText = document.createElement('h3')
  instructionsText.className = 'instructions-button'
  instructionsText.innerHTML = 'INSTRUCTIONS'
  let gameStartText = document.createElement('h3')
  gameStartText.className = 'game-start-button'
  gameStartText.innerHTML = 'GAME START'
  innerTitleBox.appendChild(titleText)
  innerTitleBox.appendChild(instructionsText)
  innerTitleBox.appendChild(gameStartText)
  gameMain()
}

function clickInstructions () {
  let gameBackground = document.getElementsByClassName('game-space')[0]
  gameBackground.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  let gameDiv = document.getElementById('game-start')
  let gameChild = gameDiv.lastElementChild
  while (gameChild) {
    gameDiv.removeChild(gameChild)
    gameChild = gameDiv.lastElementChild
  }
  let parentNode = document.querySelector(".game-space")
  let instructionBox = document.createElement('div')
  instructionBox.id = 'instructionBox'
  parentNode.insertBefore(instructionBox, parentNode.childNodes[0])
  let innerInstructionBox = document.querySelector("#instructionBox")
  let instructions = "ALL NAVIGATION BUTTONS ARE DISABLED WHEN THE GAME STARTS<br>CLICK THE CATS TO MAKE THEM EXPLODE!<br>IF THERE ARE MORE 10 CATS ON THE SCREEN BY THE NEXT WAVE,<br>YOU TAKE DAMAGE!<br>HIT SPACEBAR TO USE A BOMB AND CLEAR THE WHOLE SCREEN FROM CATS!<br>THIS ALSO SLOWS THEIR INVASION FOR A SHORT WHILE!"
  innerInstructionBox.innerHTML = `${instructions}`
  let returnButtonBox = document.createElement('div')
  returnButtonBox.className = 'return-box'
  let returnButton = document.createElement('h3')
  returnButton.className = "return-button"
  returnButton.innerHTML = "RETURN"
  returnButton.addEventListener('click', returnToTitle)
  returnButton.addEventListener('mouseover', function() {
    let returnButtonColor = document.getElementsByClassName('return-button')[0]
    returnButtonColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #0400da, #0051ff)'
  })
  returnButton.addEventListener('mouseout', function(){
    let returnButtonColor = document.getElementsByClassName('return-button')[0]
    returnButtonColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #f35626, #feab3a)'
  })
  returnButtonBox.appendChild(returnButton)
  parentNode.insertBefore(returnButtonBox, parentNode.hasChildNodes[0])
}

function clickGameStart () {
  if (game.audio.paused) {
    game.audio.volume = 0.1
    game.audio.play()
  } else {
     game.audio.currentTime = 0
  }
  let gameBackground = document.getElementsByClassName('game-space')[0]
  gameBackground.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  spawnPoints()
  spawnBombs()
  spawnHeart()
  bombUse()
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
          highScore.className = 'color-text'
          highScore.innerHTML = `BEST SCORE: ${game.highScore} CAT DESTRUCTIONS`
          let currentPoints = document.createElement('h4')
          currentPoints.className = 'color-text'
          currentPoints.innerHTML = `YOUR SCORE: ${game.points} CAT DESTRUCTIONS`
          game.points = 0
          let restartGame = document.createElement('h3')
          restartGame.className = 'return-button'
          restartGame.innerHTML = 'RETURN TO MAIN MENU'
          restartGame.addEventListener('click', returnToTitle)
          restartGame.addEventListener('mouseover', function() {
            let restartColor = document.getElementsByClassName('return-button')[0]
            restartColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #0400da, #0051ff)'
          })
          restartGame.addEventListener('mouseout', function(){
            let restartColor = document.getElementsByClassName('return-button')[0]
            restartColor.style.backgroundImage = '-webkit-linear-gradient(92deg, #f35626, #feab3a)'
          })
          parentNode.insertBefore(gameOverBox, parentNode.childNodes[0])
          let parentGameOver = document.querySelector('#game-start')
          parentGameOver.appendChild(gameOver)
          parentGameOver.appendChild(highScore)
          parentGameOver.appendChild(currentPoints)
          parentGameOver.appendChild(restartGame)
          let logoClickGameOver = document.querySelector('.logo a')
          logoClickGameOver.href = '../../index.html'
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

function bombUse () {
  document.addEventListener("keypress", function(event) {
    if (event.keyCode == 32) {
      if (game.bombs > 0) {
        game.timer = 3000
        game.bombs -= 1
        let getBombs = document.querySelector("#bombs")
        let numberOfBombs = getBombs.children
        if (numberOfBombs.length > 0) {
          getBombs.removeChild(getBombs.childNodes[0])
        }
        let enemyList = document.querySelectorAll('.pixelcat')
        enemyDeathSound()
        for (let i = 0; i < enemyList.length; i++) {
          enemyList[i].removeEventListener('click', clickEnemy)
          enemyList[i].src = 'assets/spaceexplosion.gif'
          game.points += 1
          game.totalEnemies -= 1
          setTimeout(() => {
             enemyList[i].remove()
          }, 1000) 
        let pointsUpdate = document.querySelector("#points")
        pointsUpdate.innerHTML = `${game.points} CAT DESTRUCTIONS`
        }
      }
    }
  })
}

function spawnBombs () {
  let parentNode = document.querySelector(".game-space")
  let bombBox = document.createElement('div')
  bombBox.id = 'bombs'
  parentNode.insertBefore(bombBox, parentNode.childNodes[0])
  let innerBombBox = document.querySelector("#bombs")
  for (let i = 0; i < 3; i++) {
      let bombElement = document.createElement('img')
      bombElement.src = 'assets/bomb.png'
      bombElement.className = 'bomb' 
      innerBombBox.appendChild(bombElement)
  }
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
  game.timer -= 50
  game.roundCount += 1
  if (game.roundCount === 4) {
    game.spawnrate += 1
  } else if (game.roundCount === 8) {
    game.spawnrate += 2
  } else if (game.roundCount === 12) {
    game.spawnrate += 2
  } else if (game.roundCount === 16) {
    game.spawnrate += 1
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
    }
  gameOver()
}

function clickEnemy () {
  enemyDeathSound()
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

function enemyDeathSound () {
  let audioEnemy = document.getElementById('cat_death')
  audioEnemy.load()
  audioEnemy.volume = 0.5
  audioEnemy.play()
}

gameMain()