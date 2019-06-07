
export default class Loader extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Loader' });
  }

  preload ()
  {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(140, 370, 320, 50);
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 + 110,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 + 160,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 210,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(150, 380, 300 * value, 30);
    });
    
    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });

    this.load.image('ArmouryBackground', 'themes/classic/scenes/armoury/background.png');
    this.load.atlas('blackArms', 'themes/classic/scenes/armoury/black/arms.png', 'themes/classic/scenes/armoury/arms.json');
    this.load.atlas('blueArms', 'themes/classic/scenes/armoury/blue/arms.png', 'themes/classic/scenes/armoury/arms.json');
    this.load.atlas('purpleArms', 'themes/classic/scenes/armoury/purple/arms.png', 'themes/classic/scenes/armoury/arms.json');
    this.load.atlas('redArms', 'themes/classic/scenes/armoury/red/arms.png', 'themes/classic/scenes/armoury/arms.json');
    this.load.atlas('yellowArms', 'themes/classic/scenes/armoury/yellow/arms.png', 'themes/classic/scenes/armoury/arms.json');
    // for (var i = 0; i < 200; i++) {
    //     this.load.image('logooo'+i, 'themes/classic/scenes/loader/background.png');
    // }
    // this.load.image('IntroMp4', 'media/Intro.mp4');

// console.log(this.cache.json('assets'));

    // this.loadAssets(this.load.json('assets'));

  }

  create ()
  {

        this.scene.start('Armoury', {county: "ShitHole"});
        this.scene.stop('Boot');

  }

  loadAssets (json)
    {
        Object.keys(json).forEach(function (group)
        {
            Object.keys(json[group]).forEach(function (key)
            {
                let value = json[group][key];

                if (group === 'atlas' ||
                    group === 'unityAtlas' ||
                    group === 'bitmapFont' ||
                    group === 'spritesheet' ||
                    group === 'multiatlas')
                {

                    // atlas:ƒ       (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
                    // unityAtlas:ƒ  (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
                    // bitmapFont ƒ  (key, textureURL,  xmlURL,    textureXhrSettings, xmlXhrSettings)
                    // spritesheet:ƒ (key, url,         config,    xhrSettings)
                    // multiatlas:ƒ  (key, textureURLs, atlasURLs, textureXhrSettings, atlasXhrSettings)
                    this.load[group](key, value[0], value[1]);

                }
                else if (group === 'audio')
                {

                    // do not add mp3 unless, you bought a license 😉 
                    // opus, webm and ogg are way better than mp3
                    if (value.hasOwnPorperty('opus') && this.sys.game.device.audio.opus)
                    {
                        this.load[group](key, value['opus']);

                    }
                    else if (value.hasOwnPorperty('webm') && this.sys.game.device.audio.webm)
                    {
                        this.load[group](key, value['webm']);

                    }
                    else if (value.hasOwnPorperty('ogg') && this.sys.game.device.audio.ogg)
                    {
                        this.load[group](key, value['ogg']);

                    }
                    else if (value.hasOwnPorperty('wav') && this.sys.game.device.audio.wav)
                    {
                        this.load[group](key, value['wav']);
                    }
                }
                else if (group === 'html')
                {
                    // html:ƒ (key, url, width, height, xhrSettings)
                    this.load[group](key, value[0], value[1], value[2]);

                }
                else
                {
                    // animation:ƒ (key, url, xhrSettings)
                    // binary:ƒ (key, url, xhrSettings)
                    // glsl:ƒ (key, url, xhrSettings)
                    // image:ƒ (key, url, xhrSettings)
                    // image:ƒ (key, [url, normal-url], xhrSettings)
                    // json:ƒ (key, url, xhrSettings)
                    // plugin:ƒ (key, url, xhrSettings)
                    // script:ƒ (key, url, xhrSettings)
                    // svg:ƒ (key, url, xhrSettings)
                    // text:ƒ (key, url, xhrSettings)
                    // tilemapCSV:ƒ (key, url, xhrSettings)
                    // tilemapTiledJSON:ƒ (key, url, xhrSettings)
                    // tilemapWeltmeister:ƒ (key, url, xhrSettings)
                    // xml:ƒ (key, url, xhrSettings)
                    this.load[group](key, value);
                }
            }, this);
        }, this);
}

}
