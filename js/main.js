var game = {
  gameRun: false,
  points: 0,
  highScore: 0,
  timer: 3000, //in milliseconds
  spawnrate: 2,
  enemyCount: 0
}

function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight;
	var y = document.body.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}
// window.onload = function() {
// 	var img = document.createElement('img');
// 	img.setAttribute("style", "position:absolute;");
// 	img.setAttribute("src", "some-image.jpg");
// 	document.body.appendChild(img);
// 	var xy = getRandomPosition(img);
// 	img.style.top = xy[0] + 'px';
// 	img.style.left = xy[1] + 'px';
// }

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
    enemyElement.className = 'pixelcat' 
    enemyElement.addEventListener('click', clickEnemy)
    document.querySelector(".game-space").appendChild(enemyElement)
    var xy = getRandomPosition(enemyElement)
    enemyElement.style.top = xy[0] + 'px'
    enemyElement.style.left = xy[1] + 'px'
  }
  game.enemyCount++
  game.timer -= 50
  console.log(game.timer)
}
//

  // for (var x = 0; x < 3; x++) {
  //     for (var i = 0; i < cards.length; i++) {
  //         var cardElement = document.createElement('img');
  //         cardElement.className = "cards";
  //         cardElement.setAttribute('src', 'images/back.png');
  //         cardElement.setAttribute('data-id', i);
  //         cardElement.addEventListener('click', flipCard);
  //         document.getElementById('game-board').appendChild(cardElement);
  //     }
  // }

function clickEnemy () {
  // enemyId = this.getAttribute('data-id') 
  game.points += 10
  this.parentNode.removeChild(this)
  console.log(game.points)
}

// while (game.gameRun === true) {
let enemySpawn = setInterval(spawnEnemy, game.timer)
// }

// let enemyAnim = anime({
//   targets: document.querySelectorAll('.pixelcat'),
//   translateX: {
//     value: 250,
//     duration: 800,
//     direction: 'alternate'
//   },
//   rotate: {
//     value: 360,
//     duration: 1800,
//     easing: 'easeInOutSine',
//     direction: 'alternate'
//   },
//   delay: 250 // All properties except 'scale' inherit 250ms delay
// });
