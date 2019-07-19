
import {RequestPlayerReply} from '../../src/commands/RequestPlayerReply';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('RequestPlayerReply fromBuffer', () => {
  it('should parse the Buffer', () => {
    const command = new RequestPlayerReply();
    const buf = Buffer.from('4400b0fa020008fc000000000000000000000000706c617907000e00c47e0000000000000000000000000000000000000000000000000000000000000000000000000000'
    , 'hex');
    
    command .fromBuffer(buf);


    // expect(command.flags).to.equal(9);


    
  });
});