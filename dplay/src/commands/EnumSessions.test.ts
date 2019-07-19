
import { EnumSessions } from './EnumSessions';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('EnumSessions fromBuffer', () => {
  it('should parse the Buffer', () => {
    const command = new EnumSessions();
    const buf = Buffer.from('3400b0fa020008fc000000000000000000000000706c617902000e00c048821c7297cf11b74f00c0df413ed10000000001000000'
    , 'hex');
    
    command .fromBuffer(buf);

    expect(command.guid).to.equal('c048821c7297cf11b74f00c0df413ed1');
    expect(command.password_offset).to.equal(0);
    expect(command.flags).to.equal(1);

    expect(command.isJoinable).to.true;
    expect(command.isAllSessions).to.false;
    expect(command.isPasswordRequired).to.false;
    
  });
});

  describe('EnumSessions toBuffer', () => {
    it('should create the Buffer', () => {
      const command = new EnumSessions();
      const buf = Buffer.from('c048821c7297cf11b74f00c0df413ed10000000001000000'
      , 'hex');
       
      command.guid = 'c048821c7297cf11b74f00c0df413ed1';
      command.password_offset = 0;
  
      command.isJoinable = true;
      command.isAllSessions = true;
      command.isPasswordRequired = true;
      command.isAllSessions = false;
      command.isPasswordRequired = false;
      
      const commandBuf = command.toBuffer();
      expect(Buffer.compare(commandBuf, buf)).to.equal(0);
    });
});

describe('EnumSessions toBuffer', () => {
  it('should create the Buffer', () => {
    const command = new EnumSessions();
    const buf = Buffer.from('c048821c7297cf11b74f00c0df413ed10000000042000000'
    , 'hex');
     
    command.guid = 'c048821c7297cf11b74f00c0df413ed1';
    command.password_offset = 0;

    command.isJoinable = true;
    command.isJoinable = false;
    command.isAllSessions = true;
    command.isPasswordRequired = true;
    
    const commandBuf = command.toBuffer();
    expect(Buffer.compare(commandBuf, buf)).to.equal(0);
  });
});