// var game = {
//   gameRun: false,
//   points: 0,
//   highScore: 0,
//   timer: 3000, //in milliseconds
//   spawnrate: 1,
//   enemyCount: 0
// }

// // function gameMain () {
// //   gameStart()
// //   while (game.gameRun === true) {
// //     let enemySpawn = setInterval(spawnEnemy, game.timer)
// //     enemySpawn
// //   }
// // }

// // function gameStart () {
// //   let startGame = document.getElementById("game-start")
// //   startGame.addEventListener('click', clickGameStart)
// // } 

// // function clickGameStart () {
// //   event.preventDefault()
// //   this.parentNode.removeChild(this)
// //   game.gameRun = true;
// //   console.log(game.gameRun)
// // }

// // function gameOver () {
// // }

// function getRandomPosition(element) {
//   let parentElement = document.getElementsByClassName("game-space")[0]
//   var x = parentElement.offsetHeight-element.clientHeight;
//   console.log(x)
//   var y = parentElement.offsetWidth-element.clientWidth;
//   console.log(y)
//   do {
//     var randomX = Math.floor(Math.random()*x)
//     var randomY = Math.floor(Math.random()*y)
//   } while (randomX <= 300 && randomX >= 900 && randomY <= 200 && randomY >= 500)
//   return [randomX,randomY];
// }

// function spawnHeart () {
//   let enemyElement = document.createElement('img')
//   enemyElement.src = 'assets/heart.png'
//   enemyElement.style.top = xy[0] + 'px'
//   enemyElement.style.left = xy[1] + 'px'
//   enemyElement.style.right = xy[1] + 'px'
//   enemyElement.style.bottom = xy[0] + 'px'
//   enemyElement.className = 'pixelcat' 
// }


// function spawnEnemy() {
//   // for (let i = 0; i < game.spawnrate; i++) {
//   //   console.log(game.enemyCount)
//   //   if (game.enemyCount === game.spawnrate + 2) {
//   //     game.spawnrate += 1
//   //     console.log(game.spawnrate)
//   //     game.enemyCount = 0
//   //   } 
//     let enemyElement = document.createElement('img')
//     enemyElement.src = 'assets/pixelcat.png'
//     var xy = getRandomPosition(enemyElement)
//     while (typeof(xy) === 'undefined') {
//       xy = getRandomPosition(enemyElement)
//     }
//     enemyElement.style.top = xy[0] + 'px'
//     enemyElement.style.left = xy[1] + 'px'
//     // enemyElement.style.right = xy[1] + 'px'
//     // enemyElement.style.bottom = xy[0] + 'px'
//     enemyElement.className = 'pixelcat' 
//     enemyElement.addEventListener('click', clickEnemy)
//     document.querySelector(".game-space").appendChild(enemyElement)
//   // }
//   let enemyAnim = anime({
//     targets: document.querySelectorAll('.pixelcat'),
//     scale: {
//       value: 1.5,
//       duration: 1600,
//       delay: 0,
//       easing: 'easeOutQuad',
//     }, 
//     rotate: {
//       value: 360,
//       duration: 1600,
//       easing: 'easeOutQuad',  
//     },
//   });
//   game.enemyCount++
//   game.timer -= 50
// }

// function clickEnemy () {
//   game.points += 10
//   this.parentNode.removeChild(this)
// }

// // gameMain()

// let enemySpawn = setInterval(spawnEnemy, game.timer)


// // spawnEnemy()