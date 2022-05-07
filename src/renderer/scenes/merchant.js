export default class Merchant extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Merchant', active: true });
    }

    preload ()
    {
        this.load.image('MerchantBackground', 'images/backgrounds/Merchant.png');
    }

    create ()
    {
        this.add.image(320, 240, 'MerchantBackground');
    }
}