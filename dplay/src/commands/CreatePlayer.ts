import { Player } from "../Player";

export class CreatePlayer {
    public id: number =  8;

    toId: number; 
    playerId: number;
    groupId: number;
    offsetToPlayer: number;
    offsetToPassword: number;
    playerSize: number;
    protected _flags: number;
    player: Player;
    password: string;

    fromBuffer(buf: Buffer, offset: number = 28) {

        this.toId = buf.readUInt32LE(offset);
        this.playerId = buf.readUInt32LE(offset + 4);
        this.groupId = buf.readUInt32LE(offset + 8);
        this.offsetToPlayer = buf.readUInt32LE(offset + 12);
        this.offsetToPassword = buf.readUInt32LE(offset + 16);
        // this.playerSize = buf.readUInt32LE(offset + 20);
        // this.flags = buf.readUInt32LE(offset + 24);

        this.player = new Player();
        this.player.fromBuffer(buf, offset + this.offsetToPlayer);
        this.password = buf.toString('ascii', offset + this.playerSize, offset + this.playerSize + this.offsetToPassword);
    }

    toBuffer() {

    }
    get flags(): number {
        return this._flags;
    }
    set flags(theFlags: number) {
        this._flags = theFlags;
    }
}