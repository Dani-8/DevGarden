import Phaser from 'phaser';
import { CafeFloorsAndWalls } from './furnitureTextures/CafeFloorsAndWalls';
import { CafeCountersAndAppliances } from './furnitureTextures/CafeCountersAndAppliances';
import { CafeSeatingAndTables } from './furnitureTextures/CafeSeatingAndTables';
import { CafeDecorAndPlants } from './furnitureTextures/CafeDecorAndPlants';

export class CafeFurnitureTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawCafeInteriorTextures(textures);
  }

  public static drawCafeInteriorTextures(textures: Phaser.Textures.TextureManager) {
    CafeFloorsAndWalls.draw(textures);
    CafeCountersAndAppliances.draw(textures);
    CafeSeatingAndTables.draw(textures);
    CafeDecorAndPlants.draw(textures);
  }
}
