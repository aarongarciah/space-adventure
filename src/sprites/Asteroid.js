import { Sprite, Easing } from 'phaser'

export default class extends Sprite {
  constructor ({ game, type = 'asteroid' }) {
    const x = game.width + game.rnd.integerInRange(1, game.width * 3)
    const y = game.rnd.integerInRange(50, game.height - 50)
    const asset = type === 'planet' ? 'planet' : 'asteroid'

    super(game, x, y, asset)
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(0.3)
    this.yMovement = game.rnd.integerInRange(-1, 1)

    // Enable physics
    game.physics.arcade.enable(this)
    this.enableBody = true
    this.body.setCircle(this.texture.width * 0.5)
    this.body.velocity.x = game.rnd.integerInRange(-200, -450)
    this.body.angularVelocity = game.rnd.integerInRange(-250, 250)

    // Enable input events
    this.inputEnabled = true

    // Attach events
    if (type === 'asteroid') {
      this.input.useHandCursor = true
      this.events.onInputDown.add(this.kill, this)
    }
  }

  update () {
    if (this.game.gameOver) {
      this.body.velocity.x = 0
      this.body.angularVelocity = 0
      return
    }

    this.y += this.yMovement
  }

  kill () {
    // Disable physics
    this.body.enable = false

    // Disable input events
    this.inputEnabled = false

    // Animate fadeout
    const tween = this.game.add
      .tween(this)
      .to({ alpha: 0 }, 300, Easing.Bounce.Out, true)

    tween.onComplete.add(() => this.destroy())
  }
}
