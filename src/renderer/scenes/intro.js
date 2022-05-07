
export default class Intro extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Intro' });
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
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 200,
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

        // this.scene.time.delayedCall(2, function(){this.scene.start('Loader');}, null, this);  // delay in ms

        this.scene.start('Loader');},
    });
    
    // for (var i = 0; i < 5000; i++) {
    //     this.load.image('logo'+i, 'themes/classic/scenes/loader/background.png');
    // }
    this.load.image('IntroMp4', 'media/Intro.mp4');

  }

  create ()
  {
    //   this.add.image(320, 240, 'logo');
    // this.scene.start('Loader');
    //   this.input.once('pointerdown', function () {
    //       // this.scene.add('MainMenu', MainMenu, true);
    //       this.scene.start('MainMenu');
    //       // this.scene.transition({
    //       //     target: 'MainMenu',
    //       //     duration: 3000
    //       // });
    //   }, this);

      // this.scene.pause();
  }
}
