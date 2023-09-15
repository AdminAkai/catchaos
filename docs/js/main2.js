function clickEnemy () { 
    let lives = parseInt(this.getAttribute('lives'))
    lives -= 1
    if (lives === 0) {
      gameAudio('attack_hit')
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
      killEnemy(currentEnemy)
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

function killEnemy (currentEnemy) {
    if (currentEnemy.contains('omnicat')) {  
      game.enemyTypes.omnicat.isAlive = false
    } else if (currentEnemy.contains('omnispark')) {
      game.enemyTypes.omnispark.isAlive = false
    }else if (currentEnemy.contains('almightyeel')) {
      game.enemyTypes.almightyeel.isAlive = false
    } else if (currentEnemy.contains('theoriginalmeow')) {
      game.enemyTypes.theoriginalmeow.isAlive = false
    }
    currentEnemy.src = 'assets/spaceexplosion.gif'
    setTimeout(() => {
      currentEnemy.remove()
    }, 1000)
  }

gameAudio('game_over')
gameAudio('gameStart')
gameAudio('cat_death')
gameAudio('attack_hit')
gameAudio('summon_death')
gameAudio('game_finished')
gameAudio('audioStop')

function gameAudio(audioType) {
  let currentAudio = document.getElementById('game_over')
  if (audioType === 'gameStart') {
    game.audio.volume = 0.1
    game.audio.currentTime = 0
    game.audio.play()
  }
  if (audioType === 'audioStop') {
    var sounds = document.getElementsByTagName('audio')
    for(i=0; i<sounds.length; i++) {
      sounds[i].pause();
    }
  }
  currentAudio.load()
  currentAudio.currentTime = 0
  currentAudio.volume = 0.4
  currentAudio.play()
}