export default class Campaign extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Campaign', active: false });
    }

    preload ()
    {

        this.load.image('England', 'England.map.png');
        this.load.atlas('MiscCityAtlas', 'images/scenes/MainScene/misc_city.png', 'images/scenes/MainScene/misc_city.json');

    this.load.json('map', 'tests/iso/isometric-grass-and-water.json');
    this.load.spritesheet('tiles', 'tests/iso/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });

    }

    create ()
    {
        this.cameras.main.setViewport(0, 0, 640, 480).setBounds(0, 0, 7424, 3840).setName('main');;

    // The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
        this.miniCam = this.cameras.add(485, 30, 124, 124).setZoom(0.035).setName('mini');
        this.miniCam.setBackgroundColor(0x002244);
        // this.miniCam.scrollX = 700;
        // this.miniCam.scrollY = 1000;
        this.miniCam.centerToBounds();

        this.buildMap();

        this.buildPanel();

        this.miniCam.ignore(this.panel);


        // this.cameras.main.scrollX = 450;
        // this.cameras.main.scrollY = 250;

    }

    buildPanel () {

        this.miniMap = this.add.tileSprite(0, 0, 0, 0, 'MiscCityAtlas', 'miniMap').setOrigin(0);
        this.peoplePane = this.add.tileSprite(0, 132, 0, 0, 'MiscCityAtlas', 'peoplePane').setOrigin(0);



        this.healthBest = this.add.tileSprite(81, 187, 0, 0, 'MiscCityAtlas', 'healthBest');
        // this.healthGood = this.add.tileSprite((566-(14/2)), (240-(59/2)), 0, 0, 'MiscCityAtlas', 'healthGood');
        // this.healthOk = this.add.tileSprite((566-(14/2)), (240-(59/2)), 0, 0, 'MiscCityAtlas', 'healthOk');
        // this.healthBad = this.add.tileSprite((566-(14/2)), (240-(59/2)), 0, 0, 'MiscCityAtlas', 'healthBad');
        // this.healthWorst = this.add.tileSprite((566-(14/2)), (240-(59/2)), 0, 0, 'MiscCityAtlas', 'healthWorst');

        this.labourPane = this.add.tileSprite(81, 316, 0, 0, 'MiscCityAtlas', 'labourPane');

        this.labourGauge = this.add.tileSprite(84, (295-(33/2))-24, 0, 0, 'MiscCityAtlas', 'labourGauge');
        this.labourGaugeLess = this.add.tileSprite(84, (295-(33/2))-24, 0, 0, 'MiscCityAtlas', 'labourGaugeLess');

        this.labourCow = this.add.tileSprite((521-(37/2))-478, (332-(24/2))-24, 0, 0, 'MiscCityAtlas', 'labourCow');

        this.labourCowLess = this.add.tileSprite((521-(37/2))-478, (332-(24/2))-24, 0, 0, 'MiscCityAtlas', 'labourCowLess');

        this.labourCowMore = this.add.tileSprite((521-(37/2))-478, (332-(24/2))-24, 0, 0, 'MiscCityAtlas', 'labourCowMore');

        this.labourWheat = this.add.tileSprite((522-(36/2))-478, (390-(27/2))-24, 0, 0, 'MiscCityAtlas', 'labourWheat');

        this.labourWheatLess = this.add.tileSprite((522-(36/2))-478, (390-(27/2))-24, 0, 0, 'MiscCityAtlas', 'labourWheatLess');
        this.labourWheatMore = this.add.tileSprite((522-(36/2))-478, (390-(27/2))-24, 0, 0, 'MiscCityAtlas', 'labourWheatMore');





        this.labourLumber = this.add.tileSprite((632-(37/2))-478, (331-(22/2))-24, 0, 0, 'MiscCityAtlas', 'labourLumber');

        // this.labourStone = this.add.tileSprite((625-(25/2)), (396-(29/2)), 0, 0, 'MiscCityAtlas', 'labourStone');
        // this.labourIron = this.add.tileSprite((625-(25/2)), (396-(29/2)), 0, 0, 'MiscCityAtlas', 'labourIron');

        this.labourCastle = this.add.tileSprite((625-(25/2))-478, (396-(29/2))-24, 0, 0, 'MiscCityAtlas', 'labourCastle');
        this.labourCastleLess = this.add.tileSprite((625-(25/2))-478, (396-(29/2))-24, 0, 0, 'MiscCityAtlas', 'labourCastleLess');

        this.actionButtons = this.add.tileSprite((640-(162/2))-478, (480-(30/2)-20)-24, 0, 0, 'MiscCityAtlas', 'actionButtons');


        this.endTurn = this.add.tileSprite(0, (480-24), 0, 0, 'MiscCityAtlas', 'endTurn').setOrigin(0,1);
    // define you region
    // var topLeftQuarter = new Phaser.Rectangle(0,0,game.width/2,game.height/2)//listen for pointers
    // game.input.onDown.add(handlePointerDown)//handle a touch/click
    // handlePointerDown = function(pointer){    //this is the test, contains test for a point belonging to a rect definition
    // var inside = topLeftQuarter.contains(pointer.x,pointer.y)    //do whatever with the result
    //  console.log('pointer is inside region top left quarter', inside)}
    var graphics = this.add.graphics();
    var rect = new Phaser.Geom.Rectangle(930, 550, 32, 32);
    graphics.lineStyle(5, 0);   // color: 0xRRGGBB
    graphics.strokeRectShape(rect);

            this.panel = this.add.container(478, 24, [
                this.miniMap,
                this.peoplePane,
                this.healthBest,
                this.labourPane,
                this.labourGauge,
                this.labourGaugeLess,
                this.labourCow,
                this.labourCowLess,
                this.labourCowMore,
                this.labourWheat,
                this.labourWheatLess,
                this.labourWheatMore,
                this.labourLumber,
                this.labourCastle,
                this.labourCastleLess,

                this.actionButtons,
                this.endTurn
                ]).setScrollFactor(0);

            // this.panel.scrollFactor = 0;

        }

        buildMap ()
        {
            this.map = this.add.container(0, 24);

            //  Parse the data out of the map
            var data = this.cache.json.get('map');

            var tilewidth = data.tilewidth;
            var tileheight = data.tileheight;

            var tileWidthHalf = tilewidth / 2;
            var tileHeightHalf = tileheight / 2;

            var layer = data.layers[0].data;

            var mapwidth = data.layers[0].width;
            var mapheight = data.layers[0].height;

            var centerX = mapwidth * tileWidthHalf;
            var centerY = 16;

            var i = 0;
            var that = this;

            for (var y = 0; y < mapheight; y++)
            {
                for (var x = 0; x < mapwidth; x++)
                {
                    var id = layer[i] - 1;

                    var tx = (x - y) * tileWidthHalf;
                    var ty = (x + y) * tileHeightHalf;

                    var tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id);

                    tile.depth = centerY + ty;
                    this.map.add(tile);

                    i++;
                }
            }
            this.map.setInteractive(new Phaser.Geom.Rectangle(0, 0, 7424, 4000), Phaser.Geom.Rectangle.Contains);
        this.map.on('pointerdown', function (pointer, localX, localY, event) {

            console.log('x: ' + pointer.x);
            console.log('y:' + pointer.y);
            console.log('local-x: ' + localX);
            console.log('local-y:' + localY);
            console.log(that.cameras);
            that.cameras.main.centerOn(localX, localY);

        });

        var england = this.add.image(0, 30, 'England');
        // .setOrigin(0);


        this.map.add(england);

        }

}