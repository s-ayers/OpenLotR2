import {default as Packet} from '../Packet';

import { expect } from 'chai';
// import { EnumSessionsReply, EnumSessions, Ping, Pong, RequestPlayerId } from '../src/commands';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Packet fromBuffer', () => {
  it('should parse the Buffer', () => {
    
    const buf = Buffer.from('4c00b0fa020008fc000000000000000000000000c57e000000000000012c6700c57e0000506c61796572322020202000000000000000000000000000636173746c6573000100000015000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    expect(packet.length).to.equal(76);

    expect(packet.sockAddr.address_family).to.equal(2);
    expect(packet.token).to.equal(64176);
    expect(packet.action).to.equal('c57e0000');
    expect(packet.commandId).to.equal(0);
    expect(packet.version).to.equal(0);
    
    });
  });

  describe('Packet sockAddre fromBuffer', () => {
    it('should parse SockAddress', () => {
      
      const buf = Buffer.from('4c00b0fa020008fc000000000000000000000000c57e000000000000012c6700c57e0000506c61796572322020202000000000000000000000000000636173746c6573000100000015000000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.sockAddr.address_family).to.equal(2);
      expect(packet.sockAddr.port).to.equal(2300);
      expect(packet.sockAddr.address).to.equal(0);
  
    });
});

//   describe('Packet command_0 fromBuffer', () => {
//     it('should parse command_0', () => {
      
//       const buf = Buffer.from('4c00b0fa020008fc000000000000000000000000c57e000000000000012c6700c57e0000506c61796572322020202000000000000000000000000000636173746c6573000100000015000000'
//       , 'hex');
//       const packet = new Packet();
//       packet.fromBuffer(buf);
  
      
//       expect(packet.commandId).to.equal(0);
//     //   expect(packet.command.id).to.equal(packet.commandId);
//     //   expect(packet.command instanceof EnumSessionsReply).to.true;
  
//     });
// });



// describe('Packet RequestPlayerId fromBuffer', () => {
//     it('should parse RequestPlayerId', () => {
      
//       const buf = Buffer.from('2000b0fa020008fc000000000000000000000000706c617905000e0008000000'
//       , 'hex');
//       const packet = new Packet();
//       packet.fromBuffer(buf);
  
      
//       expect(packet.command.id).to.equal(5);
//       expect(packet.command.id).to.equal(packet.commandId);
//       expect(packet.command instanceof RequestPlayerId).to.true;
  
//     });
// });

// describe('Packet Ping fromBuffer', () => {
//     it('should parse Ping', () => {
      
//       const buf = Buffer.from('2400b0fa020008fc000000000000000000000000706c617916000e00c47e000025840500'
//       , 'hex');
//       const packet = new Packet();
//       packet.fromBuffer(buf);
  
      
//       expect(packet.command.id).to.equal(22);
//       expect(packet.command.id).to.equal(packet.commandId);
//       expect(packet.command instanceof Ping).to.true;
  
//     });
// });

// describe('Packet Pong fromBuffer', () => {
//     it('should parse Pong', () => {
      
//       const buf = Buffer.from('2400b0fa020008fc000000000000000000000000706c617917000e00c47e0000a7230300'
//       , 'hex');
//       const packet = new Packet();
//       packet.fromBuffer(buf);
  
      
//       expect(packet.command.id).to.equal(23);
//       expect(packet.command.id).to.equal(packet.commandId);
//       expect(packet.command instanceof Pong).to.true;
  
//     });
// });