
import {EnumSessionsReply} from './EnumSessionsReply';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('EnumSessionsReply fromBuffer', () => {
  it('should parse the Buffer', () => {
    const command = new EnumSessionsReply();
    const buf = Buffer.from('8200b0fa020008fc000000000000000000000000706c617901000e005000000044000000811512b2fc537142a1182b457d048079c048821c7297cf11b74f00c0df413ed105000000010000000000000000000000c67e010000000000000000000000000000000000000000005c0000004c6f726473322053657373696f6e31000000'
    , 'hex');
    
    command .fromBuffer(buf);

    expect(command.desc_length).to.equal(80);
    expect(command.flags).to.equal(68);
    expect(command.instance).to.equal('811512b2fc537142a1182b457d048079');
    expect(command.game).to.equal('c048821c7297cf11b74f00c0df413ed1');
    expect(command.max_players).to.equal(5);
    expect(command.current_players).to.equal(1);
    expect(command.name_pointer).to.equal(0);
    expect(command.password_pointer).to.equal(0);
    expect(command.reserved_1).to.equal(97990);
    expect(command.reserved_2).to.equal(0);
    expect(command.user_def_1).to.equal(0);
    expect(command.user_def_2).to.equal(0);
    expect(command.user_def_3).to.equal(0);
    expect(command.user_def_4).to.equal(0);
    expect(command.name_offset).to.equal(92);
    expect(command.name).to.equal('Lords2 Session1');

    expect(command.isNoCreatePlayers).to.false;
    expect(command.isMigrateHost).to.true;
    expect(command.isShortPlayerMessage).to.false;
    expect(command.isJoinable).to.false;
    expect(command.isUsePing).to.true;
    expect(command.isNoPlayerUpdates).to.false;
    
  });
});