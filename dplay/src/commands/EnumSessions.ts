import {Command} from './Command';


export class EnumSessions extends Command {

    public id: number =  2;

    public guid: string;
    public password_offset: number = 0;

    private _flags:number = 0;

    public fromBuffer(buf: Buffer) {
        const offset = 28;
        this.guid = buf.toString('hex', offset, offset + 16);
        this.password_offset = buf.readUInt32LE(offset + 16);
        this.flags = buf.readUInt32LE(offset + 20);

    }
    public toBuffer() {

        const buf = Buffer.alloc(24);
        buf.write(this.guid, 0, 'hex');
        buf.writeUInt32LE(this.password_offset, 16);
        buf.writeUInt32LE(this.flags, 20)

        return buf;
    }

    get flags():number {
        return this._flags;
    }
    set flags(theFlags:number) {
        this._flags = theFlags;
    }

    get isJoinable():boolean {
        return (this._flags & 1) > 0;
    }
    set isJoinable(system:boolean) {
        if (system && !(this._flags & 1) ) {
            this._flags += 1;
        }
        if (!system && (this._flags & 1)) {
            this._flags -= 1;
        }
    } 
    get isAllSessions():boolean {
        return (this._flags & 2) > 0;
    }
    set isAllSessions(system:boolean) {
        if (system && !(this._flags & 2) ) {
            this._flags += 2;
        }
        if (!system && (this._flags & 2)) {
            this._flags -= 2;
        }
    } 
    get isPasswordRequired():boolean {
        return (this._flags & 64) > 0;
    }
    set isPasswordRequired(system:boolean) {
        if (system && !(this._flags & 64) ) {
            this._flags += 64;
        }
        if (!system && (this._flags & 64)) {
            this._flags -= 64;
        }
    } 

}