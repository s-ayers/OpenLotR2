
export class Ping {
    
    public id: number = 22;

    public from: string;
    public tick: number;

    public fromBuffer(buf: Buffer) {
        const offset = 28;
        this.from = buf.toString('hex', offset, offset + 4);
        this.tick = buf.readUInt32LE(offset+4);
    }
    public toBuffer() {}
}

