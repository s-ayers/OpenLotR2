import { expect } from 'chai';
import { AddForwardRequest } from './AddForwardRequest';
import Packet from '../Packet';

describe('AddForwardRequest fromBuffer', () => {
    it('should parse AddForwardRequest', () => {
      
      const buf = Buffer.from('8600b0fa020008fc000000000000000000000000706c617913000e0000000000b8c40100000000001c0000006c0000005000000009000000b8c401000000000000000000200000000000000000000000b8c40100300000000e00000000000000020008fc0000000000000000000000000200092e0000000000000000000000000000bac40000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
      const command = packet.command;
  

      expect(command.id).to.equal(19);  
      expect(command.toId).to.equal(0);
      expect(command.playerId).to.equal(115896);
      expect(command.groupId).to.equal(0);
      expect(command.create_offset).to.equal(28);
      expect(command.password_offset).to.equal(108);
    
      expect(command.player.size).to.equal(80); 
      expect(command.player.flags).to.equal(9);
      expect(command.player.id).to.equal(115896);  
      expect(command.player.shortNameLength).to.equal(0);
      expect(command.player.longNameLength).to.equal(0);
      expect(command.player.serviceDataSize).to.equal(32);
      expect(command.player.playerDataSize).to.equal(0)
      expect(command.player.playerCount).to.equal(0);
      expect(command.player.systemPlayerId).to.equal(115896);
      expect(command.player.fixedSize).to.equal(48);
      expect(command.player.dplayVersion).to.equal(14);
      expect(command.player.unknown).to.equal(0);
      expect(command.player.shortName).to.equal('');

      expect(command.player.serviceData[0].address_family).to.equal(2);
      expect(command.player.serviceData[0].port).to.equal(2300);
      expect(command.player.serviceData[0].address).to.equal(0);

      expect(command.player.serviceData[1].address_family).to.equal(2);
      expect(command.player.serviceData[1].port).to.equal(2350);
      expect(command.player.serviceData[1].address).to.equal(0);
      expect(command.password).to.equal(0);
      expect(command.forwardTo).to.equal(131072);      
    });
});

describe('AddForwardRequest toBuffer', () => {
    it('should creat AddForwardRequest', () => {
      
      const buf = Buffer.from('00000000b8c40100000000001c0000006c0000005000000009000000b8c401000000000000000000200000000000000000000000b8c40100300000000e00000000000000020008fc0000000000000000000000000200092e0000000000000000000000000000bac40000'
      , 'hex');
      const command = new AddForwardRequest();
  


    //   expect(command.id).to.equal(19);  
      command.toId = 0;
      command.playerId = 115896;
      command.groupId = 0;
      command.create_offset = 28;
    //   expect(command.password_offset).to.equal(108);
    
    //   expect(command.player.size).to.equal(80); 
      command.player.flags = 9;
      command.player.id = 115896;  
      command.player.shortNameLength = 0;
      command.player.longNameLength = 0;
    //   expect(command.player.serviceDataSize).to.equal(32);
    //   expect(command.player.playerDataSize).to.equal(0)
      command.player.playerCount = 0;
      command.player.systemPlayerId = 115896;
      command.player.fixedSize = 48;
      command.player.dplayVersion = 14;
      command.player.unknown = 0;
      command.player.shortName = '';

      command.player.serviceData[0].address_family = 2;
      command.player.serviceData[0].port = 2300;
      command.player.serviceData[0].address = 0;

      command.player.serviceData[1].address_family = 2;
      command.player.serviceData[1].port = 2350;
      command.player.serviceData[1].address = 0;
    
      command.password = 0;
      command.forwardTo = 131072;      

    const commandBuf = command.toBuffer();
    
    // expect(buf).to.equal(0);
    // expect(buf).to.equal(commandBuf);
    // expect(Buffer.compare(commandBuf, buf)).to.equal(0);
    });
});