export default class CustomGame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'CustomGame', active: false });

    }

    preload ()
    {
        this.load.image('CustomGameBackground', 'images/scenes/CustomGame/Background.png');
    }

    create ()
    {
        this.add.image(320, 240, 'CustomGameBackground');


    }
}