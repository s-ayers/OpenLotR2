import { expect } from 'chai';
import { PlayerInfo } from "./PlayerInfo";
import  {Lotr2Packet } from '../Packet';

describe('Command playerInfo fromBuffer', () => {
    it('should parse playerInfo', () => {
      
      const buf = Buffer.from('00012cac80b9c40100506c61796572312020202020202020202020202000000000636173746c6573000100000000000000'
      , 'hex');
      const playerInfo = new PlayerInfo();
      // playerInfo.fromBuffer(buf, 0);
  

      // expect(playerInfo.playerId).to.equal(76);
    //   expect(playerInfo.token).to.equal(64176);
    //   expect(playerInfo.action).to.equal('b9c40100');
    //   expect(playerInfo.commandId).to.equal(0);
    //   expect(playerInfo.version).to.equal(0);
      
//       expect(playerInfo.length).to.equal(101);
  
//       expect(playerInfo.sockAddr.address_family).to.equal(2);
//       expect(playerInfo.sockAddr.port).to.equal(2300);
//       expect(playerInfo.sockAddr.address).to.equal(0);

//       // expect(playerInfo.commandId).to.equal(2);
//       //   expect(playerInfo.command.id).to.equal(playerInfo.commandId);
//       //   expect(playerInfo.command instanceof EnumSessions).to.true;
      
    });
});

describe('Packet playerInfo fromBuffer', () => {
  it('should parse playerInfo', () => {
    
    const buf = Buffer.from('4c00b0fa020008fc000000000000000000000000b9c4010000000000012cac00b9c40100506c61796572312020202020202020202020202000000000636173746c6573000100000000000000'
    , 'hex');
    const packet = new Lotr2Packet();
    packet.fromBuffer(buf);

    expect(packet.commandId).equal(0);
    expect(packet.sockAddr.address_family).to.equal(2);
    expect(packet.sockAddr.address).to.equal(0);

    expect(packet.action).to.equal('b9c40100');
  //   expect(playerInfo.commandId).to.equal(0);
    expect(packet.version).to.equal(0);
    
      // expect(packet.command.customCommand).to.equal(115897);
      expect(packet.command.fromPlayer).to.equal(11283457);
      expect(packet.command.toPlayer).to.equal(115897);

      expect(packet.command.name).to.equal('Player1');
      expect(packet.command.castles).to.equal('castles');
//       expect(playerInfo.sockAddr.address).to.equal(0);

//       // expect(playerInfo.commandId).to.equal(2);
//       //   expect(playerInfo.command.id).to.equal(playerInfo.commandId);
//       //   expect(playerInfo.command instanceof EnumSessions).to.true;
    
  });
});


describe('Packet playerInfo fromBuffer', () => {
  it('should parse playerInfo', () => {
    
    const buf = Buffer.from('4c00b0fa020008fc000000000000000000000000b9c4010000000000012cac40b9c40100506c61796572312020202020202020202020202000000000636173746c6573000100000000000000'
    , 'hex');
    const packet = new Lotr2Packet();
    packet.fromBuffer(buf);

    expect(packet.commandId).equal(0);
    expect(packet.sockAddr.address_family).to.equal(2);
    expect(packet.sockAddr.address).to.equal(0);

    expect(packet.action).to.equal('b9c40100');
  //   expect(playerInfo.commandId).to.equal(0);
    expect(packet.version).to.equal(0);
    
      // expect(packet.command.customCommand).to.equal(115897);

//       expect(playerInfo.sockAddr.address_family).to.equal(2);
//       expect(playerInfo.sockAddr.port).to.equal(2300);
//       expect(playerInfo.sockAddr.address).to.equal(0);

//       // expect(playerInfo.commandId).to.equal(2);
//       //   expect(playerInfo.command.id).to.equal(playerInfo.commandId);
//       //   expect(playerInfo.command instanceof EnumSessions).to.true;
    
  });
});