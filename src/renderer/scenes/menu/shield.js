export class ShieldMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'ShieldMenu' });

        this.name = '';
    }

    preload() {
        this.lineBottomColor = '0xB8B8B8';
        this.lineTopColor = '0x4C4C4C';

    }

    create() {
        // let input = document.createElement("input");

        // window.document.body.append(input);
        this.add.image(0, 0, 'MainBackground').setOrigin(0);
        this.panel = this.add.tileSprite(180, 16, 0, 0, 'Panels2Atlas', 'stonePanel').setOrigin(0);

        this.largeFont = {
            font: '32px Gothic',
            stroke: '#000000',
            strokeThickness: 0,
            fill: '#000000',
            align: 'center'
        };
        this.smallFont = {
            font: '20px Gothic',
            stroke: '#000000',
            strokeThickness: 0,
            fill: '#000000',
            align: 'center'
        };


        this.SelectShield();
        // this.SelectShield();


    }


    drawBox(x, y, local) {
        local[local.length] = this.add.line(0, 0, x + 1, y, x + 191, y, this.lineTopColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x + 191, y + 1, x + 191, y + 23, this.lineTopColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x, y, x, y + 24, this.lineBottomColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x, y + 24, x + 191, y + 24, this.lineBottomColor).setOrigin(0);
    }

    SelectShield() {
        // this.panel.angle = 90;
        this.panel.x = 84;
        this.panel.y = 16;
        this.panel.displayHeight = 250;
        this.panel.displayWidth = 490;

        var localText = [],
            shields = {},
            that = this;

        // Original 
        this.drawBox(110, 215, localText);
        // Seige
        this.drawBox(336, 215, localText);

        localText[localText.length] = this.add.text(140, 40, 'Choose your title and shield.', this.largeFont).setOrigin(0);

        localText[localText.length] = this.add.text(185, 215, 'Back', this.smallFont).setOrigin(0).
            setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                for (var x in localText) {
                    localText[x].destroy();
                }
                that.SelectShield();
            });

        localText[localText.length] = this.add.text(395, 215, 'Continue', this.smallFont).setOrigin(0).
            setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                for (var x in localText) {
                    localText[x].destroy();
                }
                that.scene.start('MainScene');
            });


        this.add.tileSprite(320, 100, 0, 0, 'Panels2Atlas', 'stoneInput');
        //.setInteractive().on('keypress', function (pointer, localX, localY, event) {
        //  console.log(event);
        //});

        this.input.keyboard.on('keydown', function (event) {
            console.log(event.key);

            if (event !== 'undefined') {
                let key = event.key
                if (key === 'Backspace') {
                    that.name = that.name.slice(0, -1);
                }
                else if (key === 'undefined') {

                } else if (key.length === 1) {
                    that.name += key;
                }

                console.log(that.name);

            }



        });

        shields.red = this.add.tileSprite(150, 140 + 30, 0, 0, 'Panels2Atlas', 'redActive');
        shields.yellow = this.add.tileSprite(235, 140 + 30, 0, 0, 'Panels2Atlas', 'yellowActive');
        shields.black = this.add.tileSprite(288 + 30, 140 + 30, 0, 0, 'Panels2Atlas', 'blackActive');
        shields.purple = this.add.tileSprite(288 + 120, 140 + 30, 0, 0, 'Panels2Atlas', 'purpleActive');
        shields.blue = this.add.tileSprite(288 + 210, 140 + 30, 0, 0, 'Panels2Atlas', 'blueActive');
    }

}
