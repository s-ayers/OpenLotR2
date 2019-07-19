import { expect } from 'chai';
import { CreatePlayer } from "./CreatePlayer";

describe('Player fromBuffer', () => {
    it('should parse Player', () => {
      
      const buf = Buffer.from('00000000b9c40100000000001c000000000000005a00000008000000b9c401000a00000000000000200000000000000000000000b8c40100300000000e000000000000004e6f626c656d616e0000020008fc0000000000000000000000000200092e000000000000000000000000000000000000'
      , 'hex');
      const createPlayer = new CreatePlayer();
      createPlayer.fromBuffer(buf, 0);
  

      expect(createPlayer.toId).to.equal(0);  
      expect(createPlayer.playerId).to.equal(115897);
      expect(createPlayer.groupId).to.equal(0);
      expect(createPlayer.offsetToPlayer).to.equal(28);
      expect(createPlayer.offsetToPassword).to.equal(0)
      expect(createPlayer.player.size).to.equal(90);
      expect(createPlayer.player.flags).to.equal(8);

      expect(createPlayer.player.id).to.equal(115897);  
      expect(createPlayer.player.shortNameLength).to.equal(10);
      expect(createPlayer.player.longNameLength).to.equal(0);
      expect(createPlayer.player.serviceDataSize).to.equal(32);
      expect(createPlayer.player.playerDataSize).to.equal(0)
      expect(createPlayer.player.playerCount).to.equal(0);
      expect(createPlayer.player.systemPlayerId).to.equal(115896);
      expect(createPlayer.player.fixedSize).to.equal(48);
      expect(createPlayer.player.dplayVersion).to.equal(14);
      expect(createPlayer.player.unknown).to.equal(0);
      expect(createPlayer.player.shortName).to.equal('Nobleman');

      expect(createPlayer.player.serviceData[0].address_family).to.equal(2);
      expect(createPlayer.player.serviceData[0].port).to.equal(2300);
      expect(createPlayer.player.serviceData[0].address).to.equal(0);

      expect(createPlayer.player.serviceData[1].address_family).to.equal(2);
      expect(createPlayer.player.serviceData[1].port).to.equal(2350);
      expect(createPlayer.player.serviceData[1].address).to.equal(0);


      expect(createPlayer.password).to.equal('');
    //   expect(createPlayer.dplayVersion).to.equal(14);
    //   expect(createPlayer.unknown).to.equal(0);
    //   expect(createPlayer.shortName).to.equal('Nobleman');

    //   expect(createPlayer.serviceData[0].address_family).to.equal(2);
    //   expect(createPlayer.serviceData[0].port).to.equal(2300);
    //   expect(createPlayer.serviceData[0].address).to.equal(0);

    //   expect(createPlayer.serviceData[1].address_family).to.equal(2);
    //   expect(createPlayer.serviceData[1].port).to.equal(2350);
    //   expect(createPlayer.serviceData[1].address).to.equal(0);
      
    });
});