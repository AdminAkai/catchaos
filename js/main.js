var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 3000, //in milliseconds
  spawnrate: 1,
  enemyCount: 0
}

function gameMain () {
  gameStart()
  while (game.gameRun === true) {
    let enemySpawn = setInterval(spawnEnemy, game.timer)
  }
}

function gameStart () {
  let startGame = document.getElementById("game-start-button")
  startGame.addEventListener('click', clickGameStart)
} 

function clickGameStart () {
  event.preventDefault()
  this.parentNode.removeChild(this)
  game.gameRun = true;
  console.log(game.gameRun)
}

function gameOver () {
}

function getRandomPosition(element) {
  let parentElement = document.getElementsByClassName("game-space")[0]
	var x = parentElement.offsetHeight-element.clientHeight - 300;
	var y = parentElement.offsetWidth-element.clientWidth - 100;
	var randomX = Math.floor(Math.random()*x) + 100;
	var randomY = Math.floor(Math.random()*y) + 300;
	return [randomX,randomY];
}

function spawnHeart () {
  let enemyElement = document.createElement('img')
  enemyElement.src = 'assets/pixelcat.png'
  var xy = getRandomPosition(enemyElement)
  enemyElement.style.top = xy[0] + 'px'
  enemyElement.style.left = xy[1] + 'px'
  enemyElement.className = 'pixelcat' 
}


function spawnEnemy() {
  for (let i = 0; i < game.spawnrate; i++) {
    console.log(game.enemyCount)
    if (game.enemyCount === game.spawnrate + 2) {
      game.spawnrate += 1
      console.log(game.spawnrate)
      game.enemyCount = 0
    } 
    let enemyElement = document.createElement('img')
    enemyElement.src = 'assets/pixelcat.png'
    var xy = getRandomPosition(enemyElement)
    enemyElement.style.top = xy[0] + 'px'
    enemyElement.style.left = xy[1] + 'px'
    enemyElement.className = 'pixelcat' 
    enemyElement.addEventListener('click', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
  }
  let enemyAnim = anime({
    targets: document.querySelectorAll('.pixelcat'),
    direction: 'alternate',
    scale: {
      value: 1.5,
      duration: 800,
      delay: 0,
      easing: 'easeOutQuad',
    }, 
    rotate: {
      value: 360,
      duration: 800,
      easing: 'easeOutQuad',  
    },
  });
  game.enemyCount++
  game.timer -= 50
  console.log(game.timer)
}

function clickEnemy () {
  game.points += 10
  this.parentNode.removeChild(this)
  console.log(game.points)
}

gameMain()