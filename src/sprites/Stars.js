import { TileSprite } from 'phaser'

export default class extends TileSprite {
  constructor ({ game, asset }) {
    super(game, 0, 0, game.width, game.height, asset)
  }

  update () {
    // if (this.game.gameOver) return

    this.tilePosition.x -= 8
  }
}
