export default class GreatestNoble extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'GreatestNoble', active: true });
    }

    preload ()
    {
        this.load.image('GreatestNobleBackground', 'images/backgrounds/GreatestNoble.png');
    }

    create ()
    {
        this.add.image(320, 240, 'GreatestNobleBackground');
    }
}