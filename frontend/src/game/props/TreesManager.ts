import Phaser from 'phaser';

export class TreesManager {
    public static spawnTree(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
        const tree = scene.add.image(x, y, 'tree_prop');
        tree.setOrigin(0.5, 0.85);
        tree.setDepth(y);
        scene.physics.add.existing(tree, true);

        const treeBody = tree.body as Phaser.Physics.Arcade.StaticBody;
        const tw = 10;
        const th = 15;
        const tox = 28;
        const toy = 56;

        treeBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
            const gameObject = this.gameObject as any;
            this.width = tw;
            this.height = th;
            this.halfWidth = tw / 2;
            this.halfHeight = th / 2;
            this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
            this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
            this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
            return this;
        };
        treeBody.updateFromGameObject();
        obstaclesGroup.add(tree);
    }

    public static spawnSakuraTree(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
        const tree = scene.add.image(x, y, 'sakura_tree_prop');
        tree.setOrigin(0.5, 0.85);
        tree.setDepth(y);
        scene.physics.add.existing(tree, true);

        const treeBody = tree.body as Phaser.Physics.Arcade.StaticBody;
        const tw = 10;
        const th = 15;
        const tox = 28;
        const toy = 56;

        treeBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
            const gameObject = this.gameObject as any;
            this.width = tw;
            this.height = th;
            this.halfWidth = tw / 2;
            this.halfHeight = th / 2;
            this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
            this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
            this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
            return this;
        };
        treeBody.updateFromGameObject();
        obstaclesGroup.add(tree);

        const petals = scene.add.particles(x, y - 40, 'sakura_petal', {
            scale: { start: 1, end: 0.3 },
            alpha: { start: 0.9, end: 0 },
            speedX: { min: -25, max: -5 },
            speedY: { min: 15, max: 35 },
            lifespan: 2500,
            frequency: 300,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(-20, -10, 40, 20) as any
            }
        });
        petals.setDepth(y + 10);
    }

    public static spawnBamboo(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
        const bamboo = scene.add.image(x, y, 'bamboo_prop');
        bamboo.setOrigin(0.5, 0.9);
        bamboo.setDepth(y);
        scene.physics.add.existing(bamboo, true);

        const bambooBody = bamboo.body as Phaser.Physics.Arcade.StaticBody;
        bambooBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
            const gameObject = this.gameObject as any;
            this.width = 12;
            this.height = 10;
            this.halfWidth = 6;
            this.halfHeight = 5;
            this.x = gameObject.x - 6;
            this.y = gameObject.y - 10;
            this.center.setTo(this.x + 6, this.y + 5);
            return this;
        };
        bambooBody.updateFromGameObject();
        obstaclesGroup.add(bamboo);
    }
}
