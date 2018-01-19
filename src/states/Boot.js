import { State, ScaleManager } from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends State {
  init () {
    // Make game to occupy the full window
    this.game.scale.scaleMode = ScaleManager.SHOW_ALL

    this.stage.backgroundColor = config.bgColor
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.game.cursors = this.game.input.keyboard.createCursorKeys()
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
