
export default class Boot extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Boot', active: true });
  }

  preload ()
  {    
    this.load.image('logo', 'themes/classic/scenes/loader/background.png');
  }

  create ()
  {
      this.add.image(320, 240, 'logo');
      this.load.json('assets', 'assets/json/assets.json');
    // this.add.image(0, 0, 'logo').setOrigin(0);

  //  this.on('complete', function(){
    
  //   var loader = this.scene.launch('Loader');
    
  //  })

    //   this.input.once('pointerdown', function () {
    //       // this.scene.add('MainMenu', MainMenu, true);
    //        this.scene.start('MainMenu');
            this.scene.transition({
              target: 'Loader',
              duration: 3000
            });
    //   }, this);

      // this.scene.pause();
  }
}
