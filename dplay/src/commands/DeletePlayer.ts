export class DeletePlayer {
    public id: number =  11;
    toId: number;
    playerId: number;
    groupId: number;
    offsetToPlayer: number;
    offserToPassword: number;

    fromBuffer(buf: Buffer, offset = 28) {
        this.toId = buf.readUInt32LE(offset);
        this.playerId = buf.readUInt32LE(offset + 4);
        this.groupId = buf.readUInt32LE(offset + 8);
        this.offsetToPlayer = buf.readUInt32LE(offset + 12);
        this.offserToPassword = buf.readUInt32LE(offset + 16);
    }

    toBuffer() {

    }
}