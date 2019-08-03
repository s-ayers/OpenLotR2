export default class Castle extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Castle', active: true });
    }

    preload ()
    {
        this.load.image('CastleBuildBackground', 'images/scenes/CastleBuild/Background.png');
        this.load.atlas('CastleBuildAtlasPics', 'images/scenes/CastleBuild/pics.png', 'images/scenes/CastleBuild/pics.json');
        this.load.atlas('CastleBuildAtlasBits', 'images/scenes/CastleBuild/bits.png', 'images/scenes/CastleBuild/bits.json');
    }

    create ()
    {
        this.add.image(320, 240, 'CastleBuildBackground');
        this.add.tileSprite(318, 120, 320, 200, 'CastleBuildAtlasPics', 'castle1');
        this.add.tileSprite(70, 120, 105, 105, 'CastleBuildAtlasBits', 'castle1blueprint');

        this.add.tileSprite(55, 348, 60, 60, 'CastleBuildAtlasBits', 'castle1outline');

        this.add.tileSprite(149, 354, 100, 130, 'CastleBuildAtlasBits', 'castle2outline');
        this.add.tileSprite(249, 323, 50, 70, 'CastleBuildAtlasBits', 'castle3outline');

        this.add.tileSprite(367, 328, 110, 110, 'CastleBuildAtlasBits', 'castle4outline');

        this.add.tileSprite(537, 345, 150, 120, 'CastleBuildAtlasBits', 'castle5outline');

        this.add.tileSprite(50, 283, 15, 26, 'CastleBuildAtlasBits', 'castleSelect');
    }
}
