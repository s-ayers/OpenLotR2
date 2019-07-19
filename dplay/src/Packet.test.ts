
import Packet from '../src/Packet';
import { expect } from 'chai';
import { EnumSessionsReply, EnumSessions, Ping, Pong, RequestPlayerId, SuperEnumPlayersReply, AddForwardRequest, DeletePlayer, CreatePlayer, RequestPlayerReply } from '../src/commands';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Packet fromBuffer', () => {
  it('should parse the Buffer', () => {
    
    const buf = Buffer.from('8200b0fa020008fc000000000000000000000000706c617901000e005000000044000000811512b2fc537142a1182b457d048079c048821c7297cf11b74f00c0df413ed105000000010000000000000000000000c67e010000000000000000000000000000000000000000005c0000004c6f726473322053657373696f6e31000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    expect(packet.length).to.equal(130);
    expect(packet.token).to.equal(64176);
    expect(packet.action).to.equal('706c6179');
    expect(packet.commandId).to.equal(1);
    expect(packet.version).to.equal(14);
    
    });
  });

  describe('Packet sockAddre fromBuffer', () => {
    it('should parse SockAddress', () => {
      
      const buf = Buffer.from('8200b0fa020008fc000000000000000000000000706c617901000e005000000044000000811512b2fc537142a1182b457d048079c048821c7297cf11b74f00c0df413ed105000000010000000000000000000000c67e010000000000000000000000000000000000000000005c0000004c6f726473322053657373696f6e31000000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.sockAddr.address_family).to.equal(2);
      expect(packet.sockAddr.port).to.equal(2300);
      expect(packet.sockAddr.address).to.equal(0);
  
    });
});

  describe('Packet EnumSessionsReply fromBuffer', () => {
    it('should parse EnumSessionsReply', () => {
      
      const buf = Buffer.from('8200b0fa020008fc000000000000000000000000706c617901000e005000000044000000811512b2fc537142a1182b457d048079c048821c7297cf11b74f00c0df413ed105000000010000000000000000000000c67e010000000000000000000000000000000000000000005c0000004c6f726473322053657373696f6e31000000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.command.id).to.equal(1);
      expect(packet.command.id).to.equal(packet.commandId);
      expect(packet.command instanceof EnumSessionsReply).to.true;
  
    });
});

describe('Packet EnumSessions fromBuffer', () => {
    it('should parse EnumSessions', () => {
      
      const buf = Buffer.from('3400b0fa020008fc000000000000000000000000706c617902000e00c048821c7297cf11b74f00c0df413ed10000000001000000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.command.id).to.equal(2);
      expect(packet.command.id).to.equal(packet.commandId);
      expect(packet.command instanceof EnumSessions).to.true;
  
    });
});

describe('Packet EnumSessions toBuffer', () => {
  it('should create EnumSessions buffer', () => {
    
    // const buf = Buffer.from('3400b0fa020008fc000000000000000000000000706c617902000e00c048821c7297cf11b74f00c0df413ed10000000001000000'
    // , 'hex');
    const packet = new Packet('EnumSessions');
    
    packet.token = 64176;
    packet.version = 14;
    packet.action = '706c6179';

    packet.sockAddr.address_family = 2;
    packet.sockAddr.port = 2300;
    packet.sockAddr.address = 0;

    packet.command.guid = 'c048821c7297cf11b74f00c0df413ed1';
    packet.command.password_offset = 0;
    packet.command.flags = 1;
    
    expect(packet.command.id).to.equal(2);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof EnumSessions).to.true;

    const buf = packet.toBuffer();
    expect(buf.toString('hex')).to.equal('3400b0fa020008fc000000000000000000000000706c617902000e00c048821c7297cf11b74f00c0df413ed10000000001000000');

  });
});

describe('Packet RequestPlayerId fromBuffer', () => {
    it('should parse RequestPlayerId', () => {
      
      const buf = Buffer.from('2000b0fa020008fc000000000000000000000000706c617905000e0008000000'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.command.id).to.equal(5);
      expect(packet.command.id).to.equal(packet.commandId);
      expect(packet.command instanceof RequestPlayerId).to.true;
  
    });
});

describe('Packet Ping fromBuffer', () => {
    it('should parse Ping', () => {
      
      const buf = Buffer.from('2400b0fa020008fc000000000000000000000000706c617916000e00c47e000025840500'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.command.id).to.equal(22);
      expect(packet.command.id).to.equal(packet.commandId);
      expect(packet.command instanceof Ping).to.true;
  
    });
});

describe('Packet Pong fromBuffer', () => {
    it('should parse Pong', () => {
      
      const buf = Buffer.from('2400b0fa020008fc000000000000000000000000706c617917000e00c47e0000a7230300'
      , 'hex');
      const packet = new Packet();
      packet.fromBuffer(buf);
  
      
      expect(packet.command.id).to.equal(23);
      expect(packet.command.id).to.equal(packet.commandId);
      expect(packet.command instanceof Pong).to.true;
  
    });
});


describe('Packet RequestPlayerReply fromBuffer', () => {
  it('should parse RequestPlayerReply', () => {
    
    const buf = Buffer.from('4400b0fa020008fc000000000000000000000000706c617907000e00b8c40100000000000000000000000000000000000000000000000000000000000000000000000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    
    expect(packet.command.id).to.equal(7);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof RequestPlayerReply).to.true;

  });
});

describe('Packet CreatePlayer fromBuffer', () => {
  it('should parse CreatePlayer', () => {
    
    const buf = Buffer.from('9000b0fa020008fc000000000000000000000000706c617908000e0000000000b9c40100000000001c000000000000005a00000008000000b9c401000a00000000000000200000000000000000000000b8c40100300000000e000000000000004e6f626c656d616e0000020008fc0000000000000000000000000200092e000000000000000000000000000000000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    
    expect(packet.command.id).to.equal(8);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof CreatePlayer).to.true;

  });
});

describe('Packet DeletePlayer fromBuffer', () => {
  it('should parse DeletePlayer', () => {
    
    const buf = Buffer.from('3000b0fa020008fc000000000000000000000000706c61790b000e0000000000b9c40100000000000000000000000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    
    expect(packet.command.id).to.equal(11);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof DeletePlayer).to.true;

  });
});

describe('Packet AddForwardRequest fromBuffer', () => {
  it('should parse AddForwardRequest', () => {
    
    const buf = Buffer.from('8600b0fa020008fc000000000000000000000000706c617913000e0000000000b8c40100000000001c0000006c0000005000000009000000b8c401000000000000000000200000000000000000000000b8c40100300000000e00000000000000020008fc0000000000000000000000000200092e0000000000000000000000000000bac40000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    
    expect(packet.command.id).to.equal(19);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof AddForwardRequest).to.true;

  });
});

describe('Packet SuperEnumPlayersReply fromBuffer', () => {
  it('should parse SuperEnumPlayersReply', () => {
    
    const buf = Buffer.from('4301b0fa020008fc000000000000000000000000706c617929000e00030000000000000086000000000000002400000074000000000000005000000044000000b8e478e9abf6eb42904ef534fae44b2cc048821c7297cf11b74f00c0df413ed105000000010000000000000000000000bac4000000000000000000000000000000000000000000004c6f726473322053657373696f6e310000001000000005000000b8c40100040000000e00000020020008fcc0a8014c00000000000000000200092ec0a8014c0000000000000000100000000f000000bac40100040000000e00000020020008fc0000000000000000000000000200092e000000000000000000000000100000000c000000bbc4010005000000bac401004e6f626c656d616e000020020008fc0000000000000000000000000200092e000000000000000000000000'
    , 'hex');
    const packet = new Packet();
    packet.fromBuffer(buf);

    
    expect(packet.command.id).to.equal(41);
    expect(packet.command.id).to.equal(packet.commandId);
    expect(packet.command instanceof SuperEnumPlayersReply).to.true;

  });
});
