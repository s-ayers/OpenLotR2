export class SuperEnumPlayersReply {
    id: number =  41;
    player_count: number;
    group_count: number;
    packed_offset: number;
    shortcut_count: number;
    description_offset: number;
    name_offset: number;
    password_offset: number;
    description_length: number;
    private _flags: number;
    instance_guid: string;
    game_guid: string;

    fromBuffer (buf: Buffer, offset: number = 28) {

        this.player_count = buf.readUInt32LE(offset);
        this.group_count = buf.readUInt32LE(offset + 4);
        this.packed_offset = buf.readUInt32LE(offset + 8);
        this.shortcut_count = buf.readUInt32LE(offset + 12);
        this.description_offset = buf.readUInt32LE(offset + 16);
        this.name_offset = buf.readUInt32LE(offset + 20);
        this.password_offset = buf.readUInt32LE(offset + 24);
        this.description_length = buf.readUInt32LE(offset + 28);
        this.flags = buf.readUInt32LE(offset + 32);

        this.instance_guid = buf.toString('hex', offset + 36, offset + 52);
        this.game_guid = buf.toString('hex', offset + 52, offset + 68);
    }

    toBuffer() {}

    get flags():number {
        return this._flags;
    }
    set flags(theFlags:number) {
        this._flags = theFlags;
    }
}