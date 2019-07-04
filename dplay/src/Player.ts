import SocketAddress from "./SocketAddress";

export class Player {
    id: number;
    size: number;
    private _flags: number;
    shortNameLength: number;
    longNameLength: number;
    serviceDataSize: number;
    playerDataSize: number;
    playerCount: number;
    systemPlayerId: number;
    fixedSize: number = 48;
    dplayVersion: number = 14;
    unknown: number;
    shortName: string;
    serviceData: SocketAddress[] = [];

    constructor() {
        this.serviceData[0] = new SocketAddress();
        this.serviceData[1] = new SocketAddress();
    }

    fromBuffer(buf: Buffer, offset = 0) {
        this.size = buf.readUInt32LE(offset - 8);
        this.flags = buf.readInt32LE(offset - 4);
        this.id = buf.readUInt32LE(offset);
        this.shortNameLength = buf.readUInt32LE(offset + 4);
        this.longNameLength = buf.readUInt32LE(offset + 8);
        this.serviceDataSize = buf.readUInt32LE(offset + 12);
        this.playerDataSize = buf.readUInt32LE(offset + 16);
        this.playerCount = buf.readUInt32LE(offset + 20);
        this.systemPlayerId = buf.readUInt32LE(offset + 24);
        this.fixedSize = buf.readUInt32LE(offset + 28);
        this.dplayVersion = buf.readUInt32LE(offset + 32);
        this.unknown = buf.readUInt32LE(offset + 36);
        this.shortName = buf.toString('ascii', offset + 40, offset + 40 + this.shortNameLength).replace(/\0/g, '');
        this.serviceData[0] = new SocketAddress();
        this.serviceData[1] = new SocketAddress();
        this.serviceData[0].fromBuffer(buf, offset + 40 + this.shortNameLength);
        this.serviceData[1].fromBuffer(buf, offset + 56 + this.shortNameLength);
    }
    toBuffer (offset: number = 28): Buffer {
        this.size = 80
        const buf = Buffer.alloc(this.size + 8);

        buf.writeUInt32LE(this.flags, 4);

        return buf;
    }

    get flags():number {
        return this._flags;
    }
    set flags(theFlags:number) {
        this._flags = theFlags;
    }
}