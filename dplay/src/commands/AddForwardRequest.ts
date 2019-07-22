import { Player } from "../Player";
import { timingSafeEqual } from "crypto";

export class AddForwardRequest {
    id: number = 19;
    toId: number;
    playerId: number;
    groupId: number;
    create_offset: number;
    password_offset: number;
    player: Player;
    forwardTo: number;
    password: number;

    constructor() {
        this.player = new Player();
    }

    fromBuffer(buf: Buffer, offset: number = 28) {
        this.toId = buf.readUInt32LE(offset);
        this.playerId = buf.readUInt32LE(offset + 4);
        this.groupId = buf.readUInt32LE(offset + 8);
        this.create_offset = buf.readUInt32LE(offset + 12);
        this.password_offset = buf.readUInt32LE(offset + 16);
 
        this.player.fromBuffer(buf, offset + this.create_offset);
        this.password = buf.readUInt16LE(this.password_offset);
        this.forwardTo = buf.readUInt32LE(this.password_offset + 2);
    }
    
    toBuffer (offset: number = 28): Buffer {
        const playerBuf = this.player.toBuffer();
        const buf = Buffer.alloc(20 + this.player.size + 8);

        buf.writeUInt32LE(this.toId, 0);
        buf.writeUInt32LE(this.playerId, 4);
        buf.writeUInt32LE(this.groupId, 8);
        buf.writeUInt32LE(this.create_offset, 12);
        buf.writeUInt32LE(this.password_offset, 16);
        playerBuf.copy(buf, 20);
        

        return buf;
    }
}