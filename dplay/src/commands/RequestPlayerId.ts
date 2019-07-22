import {Command} from './Command';



export class RequestPlayerId extends Command {

    public id:number =  5;

    private _flags:number = 0;
    get flags():number {
        return this._flags;
    }
    set flags(theFlags:number) {
        this._flags = theFlags;
    }

    get isSecure():boolean {
        return (this._flags & 1024) > 0;
    }
    set isSecure(secure:boolean) {
        if (secure && !(this._flags & 1024) ) {
            this._flags += 1024;
        }
        if (!secure && (this._flags & 1024)) {
            this._flags -= 1024;
        }
    }

    get isUnknown():boolean {
        return (this._flags & 8) > 0;
    }
    set isUnknown(unknown:boolean) {
        if (unknown && !(this._flags & 8) ) {
            this._flags += 8;
        }
        if (!unknown && (this._flags & 8)) {
            this._flags -= 8;
        }
    }

    get isLocal():boolean {
        return (this._flags & 4) > 0;
    }
    set isLocal(local:boolean) {
        if (local && !(this._flags & 4) ) {
            this._flags += 4;
        }
        if (!local && (this._flags & 4)) {
            this._flags -= 4;
        }
    }  

    get isNameServer():boolean {
        return (this._flags & 2) > 0;
    }
    set isNameServer(nameServer:boolean) {
        if (nameServer && !(this._flags & 2) ) {
            this._flags += 2;
        }
        if (!nameServer && (this._flags & 2)) {
            this._flags -= 2;
        }
    } 

    get isSystem():boolean {
        return (this._flags & 1) > 0;
    }
    set isSystem(system:boolean) {
        if (system && !(this._flags & 1) ) {
            this._flags += 1;
        }
        if (!system && (this._flags & 1)) {
            this._flags -= 1;
        }
    } 

    public fromBuffer(buf: Buffer) {
        const offset = 28;

        this.flags = buf.readUInt32LE(offset);


    }
    public toBuffer() {
        const buf = Buffer.alloc(4);

        buf.writeUInt32LE(this.flags, 0);

        return buf;
    }
}