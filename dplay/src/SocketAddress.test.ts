
import SocketAddress from '../src/SocketAddress';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('SocketAddress fromBuffer', () => {
  it('should parse the Buffer', () => {
    
    const buf = Buffer.from('9000b0fa020008fc000000000000000000000000706c617908000e0000000000c57e0000000000001c000000000000005a00000008000000c57e00000a00000000000000200000000000000000000000c47e0000300000000e000000000000004e6f626c656d616e0000020008fc0000000000000000000000000200092e000000000000000000000000000000000000'
    , 'hex');
    const sockAddr = new SocketAddress();
    sockAddr.fromBuffer(buf, 4);

    expect(sockAddr.address_family).to.equal(2);
    expect(sockAddr.port).to.equal(2300);
    expect(sockAddr.address).to.equal(0);
  });

});