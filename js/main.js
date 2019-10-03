

let enemyAnim = anime({
  targets: '.pixelcat',
  translateX: {
    value: 250,
    duration: 800,
    direction: 'alternate'
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine',
    direction: 'alternate'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart',
    direction: 'alternate'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});