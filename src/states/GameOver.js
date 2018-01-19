import { State } from 'phaser'
import config from '../config'
import Stars from '../sprites/Stars'
import StarsOverlay from '../sprites/StarsOverlay'

export default class extends State {
  create () {
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

    // Game over title
    const title = this.add.text(
      this.game.width / 2,
      this.game.height * 0.4,
      config.gameOverTitle,
      {
        font: '36px Press Start 2P',
        fill: '#ff0000',
        smoothed: false
      }
    )

    title.anchor.setTo(0.5)
    this.add.tween(title).from({ alpha: 0, y: '+10' }, 300, 'Linear', true)

    // Replay button
    const btn = this.add.button(
      this.game.width / 2,
      this.game.height * 0.6,
      'replayBtn'
    )

    btn.width = 75
    btn.height = 75
    btn.anchor.setTo(0.5)
    this.inputEnabled = true
    btn.events.onInputDown.add(this.replay, this)
    this.add.tween(btn).from({ alpha: 0, y: '+25' }, 400, 'Linear', true)
  }

  replay () {
    this.game.gameOver = false
    this.state.start('Game')
  }
}
