
import {Ping} from './Ping';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Ping fromBuffer', () => {
  it('should parse the Buffer', () => {
    const command = new Ping();
    const buf = Buffer.from('2400b0fa020008fc000000000000000000000000706c617916000e00c67e000074ae0200', 'hex');
    
    command .fromBuffer(buf);

    expect(command.from).to.equal('c67e0000');
    expect(command.tick).to.equal(175732);

    
  });
});