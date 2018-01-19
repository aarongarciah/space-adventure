import { State } from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends State {
  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBar'
    )
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.load.image('stars', 'assets/images/stars.jpg')
    this.load.image('starsOverlay', 'assets/images/stars-overlay.png')
    this.load.image('spaceship', 'assets/images/spaceship.png')
    this.load.image('planet', 'assets/images/mars.png')
    this.load.image('asteroid', 'assets/images/asteroid.png')
    this.load.image('arrowUp', 'assets/images/arrow-up.png')
    this.load.image('replayBtn', 'assets/images/replay.png')
  }

  create () {
    this.state.start('Game')
  }
}
