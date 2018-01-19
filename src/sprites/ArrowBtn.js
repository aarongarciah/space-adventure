import { Button } from 'phaser'

export default class extends Button {
  constructor ({ game, x, y, width, height, type = 'up' }) {
    super(game, x, y, 'arrowUp')
    this.anchor.setTo(0.5)
    this.width = width
    this.height = height
    this.type = type

    if (type === 'down') {
      this.angle = 180
    }

    // Enable input events
    this.inputEnabled = true

    // Attach events
    this.events.onInputDown.add(this.onBtnDown, this)
    this.events.onInputUp.add(this.onBtnUp, this)
  }

  onBtnDown () {
    if (this.type === 'up') {
      this.game.btnUpIsDown = true
      this.game.btnDownIsDown = false
    } else {
      this.game.btnUpIsDown = false
      this.game.btnDownIsDown = true
    }
  }

  onBtnUp () {
    this.game.btnUpIsDown = false
    this.game.btnDownIsDown = false
  }
}
