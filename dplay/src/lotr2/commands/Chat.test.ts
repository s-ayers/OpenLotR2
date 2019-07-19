import { expect } from 'chai';
import  {Lotr2Packet } from '../Packet';


describe('Packet Chat fromBuffer', () => {
  it('should parse Chat', () => {
    
    const buf = Buffer.from('6500b0fa020008fc000000000000000000000000b9c401000000000006455983020000006920616d2074686520636c69656e740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    , 'hex');
    const packet = new Lotr2Packet();
    packet.fromBuffer(buf);

    expect(packet.commandId).equal(0);
    expect(packet.sockAddr.address_family).to.equal(2);
    expect(packet.sockAddr.address).to.equal(0);

    expect(packet.action).to.equal('b9c40100');
  //   expect(playerInfo.commandId).to.equal(0);
    expect(packet.version).to.equal(0);
    
    //   expect(packet.command.fromPlayer).to.equal(115897);
    //   expect(packet.command.toPlayer).to.equal(0);

      expect(packet.command.messageId).to.equal(2);
      expect(packet.command.message).to.equal('i am the client');
//       expect(playerInfo.sockAddr.address).to.equal(0);

//       // expect(playerInfo.commandId).to.equal(2);
//       //   expect(playerInfo.command.id).to.equal(playerInfo.commandId);
//       //   expect(playerInfo.command instanceof EnumSessions).to.true;
    
  });
});


describe('Packet Chat fromBuffer', () => {
  it('should parse Chat', () => {
    
    const buf = Buffer.from('6500b0fa020008fc000000000000000000000000b9c401000000000006455983020000006920616d2074686520636c69656e740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
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