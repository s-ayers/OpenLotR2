export class PlayerInfo {

        customCommand: number;
        fromPlayer: number;
        toPlayer: number;
        playerId: number;
        name: string;
        castles: string;

    fromBuffer(buf: Buffer, offset: number = 28) {
        this.fromPlayer = buf.readUInt32LE(offset);
        this.toPlayer = buf.readUInt32LE(offset + 4);

        this.name = buf.toString('ascii', offset + 8, offset + 15);

        this.castles = buf.toString('ascii', offset + 32, offset + 39);
    }
}