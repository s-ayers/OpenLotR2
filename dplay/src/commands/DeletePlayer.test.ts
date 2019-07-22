import { expect } from 'chai';
import { DeletePlayer } from "./DeletePlayer";

describe('Player fromBuffer', () => {
    it('should parse Player', () => {
      
      const buf = Buffer.from('00000000b9c40100000000000000000000000000'
      , 'hex');
      const deletePlayer = new DeletePlayer();
      deletePlayer.fromBuffer(buf, 0);
  

      expect(deletePlayer.toId).to.equal(0);  
      expect(deletePlayer.playerId).to.equal(115897);
      expect(deletePlayer.groupId).to.equal(0);
      expect(deletePlayer.offsetToPlayer).to.equal(0);
      expect(deletePlayer.offserToPassword).to.equal(0)

    });
});