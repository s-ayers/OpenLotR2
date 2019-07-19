/*
 *  `app` module
 *  ============
 *
 *  Provides the game initialization routine.
 */

//  Import game instance configuration.
import "phaser";
import * as config from './config';
// import {default as video} from './video';

//  Boot the game.
export function boot() {
  return new Phaser.Game(config);
}

boot();