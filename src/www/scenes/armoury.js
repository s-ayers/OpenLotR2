export default class Armoury extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Armoury' });
        this.color = 'yellow';


    }

    preload ()
    {
        this.load.bitmapFont('font_09', 'themes/classic/system/font_09.png', 'themes/classic/system/font_09.xml');


        // this.load.image('ArmouryBackground', 'themes/classic/scenes/armoury/background.png');
        //  this.load.atlas('redArms', 'themes/classic/scenes/armoury/red/arms.png', 'themes/classic/scenes/armoury/red/arms.json');
        // this.load.multiatlas('armoryTorch', 'themes/classic/scenes/armoury/torch.json');

    }
    init(data) {
        console.log(Player);
        console.log(data);
        this.color = Player.sheild;
    }

    create ()
    {
        this.add.image(320, 240, 'ArmouryBackground');

        var torch_l = this.add.sprite(154, 119, 'armoryTorch', 'torch_l_0.png').setOrigin(0,0);
        var torch_r = this.add.sprite(410, 118, 'armoryTorch', 'torch_r_0.png').setOrigin(0,0);


        this.add.tileSprite(48, 438, 0, 0, this.color + 'Arms', 'peasant');

        if (Player.armory.crossbow) {
            this.add.tileSprite(107, 266, 0, 0, this.color + 'Arms', 'crossbow');
            this.add.tileSprite(48+76, 438, 0, 0, this.color + 'Arms', 'crossbowman');
        }

        if (Player.armory.mace) {
            this.add.tileSprite(185, 282, 0, 0, this.color + 'Arms', 'mace');
            this.add.tileSprite(48+2*76, 438, 0, 0, this.color + 'Arms', 'maceman');
        }

        if (Player.armory.pike) {
            this.add.tileSprite(244, 252, 0, 0, this.color + 'Arms', 'pike');
            this.add.tileSprite(48+3*76, 438, 0, 0, this.color + 'Arms', 'pikeman');
        }

        if (Player.armory.horse) {
            this.add.tileSprite(322, 270, 0, 0, this.color + 'Arms', 'mail');
            this.add.tileSprite(48+4*76, 438, 0, 0, this.color + 'Arms', 'horseman');
        }

        if (Player.armory.bow) {
            this.add.tileSprite(48+5*76, 280, 0, 0, this.color + 'Arms', 'bow');
            this.add.tileSprite(48+5*76, 438, 0, 0, this.color + 'Arms', 'bowman');
        }

        if (Player.armory.sword) {
            this.add.tileSprite(530, 280, 0, 0, this.color + 'Arms', 'sword');
            this.add.tileSprite(48+6*76, 438, 0, 0, this.color + 'Arms', 'swordman');
        }

        // animation
        var frameNames1 = this.anims.generateFrameNames('armoryTorch', { start: 0, end: 12, prefix:'torch_l_', suffix:'.png' });
        this.anims.create({ key: 'burnLtorch', frames: frameNames1, frameRate: 10, repeat: -1 });
        torch_l.anims.play('burnLtorch');

        var frameNames2 = this.anims.generateFrameNames('armoryTorch', { start: 0, end: 12, prefix:'torch_r_', suffix:'.png' });
        this.anims.create({ key: 'burnRtorch', frames: frameNames2, frameRate: 10, repeat: -1 });
        torch_r.anims.play('burnRtorch');

        this.add.bitmapText(100, 200, 'font_09', 'abcdefghijklmnopqrstuvwxyz', 9, 1 ).setLetterSpacing(5);
        this.add.bitmapText(100, 300, 'font_09', 'Fuck\nYou', 9, 1 ); // .setTint(0x000000);

    }
}