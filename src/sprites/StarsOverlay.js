import { TileSprite } from 'phaser'

export default class extends TileSprite {
  constructor ({ game, asset, alpha = 0.2, speed = 4 }) {
    super(game, 0, 0, game.width, game.height, asset)
    this.alpha = alpha
    this.speed = speed
  }

  update () {
    // if (this.game.gameOver) return

    this.tilePosition.x -= this.speed
  }
}
