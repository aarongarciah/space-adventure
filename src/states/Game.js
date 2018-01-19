/* globals __DEV__ */
import { State, Physics, Timer, Signal } from 'phaser'
import config from '../config'
import Spaceship from '../sprites/Spaceship'
import Stars from '../sprites/Stars'
import StarsOverlay from '../sprites/StarsOverlay'
import Asteroid from '../sprites/Asteroid'
import ArrowBtn from '../sprites/ArrowBtn'

export default class extends State {
  constructor () {
    super()
    this.gameStarted = false
  }

  create () {
    // Start physics
    this.game.physics.startSystem(Physics.ARCADE)

    // Background tiles
    this.add.existing(
      new Stars({
        game: this.game,
        x: 0,
        y: 0,
        width: this.game.width,
        height: this.game.height,
        asset: 'stars'
      })
    )
    this.add.existing(
      new StarsOverlay({
        game: this.game,
        asset: 'starsOverlay',
        alpha: 0.3,
        speed: 5
      })
    )
    this.add.existing(
      new StarsOverlay({
        game: this.game,
        asset: 'starsOverlay',
        alpha: 0.1,
        speed: 2
      })
    )

    // Game title
    const title = this.add.text(
      this.world.centerX,
      this.game.height - 50,
      config.title,
      {
        font: '24px Press Start 2P',
        fill: config.accentColor,
        smoothed: false
      }
    )

    title.anchor.setTo(0.5)
    this.add.tween(title).to({ alpha: 0, y: '+30' }, 500, 'Linear', true, 3000)

    // Arrow buttons
    const btnWidth = config.arrowBtnWidth
    const btnSpacing = config.arrowBtnSpacing
    const btnX = btnSpacing + btnWidth / 2
    this.btnUp = this.add.existing(
      new ArrowBtn({
        game: this.game,
        x: btnX,
        y: this.game.height / 2 - btnSpacing / 2 - btnWidth / 2,
        width: btnWidth,
        height: btnWidth,
        type: 'up'
      })
    )
    this.btnDown = this.add.existing(
      new ArrowBtn({
        game: this.game,
        x: btnX,
        y: this.game.height / 2 + btnSpacing / 2 + btnWidth / 2,
        width: btnWidth,
        height: btnWidth,
        type: 'down'
      })
    )
    this.game.btnUp = this.btnUp
    this.game.btnDown = this.btnDown

    // Spaceship
    this.spaceship = this.add.existing(
      new Spaceship({
        game: this.game,
        x: this.world.centerX,
        y: this.world.centerY,
        asset: 'spaceship'
      })
    )
    this.spaceship.body.onWorldBounds = new Signal()
    this.spaceship.body.onWorldBounds.add(this.onHitWorldBounds, this)
    this.spaceship.body.onCollide = new Signal()
    this.spaceship.body.onCollide.add(this.onSpaceshipHitsObstacle, this)

    // Asteroids
    this.obstacles = this.game.add.group()
    this.game.time.events.add(
      Timer.SECOND * 2,
      () => {
        this.gameStarted = true
        this.makeObstacles()
      },
      this
    )

    // Bring arrow buttons to top
    this.game.world.bringToTop(this.btnUp)
    this.game.world.bringToTop(this.btnDown)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.spaceship, 32, 32)
      this.game.debug.body(this.spaceship)
      this.obstacles.children.forEach(item => this.game.debug.body(item))
    }
  }

  update () {
    // Add collision between the spaceship and the obstacles
    this.game.physics.arcade.collide(this.spaceship, this.obstacles)

    if (this.gameStarted) {
      // Check when all obstacles have left the screen
      const allObstaclesLeft = this.obstacles.children.every(
        obstacle => obstacle.x < -obstacle.width
      )

      if (allObstaclesLeft) {
        this.makeObstacles()
      }
    }
  }

  // Build the obstacles
  makeObstacles () {
    this.obstacles.removeAll()
    const totalAsteroids = this.game.rnd.integerInRange(8, 12)

    for (let i = 0; i < totalAsteroids; i++) {
      this.obstacles.add(
        new Asteroid({
          game: this.game,
          type: this.game.rnd.pick(['asteroid', 'asteroid', 'planet'])
        })
      )
    }
  }

  // Spaceship hits world bounds
  onHitWorldBounds () {
    this.delayGameOver()
  }

  // Spaceship hits obstacle
  onSpaceshipHitsObstacle () {
    this.delayGameOver()
  }

  // Set gameOver
  delayGameOver () {
    this.gameStarted = false
    this.game.gameOver = true
    this.game.time.events.add(Timer.SECOND * 0.3, this.gameOver, this)
  }

  gameOver () {
    this.state.start('GameOver')
  }
}
