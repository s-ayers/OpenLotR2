export default class SocketAddress {
    public address_family: number;
    public port: number;
    public address: number;

    public fromBuffer(buf: Buffer, offset: number = 0) {
        this.address_family = buf.readUInt8(offset);
        this.port = buf.readUInt16BE(offset+2);
        this.address = buf.readUIntBE(offset+4, 4);
    }

    public toBuffer() {
        const buf = Buffer.alloc(16);

        buf.writeUInt8(this.address_family, 0);
        buf.writeUInt16BE(this.port, 2);
        buf.writeUInt32LE(this.address, 4);

        return buf;
    }
}