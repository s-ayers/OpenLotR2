import { expect } from 'chai';
import { SuperEnumPlayersReply } from './SuperEnumPlayersReply';

describe('Player fromBuffer', () => {
    it('should parse Player', () => {
      
      const buf = Buffer.from('030000000000000086000000000000002400000074000000000000005000000044000000b8e478e9abf6eb42904ef534fae44b2cc048821c7297cf11b74f00c0df413ed105000000010000000000000000000000bac4000000000000000000000000000000000000000000004c6f726473322053657373696f6e310000001000000005000000b8c40100040000000e00000020020008fcc0a8014c00000000000000000200092ec0a8014c0000000000000000100000000f000000bac40100040000000e00000020020008fc0000000000000000000000000200092e000000000000000000000000100000000c000000bbc4010005000000bac401004e6f626c656d616e000020020008fc0000000000000000000000000200092e000000000000000000000000'
      , 'hex');
      const command = new SuperEnumPlayersReply();
      command.fromBuffer(buf, 0);
  

      expect(command.id).to.equal(41);  
      expect(command.player_count).to.equal(3);
      expect(command.group_count).to.equal(0);
      expect(command.packed_offset).to.equal(134);
      expect(command.shortcut_count).to.equal(0)
      expect(command.description_offset).to.equal(36);
      expect(command.name_offset).to.equal(116);
      expect(command.password_offset).to.equal(0);
      expect(command.description_length).to.equal(80);
      expect(command.flags).to.equal(68);
      expect(command.instance_guid).to.equal('b8e478e9abf6eb42904ef534fae44b2c');
      expect(command.game_guid).to.equal('c048821c7297cf11b74f00c0df413ed1');

    //   expect(command.serviceData[0].address_family).to.equal(2);
    //   expect(command.serviceData[0].port).to.equal(2300);
    //   expect(command.serviceData[0].address).to.equal(0);

    //   expect(command.serviceData[1].address_family).to.equal(2);
    //   expect(command.serviceData[1].port).to.equal(2350);
    //   expect(command.serviceData[1].address).to.equal(0);
      
    });
});