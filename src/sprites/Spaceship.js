import { Sprite } from 'phaser'

export default class extends Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    // Enable physics
    game.physics.arcade.enable(this)
    this.enableBody = true
    this.body.collideWorldBounds = true

    this.anchor.setTo(0.5)
    this.scale.setTo(0.3, 0.3)
  }

  update () {
    // If game over stop the spaceship movement
    if (this.game.gameOver) {
      this.enableBody = false
      this.body.angularVelocity = 0
      return
    }

    // Move up & down the spaceship
    // Depending on the rotation it moves faster or slower
    let yAmount = this.rotation * 5

    if (yAmount > 45) {
      yAmount = 45
    }

    this.y += yAmount

    // Rotate the spaceship if screen buttons or keyboard up/down keys are pressed
    if (
      (this.game.cursors.up.isDown || this.game.btnUpIsDown) &&
      this.rotation > -1.2
    ) {
      this.body.angularVelocity = -250
    } else if (
      (this.game.cursors.down.isDown || this.game.btnDownIsDown) &&
      this.rotation < 1.2
    ) {
      this.body.angularVelocity = 250
    } else {
      this.body.angularVelocity = 0
    }
  }
}
