export class OrginalOrRoyalMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'OrginalOrRoyalMenu' });
    }

    preload() {
        this.lineBottomColor = '0xB8B8B8';
        this.lineTopColor = '0x4C4C4C';

    }

    create() {
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

        this.OriginalOrSeige();
        // this.SelectShield();


    }



    drawBox(x, y, local) {
        local[local.length] = this.add.line(0, 0, x + 1, y, x + 191, y, this.lineTopColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x + 191, y + 1, x + 191, y + 23, this.lineTopColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x, y, x, y + 24, this.lineBottomColor).setOrigin(0);
        local[local.length] = this.add.line(0, 0, x, y + 24, x + 191, y + 24, this.lineBottomColor).setOrigin(0);
    }

    OriginalOrSeige() {

        this.panel.x = 68;
        this.panel.y = 56;
        this.panel.displayHeight = 117;
        this.panel.displayWidth = 504;

        var localText = [],
            that = this;

        // Original 
        this.drawBox(110, 116, localText);
        // Seige
        this.drawBox(366, 116, localText);


        localText[localText.length] = this.add.text(98, 56 + 10, 'Expansion pack installed, choose:-', this.largeFont).setOrigin(0);

        localText[localText.length] = this.add.text(110, 120, 'Orginal campaign', this.smallFont).setOrigin(0).
            setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                for (var x in localText) {
                    localText[x].destroy();
                }
                that.SelectShield();
            });;
        localText[localText.length] = this.add.text(365, 120, 'The new campaign', this.smallFont).setOrigin(0).
            setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

                that.scene.start('ShieldMenu');
            });;
    }

    SinglePlayer() {

        this.panel.x = 180;
        this.panel.y = 26;
        this.panel.displayHeight = 277;
        this.panel.displayWidth = 280;

        var localText = [],
            that = this;

        // Play now
        this.drawBox(224, 92, localText);
        //Load a game
        this.drawBox(224, 127, localText);
        // Skirmish
        this.drawBox(224, 163, localText);
        // Customer game
        this.drawBox(224, 199, localText);
        // back
        this.drawBox(224, 235, localText);


        localText[localText.length] = this.add.text(250, 45, 'Your Options', this.largeFont);

        localText[localText.length] = this.add.text(273, 92, 'Play Now!', this.smallFont).
            setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                for (var x in localText) {
                    localText[x].destroy();
                }
                that.OriginalOrSeige();
            });

        localText[localText.length] = this.add.text(266, 127, 'Load a game', this.smallFont);

        localText[localText.length] = this.add.text(280, 163, 'Skirmish!', this.smallFont);

        localText[localText.length] = this.add.text(264, 199, 'Custom game', this.smallFont).setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.scene.start('CustomGame');
        });



        localText[localText.length] = this.add.text(295, 235, 'Back', this.smallFont).style.setAlign('center');
    }

    MultiPlayer() {

    }
}
