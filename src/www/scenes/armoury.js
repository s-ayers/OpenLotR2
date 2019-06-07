export default class Armoury extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Armoury' });
        this.color = 'yellow';


    }

    preload ()
    {
        // this.load.image('ArmouryBackground', 'themes/classic/scenes/armoury/background.png');
        //  this.load.atlas('redArms', 'themes/classic/scenes/armoury/red/arms.png', 'themes/classic/scenes/armoury/red/arms.json');
    }
    init(data) {
        console.log(Player);
        this.color = Player.sheild;
    }

    create ()
    {
        this.add.image(320, 240, 'ArmouryBackground');




        this.add.tileSprite(48, 438, 0, 0, this.color + 'Arms', 'peasant');

        this.add.tileSprite(107, 266, 0, 0, this.color + 'Arms', 'crossbow');
        this.add.tileSprite(48+76, 438, 0, 0, this.color + 'Arms', 'crossbowman');

        this.add.tileSprite(185, 282, 0, 0, this.color + 'Arms', 'mace');
        this.add.tileSprite(48+2*76, 438, 0, 0, this.color + 'Arms', 'maceman');

        this.add.tileSprite(244, 252, 0, 0, this.color + 'Arms', 'pike');
        this.add.tileSprite(48+3*76, 438, 0, 0, this.color + 'Arms', 'pikeman');

        this.add.tileSprite(322, 270, 0, 0, this.color + 'Arms', 'mail');
        this.add.tileSprite(48+4*76, 438, 0, 0, this.color + 'Arms', 'horseman');

        this.add.tileSprite(48+5*76, 280, 0, 0, this.color + 'Arms', 'bow');
        this.add.tileSprite(48+5*76, 438, 0, 0, this.color + 'Arms', 'bowman');

        this.add.tileSprite(530, 280, 0, 0, this.color + 'Arms', 'sword');
        this.add.tileSprite(48+6*76, 438, 0, 0, this.color + 'Arms', 'swordman');

        // this.add.tileSprite(48, 200, 0, 0, this.color + 'Arms', 'peasantIcon');
        // this.add.tileSprite(107, 200, 0, 0, this.color + 'Arms', 'crossbowIcon');
        // this.add.tileSprite(185, 200, 0, 0, this.color + 'Arms', 'maceIcon');
        // this.add.tileSprite(244, 200, 0, 0, this.color + 'Arms', 'pikeIcon');
        // this.add.tileSprite(322, 200, 0, 0, this.color + 'Arms', 'mailIcon');
        // this.add.tileSprite(48+5*76, 200, 0, 0, this.color + 'Arms', 'bowIcon');
        // this.add.tileSprite(530, 200, 0, 0, this.color + 'Arms', 'swordIcon');

        // this.scene.pause();
    }
}