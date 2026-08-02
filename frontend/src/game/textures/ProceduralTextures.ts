import Phaser from 'phaser';
import { TerrainTextures } from './environment/TerrainTextures';
import { VegetationTextures } from './environment/VegetationTextures';
import { StructureTextures } from './environment/StructureTextures';
import { CafeBuildingTextures } from './cafe/CafeBuildingTextures';
import { CafeFurnitureTextures } from './cafe/CafeFurnitureTextures';
import { CafePropTextures } from './cafe/CafePropTextures';
import { PlayerTextures } from './character/PlayerTextures';
import { PetTextures } from './character/PetTextures';

export class ProceduralTextures {
  public static createAll(scene: Phaser.Scene) {
    const textures = scene.textures;

    TerrainTextures.create(textures);
    VegetationTextures.create(textures);
    StructureTextures.create(textures);
    CafeBuildingTextures.create(textures);
    CafeFurnitureTextures.create(textures);
    CafePropTextures.create(textures);
    PlayerTextures.create(textures);
    PetTextures.create(textures);
  }

  public static drawCircleTexture(textures: Phaser.Textures.TextureManager, key: string, size: number, colorStr: string, blur: boolean) {
    TerrainTextures.drawCircleTexture(textures, key, size, colorStr, blur);
  }

  public static drawGrassTile(textures: Phaser.Textures.TextureManager, key: string, bgColor: string, flowers: Array<{ x: number; y: number; c: string }>) {
    TerrainTextures.drawGrassTile(textures, key, bgColor, flowers);
  }

  public static drawDirtTile(textures: Phaser.Textures.TextureManager) {
    TerrainTextures.drawDirtTile(textures);
  }

  public static drawWaterTile(textures: Phaser.Textures.TextureManager, key: string, baseColor: string, waveColor: string) {
    TerrainTextures.drawWaterTile(textures, key, baseColor, waveColor);
  }

  public static drawRiverBankTile(textures: Phaser.Textures.TextureManager, key: string, isWest: boolean) {
    TerrainTextures.drawRiverBankTile(textures, key, isWest);
  }

  public static drawBridgeWoodTile(textures: Phaser.Textures.TextureManager) {
    TerrainTextures.drawBridgeWoodTile(textures);
  }

  public static drawLilyPadTile(textures: Phaser.Textures.TextureManager) {
    TerrainTextures.drawLilyPadTile(textures);
  }

  public static drawZenGravelTile(textures: Phaser.Textures.TextureManager) {
    TerrainTextures.drawZenGravelTile(textures);
  }

  public static drawCobblestoneTile(textures: Phaser.Textures.TextureManager) {
    TerrainTextures.drawCobblestoneTile(textures);
  }

  public static drawSakuraTreeProp(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawSakuraTreeProp(textures);
  }

  public static drawBambooProp(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawBambooProp(textures);
  }

  public static drawDevGardenArch(textures: Phaser.Textures.TextureManager) {
    StructureTextures.drawDevGardenArch(textures);
  }

  public static drawStreetLampProp(textures: Phaser.Textures.TextureManager) {
    StructureTextures.drawStreetLampProp(textures);
  }

  public static drawCodeCafeStorefront(textures: Phaser.Textures.TextureManager) {
    CafeBuildingTextures.drawCodeCafeStorefront(textures);
  }

  public static drawCafeConcretePatio(textures: Phaser.Textures.TextureManager) {
    CafeBuildingTextures.drawCafeConcretePatio(textures);
  }

  public static drawFlowerPotProp(textures: Phaser.Textures.TextureManager) {
    CafePropTextures.drawFlowerPotProp(textures);
  }

  public static drawMenuBoardProp(textures: Phaser.Textures.TextureManager) {
    CafePropTextures.drawMenuBoardProp(textures);
  }

  public static drawCafeUmbrellaTable(textures: Phaser.Textures.TextureManager) {
    CafePropTextures.drawCafeUmbrellaTable(textures);
  }

  public static drawDuckProp(textures: Phaser.Textures.TextureManager) {
    PetTextures.drawDuckProp(textures);
  }

  public static drawPetalParticle(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawPetalParticle(textures);
  }

  public static drawFireflyParticle(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawFireflyParticle(textures);
  }

  public static drawTreeProp(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawTreeProp(textures);
  }

  public static drawFountainProp(textures: Phaser.Textures.TextureManager) {
    StructureTextures.drawFountainProp(textures);
  }

  public static drawBenchProp(textures: Phaser.Textures.TextureManager, key: string, w: number, h: number, isHorizontal: boolean) {
    StructureTextures.drawBenchProp(textures, key, w, h, isHorizontal);
  }

  public static drawLeaderboardTree(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawLeaderboardTree(textures);
  }

  public static drawEmoteIcon(textures: Phaser.Textures.TextureManager, key: string, emoji: string) {
    PlayerTextures.drawEmoteIcon(textures, key, emoji);
  }

  public static drawCharacterSpritesheet(
    textures: Phaser.Textures.TextureManager,
    tier: string,
    outfitColor: string,
    outfitShadowColor: string,
    hairColor: string,
    isCosmic: boolean
  ) {
    PlayerTextures.drawCharacterSpritesheet(textures, tier, outfitColor, outfitShadowColor, hairColor, isCosmic);
  }

  public static drawStarTreeStages(textures: Phaser.Textures.TextureManager) {
    VegetationTextures.drawStarTreeStages(textures);
  }

  public static drawFenceTextures(textures: Phaser.Textures.TextureManager) {
    StructureTextures.drawFenceTextures(textures);
  }

  public static drawCafeInteriorTextures(textures: Phaser.Textures.TextureManager) {
    CafeFurnitureTextures.drawCafeInteriorTextures(textures);
  }
}
