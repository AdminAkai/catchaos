var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 2000, // in milliseconds
  spawnrate: 1,
  enemyCount: 0,
  totalEnemies: 0,
  lives: 3,
  roundCount: 0,
  audio: document.querySelector('#my_audio'),
  bombs: 0,
  enemyTypes: {
    pixelcat: { 
      name: 'pixelcat.png',
      lives: '1',
    },
    parakat: {
      name: 'parakat.gif',
      lives: '1',
    }, 
    hiddendoor: { 
      name: 'hiddendoor.gif',
      lives: '4', 
    },
    omnicat: {
      name: 'omnicat.gif',
      lives: '100',
      isAlive: true,
    },
    dancecat: {
      name: 'dancecat.gif',
      lives: 2,
    },
    hungrycat: {
      name: 'hungrycat.gif',
      lives: 2,
    },
    confused: {
      name: 'confused.gif',
      lives: 5,
    },
    omnispark: {
      name: 'omnispark.gif',
      lives: 50,
      isAlive: true,
    },
    eel: {
      name: 'eel.gif',
      lives: 1,
    },
    eelswim: {
      name: 'eelswim.gif',
      lives: 2,
    },
    angryeel: {
      name: 'angryeel.gif',
      lives: 7,
    },
    almightyeel: {
      name: 'almightyeel.gif',
      lives: 150,
      isAlive: true,
    },
    spacecat: {
      name: 'spacecat.gif',
      lives: 3,
    },
    nyancat: {
      name: 'nyancat.gif',
      lives: 3,
    },
    glitchedcat: {
      name: 'glitchedcat.gif',
      lives: 20,
    },
    theoriginalmeow: {
      name: 'theoriginalmeow.gif',
      lives: 250,
      isAlive: true,
    }

  },
  maxSpawn: 0,
  waveCount: 0,
  changedBackground: false,
  finalBackground: false,
  spawnOmnicat: false,
  spawnOmnispark: false,
  spawnTheAlmightyEel: false,
  spawnTheOriginalMeow: false,
}

function gameStart () {
  if (game.gameRun === true) {
    enemySpawner = setInterval(spawnEnemy, game.timer)
  } 
}

function gameMain () {
  document.addEventListener('contextmenu', event => event.preventDefault())
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

function returnFromInstructions () {
  let titleMain = document.getElementsByClassName('game-space')[0]
  titleMain.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  let currentSpace = document.getElementById('instructionBox')
  currentSpace.remove()
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
  this.remove()
  gameMain()
}

function returnToTitle () {
  bossReset()
  gameStopAudio()
  game.spawnrate = 1
  game.enemyCount = 0
  game.roundCount = 0
  let titleMain = document.getElementsByClassName('game-space')[0]
  titleMain.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  let currentSpace = document.getElementById('game-start')
  currentSpace.remove()
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
  gameDiv.remove()
  let parentNode = document.querySelector(".game-space")
  let instructionBox = document.createElement('div')
  instructionBox.id = 'instructionBox'
  parentNode.insertBefore(instructionBox, parentNode.childNodes[0])
  let innerInstructionBox = document.querySelector("#instructionBox")
  let instructions = "ALL NAVIGATION BUTTONS ARE DISABLED WHEN THE GAME STARTS<br>CLICK THE CATS TO MAKE THEM EXPLODE!<br>IF THERE ARE MORE THAN 20 CATS ON THE SCREEN BY THE NEXT WAVE,<br>YOU TAKE DAMAGE!<br>SOME CATS TAKE MORE THAN 1 HIT!<br>HIT SPACEBAR TO SUMMON DEATH AND CLEAR THE WHOLE SCREEN FROM CATS!<br>THIS DOESN'T WORK AGAINST THEIR GODS THOUGH!<br>GOOD LUCK!"
  innerInstructionBox.innerHTML = `${instructions}`
  let returnButtonBox = document.createElement('div')
  returnButtonBox.className = 'return-box'
  let returnButton = document.createElement('h3')
  returnButton.className = "return-button"
  returnButton.innerHTML = "RETURN"
  returnButton.addEventListener('click', returnFromInstructions)
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
  bossReset()
  gameStartAudio()
  let gameBackground = document.getElementsByClassName('game-space')[0]
  gameBackground.style.background = 'linear-gradient(to left, #f163ce, #ec6565)'
  spawnPoints()
  spawnBombs()
  spawnHeart()
  var keyDownlistener = document
  keyDownlistener.addEventListener("keydown", bombUse)
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
    if (game.totalEnemies > 20) {
      game.lives -= 1
      clearEnemy()
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
          tearDownPowers()
          game.audio.pause()
          gameOverSound()
          gameBackground.style.background = 'black'
          game.spawnrate = 1
          game.enemyCount = 0
          game.lives = 3  
          game.bombs = 0
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

function gameFinished () {
  tearDownPowers()
  game.audio.pause()
  gameFinishedSound()
  let gameBackground = document.getElementsByClassName('game-space')[0]
  gameBackground.style.background = 'linear-gradient(to top, #a7a7a7, #ffffff)'
  game.spawnrate = 1
  game.enemyCount = 0
  game.lives = 3  
  game.bombs = 0
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
  let gameFinishedBox = document.createElement('div')
  gameFinishedBox.id = 'game-start'
  let gameFinished = document.createElement('h1')
  gameFinished.className = 'title'
  gameFinished.innerHTML = 'ALL CATS DESTROYED, HERO'
  if (game.points > game.highScore) {
    game.highScore = game.points
  }
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
  parentNode.insertBefore(gameFinishedBox, parentNode.childNodes[0])
  let parentGameOver = document.querySelector('#game-start')
  parentGameOver.appendChild(gameFinished)
  parentGameOver.appendChild(restartGame)
  let logoClickGameOver = document.querySelector('.logo a')
  logoClickGameOver.href = '../../index.html'
}


function getRandomPosition(element) {
  let parentElement = document.getElementsByClassName("game-space")[0]
  var x = parentElement.offsetHeight-element.clientHeight;
  var y = parentElement.offsetWidth-element.clientWidth;
  var randomX = Math.floor(Math.random()*(x - 200))
  var randomY = Math.floor(Math.random()*(y - 200))
  return [randomX,randomY];
}

function tearDownPowers () {
  document.removeEventListener("keypress", bombUse, true)
}

var bombUse = function(event) {
  let currentClone
  let cloneList = []
  if (event.code === 'Space') {
      if (game.bombs > 0) {
        game.bombs -= 1
        let getBombs = document.querySelectorAll(".bombs img")
        for (let j = 0; j < getBombs.length; j++) {
          getBombs[0].remove()
        }
        let enemyList = document.querySelectorAll('.pixelcat')
        summonDeathSound()
        enemyDeathSound()
        game.points += enemyList.length
        for (let i = 0; i < enemyList.length; i++) {
          enemyList[i].removeEventListener('click', clickEnemy)
          currentClone = enemyList[i]
          currentClone.className = 'death-anim'
          enemyList[i].remove()
          currentClone.style.pointerEvents = "none"
          currentClone.src = 'assets/explosion.gif'
          document.querySelector(".game-space").appendChild(currentClone)
          cloneList.push(currentClone)
          game.totalEnemies -= 1
        }
        let pointsUpdate = document.querySelector("#points")
        pointsUpdate.innerHTML = `${game.points} CAT DESTRUCTIONS`
        for (let k = 0; k < cloneList.length; k++) {
          setTimeout(() => {
            cloneList[k].remove()
          }, 600)
        }
      }
  }
}

function spawnBombs () {
  let parentNode = document.querySelector(".game-space")
  game.bombs += 3
  let bombBox = document.createElement('div')
  bombBox.className = 'bombs'
  parentNode.insertBefore(bombBox, parentNode.childNodes[1])
  let innerBombBox = document.querySelector(".bombs")
  for (let i = 0; i < 3; i++) {
      let bombElement = document.createElement('img')
      bombElement.src = 'assets/death.gif'
      bombElement.className = 'bomb' 
      innerBombBox.appendChild(bombElement)
  }
}

function extraBombs () {
  let parentNode = document.querySelector(".bombs")
  game.bombs += 3
  let innerBombBox = document.querySelector(".bombs")
  for (let i = 0; i < 3; i++) {
      let bombElement = document.createElement('img')
      bombElement.src = 'assets/death.gif'
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
        heartElement.src = 'assets/heart.gif'
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

function bossReset () {
  game.enemyTypes.omnicat.isAlive = true
  game.enemyTypes.omnispark.isAlive = true
  game.enemyTypes.almightyeel.isAlive = true
  game.enemyTypes.theoriginalmeow.isAlive = true
  game.spawnOmnicat = false
  game.spawnOmnispark = false
  game.spawnTheAlmightyEel = false
  game.spawnTheOriginalMeow = false
}

function newEnemy(src) {
  if (src ==='pixelcat.png') {
    for (let i = 0; i < game.spawnrate; i++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.className = 'pixelcat original' 
      enemyElement.setAttribute('lives', game.enemyTypes.pixelcat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
    let enemyAnim = anime({
      targets: document.querySelectorAll('.original'),
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
  }
  if (src ==='parakat.gif') {
    for (let j = 0; j < 2; j++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '52px'
      enemyElement.style.height = '100px'
      enemyElement.className = `pixelcat parakat${j}` 
      enemyElement.setAttribute('lives', game.enemyTypes.parakat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
      var randomMovX = Math.floor(Math.random()*100) + 50
      randomMovX *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      var randomMovY = Math.floor(Math.random()*100) + 50
      randomMovY *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let enemyAnimTwo = anime({
        targets: document.querySelectorAll(`.parakat${j}`)[0],
        loop: true,
        direction: 'alternate',
        translateX: {
          value: `${randomMovX}px`,
          duration: 5000,
        }, 
        translateY: {
          value: `${randomMovY}px`,
          duration: 5000,
        },
      })
    }
    game.enemyCount++
  }
  if (src ==='hiddendoor.gif') {
    game.totalEnemies += 1
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    var xy = getRandomPosition(enemyElement)
    let positionX = xy[0]
    let positionY = xy[1]
    enemyElement.style.top = `${positionX}px`
    enemyElement.style.left = `${positionY}px`
    enemyElement.style.right = `${positionX}px`
    enemyElement.style.bottom = `${positionY}px`
    enemyElement.style.width = '108px'
    enemyElement.style.height = '163px'
    enemyElement.className = 'pixelcat hiddendoor' 
    enemyElement.setAttribute('lives', game.enemyTypes.hiddendoor.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
  if (src ==='omnicat.gif') {
    game.totalEnemies += 3
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    enemyElement.style.bottom = `300px`
    enemyElement.style.width = '624px'
    enemyElement.style.height = '484px'
    enemyElement.className = 'omni' 
    enemyElement.setAttribute('lives', game.enemyTypes.omnicat.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
  if (src ==='dancecat.gif') {
    for (let i = 0; i < (game.spawnrate - 2); i++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.className = 'pixelcat dancecat' 
      enemyElement.setAttribute('lives', game.enemyTypes.dancecat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
    let enemyAnimThree = anime({
      targets: document.querySelectorAll('.dancecat'),
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
  }
  if (src ==='hungrycat.gif') {
    for (let j = 0; j < 2; j++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '150px'
      enemyElement.style.height = '150px'
      enemyElement.className = 'pixelcat hungrycat' 
      enemyElement.setAttribute('lives', game.enemyTypes.hungrycat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
    }
    game.enemyCount++
  }
  if (src ==='confused.gif') {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '343px'
      enemyElement.style.height = '333px'
      enemyElement.className = 'pixelcat confused' 
      enemyElement.setAttribute('lives', game.enemyTypes.confused.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
      var randomMovX = Math.floor(Math.random()*400) + 1
      randomMovX *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let enemyAnimFour = anime({
        targets: document.querySelectorAll('.confused')[0],
        loop: true,
        direction: 'alternate',
        translateX: {
          value: `${randomMovX}px`,
          duration: 5000,
        }, 
      })
    game.enemyCount++
  }
  if (src ==='omnispark.gif') {
    game.totalEnemies += 3
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    enemyElement.style.bottom = `300px`
    enemyElement.style.width = '350px'
    enemyElement.style.height = '350px'
    enemyElement.className = 'omnispark' 
    enemyElement.setAttribute('lives', game.enemyTypes.omnispark.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
  }
  if (src ==='eel.gif') {
    for (let i = 0; i < game.spawnrate; i++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '150px'
      enemyElement.style.height = '150px'
      enemyElement.className = 'pixelcat eel' 
      enemyElement.setAttribute('lives', game.enemyTypes.eel.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
    let enemyAnimSix = anime({
      targets: document.querySelectorAll('.eel'),
      scale: {
        value: 1.5,
        duration: 1600,
        delay: 0,
        easing: 'easeOutQuad',
      }, 
    })
    game.enemyCount++
    }
  }
  if (src ==='eelswim.gif') {
    for (let k = 0; k < 2; k++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '240px'
      enemyElement.style.height = '240px'
      enemyElement.className = `pixelcat eelswim${k}` 
      enemyElement.setAttribute('lives', game.enemyTypes.eelswim.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
      var randomMovX = Math.floor(Math.random()*200) + 100
      randomMovX *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      var randomMovY = Math.floor(Math.random()*200) + 100
      randomMovY *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let enemyAnimSeven = anime({
        targets: document.querySelector(`.eelswim${k}`),
        loop: true,
        direction: 'alternate',
        translateX: {
          value: `${randomMovX}px`,
          duration: 4000,
        }, 
        translateY: {
          value: `${randomMovY}px`,
          duration: 4000,
        },
      })
      game.enemyCount++
    }  
  }
  if (src ==='angryeel.gif') {
    game.totalEnemies += 1
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    var xy = getRandomPosition(enemyElement)
    let positionX = xy[0]
    let positionY = xy[1]
    enemyElement.style.top = `${positionX}px`
    enemyElement.style.left = `${positionY}px`
    enemyElement.style.right = `${positionX}px`
    enemyElement.style.bottom = `${positionY}px`
    enemyElement.style.width = '360px'
    enemyElement.style.height = '360px'
    enemyElement.className = 'pixelcat angryeel' 
    enemyElement.setAttribute('lives', game.enemyTypes.angryeel.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
  if (src ==='almightyeel.gif') {
    game.totalEnemies += 3
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    enemyElement.style.bottom = `150px`
    enemyElement.style.width = '472px'
    enemyElement.style.height = '624px'
    enemyElement.className = 'almightyeel' 
    enemyElement.setAttribute('lives', game.enemyTypes.omnicat.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
  if (src ==='spacecat.gif') {
    for (let i = 0; i < (game.spawnrate - 2); i++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '269px'
      enemyElement.style.height = '224px'
      enemyElement.className = `pixelcat spacecat${i}`
      enemyElement.setAttribute('lives', game.enemyTypes.spacecat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
      var randomMovX = Math.floor(Math.random()*100) + 50
      randomMovX *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      var randomMovY = Math.floor(Math.random()*100) + 50
      randomMovY *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let enemyAnimEight = anime({
        targets: document.querySelectorAll(`.spacecat${i}`)[0],
        loop: true,
        direction: 'alternate',
        translateX: {
          value: `${randomMovX}px`,
          duration: 5000,
        }, 
        translateY: {
          value: `${randomMovY}px`,
          duration: 5000,
        },
      })
    game.enemyCount++
    }
  }
  if (src ==='nyancat.gif') {
    for (let j = 0; j < 2; j++) {
      game.totalEnemies += 1
      let enemyElement = document.createElement('img')
      enemyElement.src = `assets/${src}`
      var xy = getRandomPosition(enemyElement)
      let positionX = xy[0]
      let positionY = xy[1]
      enemyElement.style.top = `${positionX}px`
      enemyElement.style.left = `${positionY}px`
      enemyElement.style.right = `${positionX}px`
      enemyElement.style.bottom = `${positionY}px`
      enemyElement.style.width = '280px'
      enemyElement.style.height = '196px'
      enemyElement.className = `pixelcat nyancat${j}` 
      enemyElement.setAttribute('lives', game.enemyTypes.nyancat.lives)
      enemyElement.addEventListener('click', clickEnemy)
      enemyElement.addEventListener('contextmenu', clickEnemy)
      document.querySelector(".game-space").appendChild(enemyElement)
      var randomMovX = Math.floor(Math.random()*100) + 50
      randomMovX *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      var randomMovY = Math.floor(Math.random()*100) + 50
      randomMovY *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let enemyAnimNine = anime({
        targets: document.querySelectorAll(`.nyancat${j}`)[0],
        loop: true,
        direction: 'alternate',
        translateX: {
          value: `${randomMovX}px`,
          duration: 3000,
        }, 
        translateY: {
          value: `${randomMovY}px`,
          duration: 3000,
        },
      })
    }
    game.enemyCount++
  }
  if (src ==='glitchedcat.gif') {
    game.totalEnemies += 1
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    var xy = getRandomPosition(enemyElement)
    let positionX = xy[0]
    let positionY = xy[1]
    enemyElement.style.top = `${positionX}px`
    enemyElement.style.left = `${positionY}px`
    enemyElement.style.right = `${positionX}px`
    enemyElement.style.bottom = `${positionY}px`
    enemyElement.style.width = '400px'
    enemyElement.style.height = '400px'
    enemyElement.className = 'pixelcat glitchedcat' 
    enemyElement.setAttribute('lives', game.enemyTypes.glitchedcat.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
  if (src ==='theoriginalmeow.gif') {
    game.totalEnemies += 5
    let enemyElement = document.createElement('img')
    enemyElement.src = `assets/${src}`
    enemyElement.style.bottom = `50px`
    enemyElement.style.width = '702px'
    enemyElement.style.height = '778px'
    enemyElement.className = 'theoriginalmeow' 
    enemyElement.setAttribute('lives', game.enemyTypes.theoriginalmeow.lives)
    enemyElement.addEventListener('click', clickEnemy)
    enemyElement.addEventListener('contextmenu', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    game.enemyCount++
  }
}

function spawnEnemy() {
  game.roundCount += 1
  if (game.enemyTypes.omnicat.isAlive === true) {
    newEnemy(game.enemyTypes.pixelcat.name)
    if (game.roundCount === 5) {
      game.spawnrate += 1
    } else if (game.roundCount === 10) {
      game.spawnrate += 1
    } else if (game.roundCount === 15) {
      game.spawnrate += 1
    } else if (game.roundCount === 20) {
      game.spawnrate += 2
    }
    if (game.roundCount % 3 === 0) {
      newEnemy(game.enemyTypes.parakat.name)
    }
    if (game.roundCount % 6 === 0) {
      newEnemy(game.enemyTypes.hiddendoor.name)
    }
  }
  if (game.enemyTypes.omnicat.isAlive === false && game.enemyTypes.omnispark.isAlive === true) {
    newEnemy(game.enemyTypes.dancecat.name)
    if (game.roundCount % 4 === 0) {
      newEnemy(game.enemyTypes.hungrycat.name)
    }
    if (game.roundCount % 8 === 0) {
      newEnemy(game.enemyTypes.confused.name)
    }
  }
  if (game.enemyTypes.omnispark.isAlive === false && game.enemyTypes.almightyeel.isAlive === true) {
    if (game.changedBackground === false) {
      let currentBackground = document.getElementsByClassName('game-space')[0]
      currentBackground.style.background = 'linear-gradient(to left, #0661c9, #001486)'
      game.changedBackground = true
    }
    newEnemy(game.enemyTypes.eel.name)
    if (game.roundCount % 7 === 0) {
      newEnemy(game.enemyTypes.eelswim.name)
    }
    if (game.roundCount % 12 === 0) {
      newEnemy(game.enemyTypes.angryeel.name)
    }
  }
  if (game.enemyTypes.almightyeel.isAlive === false && game.enemyTypes.theoriginalmeow.isAlive === true) {
    if (game.finalBackground === false) {
      let currentBackground = document.getElementsByClassName('game-space')[0]
      currentBackground.style.background = 'linear-gradient(to top, #141414, #000000)'
      game.finalBackground === true
    }
    newEnemy(game.enemyTypes.spacecat.name)
    if (game.roundCount % 5 === 0) {
      newEnemy(game.enemyTypes.nyancat.name)
    }
    if (game.roundCount % 10 === 0) {
      newEnemy(game.enemyTypes.glitchedcat.name)
    }
  }
  if (game.enemyTypes.theoriginalmeow.isAlive == false) {
    gameFinished()
  }
  gameOver()
}

function clearEnemy() {
  let currentOnScreen = document.querySelectorAll('.pixelcat')
  for (let i = 0; i < currentOnScreen.length; i++) {
    currentOnScreen[i].removeEventListener('click', clickEnemy)
    currentOnScreen[i].removeEventListener('contextmenu', clickEnemy)
      currentOnScreen[i].src = 'assets/explosion.gif'
      game.totalEnemies -= 1
      setTimeout(() => {
        currentOnScreen[i].remove()
      }, 600)
  }
}

function clickEnemy () { 
  let lives = parseInt(this.getAttribute('lives'))
  lives -= 1
  if (lives === 0) {
    enemyDeathSound()
    game.points += 1
    if (game.points >= 100 && game.points < 200) {
      if (game.spawnOmnicat === false) {
        game.spawnOmnicat = true
        clearEnemy()      
        newEnemy(game.enemyTypes.omnicat.name)
      }
    }
    if (game.points >= 200 && game.points < 300) {
      if (game.spawnOmnispark === false) {
        game.spawnOmnispark = true
        clearEnemy()
        newEnemy(game.enemyTypes.omnispark.name)
      }
    }
    if (game.points >= 300 && game.points < 400) {
      if (game.spawnTheAlmightyEel === false) {
        game.spawnTheAlmightyEel = true
        clearEnemy()
        newEnemy(game.enemyTypes.almightyeel.name)
      }
    }
    if (game.points >= 400) {
      if (game.spawnTheOriginalMeow === false) {
        game.spawnTheOriginalMeow = true
        clearEnemy()
        newEnemy(game.enemyTypes.theoriginalmeow.name)
      }
    }
    game.totalEnemies -= 1
    let pointsUpdate = document.querySelector("#points")
    pointsUpdate.innerHTML = `${game.points} CAT DESTRUCTIONS`
    this.removeEventListener('click', clickEnemy)
    this.removeEventListener('contextmenu', clickEnemy)
    this.style.pointerEvents = "none"
    let currentEnemy = this.classList
    if (currentEnemy.contains('omni')) {
      extraBombs()
      clearEnemy()
      game.enemyTypes.omnicat.isAlive = false
      this.src = 'assets/spaceexplosion.gif'
      setTimeout(() => {
        this.remove()
      }, 1000)
    }
    if (currentEnemy.contains('omnispark')) {
      extraBombs()
      clearEnemy()
      game.enemyTypes.omnispark.isAlive = false
      this.src = 'assets/spaceexplosion.gif'
      setTimeout(() => {
        this.remove()
      }, 1000)
    }
    if (currentEnemy.contains('almightyeel')) {
      extraBombs()
      clearEnemy()
      game.enemyTypes.almightyeel.isAlive = false
      this.src = 'assets/spaceexplosion.gif'
      setTimeout(() => {
        this.remove()
      }, 1000)
    }
    if (currentEnemy.contains('theoriginalmeow')) {
      clearEnemy()
      game.enemyTypes.theoriginalmeow.isAlive = false
      this.src = 'assets/spaceexplosion.gif'
      setTimeout(() => {
        this.remove()
      }, 1000)
    }
    if (currentEnemy.contains('pixelcat')) {
      this.src = 'assets/explosion.gif'
      setTimeout(() => {
        this.remove()
      }, 600)
    }
  }
  if (lives > 0) {
      var randomTurn = Math.floor(Math.random()*10) + 5
      randomTurn *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      let currentWidth = this.style.width
      let currentHeight = this.style.height
      currentWidth.replace('px', '')
      currentHeight.replace('px', '')
      currentWidth = parseInt(currentWidth) - 2
      currentHeight = parseInt(currentHeight) - 2
      currentWidth.toString()
      currentHeight.toString()
      this.style.width = `${currentWidth}px`
      this.style.height = `${currentHeight}px`
      this.style.transform = `rotate(${randomTurn}deg)`
      enemyHitSound()
      lives.toString()
      this.setAttribute('lives', lives)  
  }
}

function gameStartAudio () {
  game.audio.volume = 0.1
  game.audio.currentTime = 0
  game.audio.play()
}

function enemyDeathSound () {
  let audioEnemy = document.getElementById('cat_death')
  audioEnemy.load()
  audioEnemy.volume = 0.2
  audioEnemy.play()
}

function enemyHitSound () {
  let audioHit = document.getElementById('attack_hit')
  audioHit.load()
  audioHit.volume = 0.2
  audioHit.play()
}

function summonDeathSound () {
  let audioDeath = document.getElementById('summon_death')
  audioDeath.load()
  audioDeath.volume = 0.5
  audioDeath.play()
}

function gameOverSound () {
  let gameOverAudio = document.getElementById('game_over')
  gameOverAudio.load()
  gameOverAudio.currentTime = 0
  gameOverAudio.volume = 0.4
  gameOverAudio.play()
}

function gameFinishedSound () {
  let gameFinishedAudio = document.getElementById('game_finished')
  gameFinishedAudio.load()
  gameFinishedAudio.currentTime = 0
  gameFinishedAudio.volume = 0.5
  gameFinishedAudio.play()
}

function gameStopAudio() {
    var sounds = document.getElementsByTagName('audio')
  for(i=0; i<sounds.length; i++) {
    sounds[i].pause();
  }
}

gameMain()