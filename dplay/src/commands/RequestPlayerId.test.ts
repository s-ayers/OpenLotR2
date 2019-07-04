
import {RequestPlayerId} from '../../src/commands/RequestPlayerId';
import { expect } from 'chai';
import Packet from '../Packet';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('RequestPlayerId fromBuffer - isSystem', () => {
  it('should parse the Buffer', () => {
    const command = new RequestPlayerId();
    const buf = Buffer.from('2000b0fa020008fc000000000000000000000000706c617905000e0009000000'
    , 'hex');
    
    command .fromBuffer(buf);


    expect(command.flags).to.equal(9);
    expect(command.isSecure).to.false;
    expect(command.isUnknown).to.true;
    expect(command.isLocal).to.false;
    expect(command.isNameServer).to.false;
    expect(command.isSystem).to.true;
  });
});

describe('RequestPlayerId fromBuffer - isUnknown', () => {
  it('should parse the Buffer', () => {
    const command = new RequestPlayerId();
    const buf = Buffer.from('2000b0fa020008fc000000000000000000000000706c617905000e0008000000'
    , 'hex');
    
    command .fromBuffer(buf);

    expect(command.flags).to.equal(8);
    expect(command.isSecure).to.false;
    expect(command.isUnknown).to.true;
    expect(command.isLocal).to.false;
    expect(command.isNameServer).to.false;
    expect(command.isSystem).to.false;
  });
});
describe('RequestPlayerId toBuffer', () => {
  it('should parse the Buffer', () => {
    const packet = new Packet('RequestPlayerId');
    packet.token = 64176;
    packet.sockAddr.address_family = 2;
    packet.sockAddr.port = 2300;
    packet.version = 14;   
    packet.command.isUnknown = true;

    const buf = packet.toBuffer();
    expect(buf.toString('hex')).to.equal('2000b0fa020008fc000000000000000000000000706c617905000e0008000000');
  });
});