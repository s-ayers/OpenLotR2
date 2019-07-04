import {Command} from './Command';



export class EnumSessionsReply extends Command {

    public id:number =  1;

    public desc_length: number;
    private _flags: number = 0;
    public instance: string;
    public game: string;
    public max_players: number;
    public current_players: number;
    public name_pointer: number;
    public password_pointer: number;
    public reserved_1: number;
    public reserved_2: number;
    public user_def_1: number;
    public user_def_2: number;
    public user_def_3: number;
    public user_def_4: number;
    public name_offset: number;
    public name: string;

    
    public fromBuffer(buf: Buffer) {
        const offset = 28;

        this.desc_length = buf.readUInt32LE(offset);
        this.flags = buf.readUInt32LE(offset + 4);
        this.instance = buf.toString('hex', offset + 8, offset + 24);
        this.game = buf.toString('hex', offset + 24, offset + 40);
        this.max_players = buf.readUInt32LE(offset + 40);
        this.current_players = buf.readUInt32LE(offset + 44);
        this.name_pointer = buf.readUInt32LE(offset + 48);
        this.password_pointer = buf.readUInt32LE(offset + 52);
        this.reserved_1 = buf.readUInt32LE(offset + 56);
        this.reserved_2 = buf.readUInt32LE(offset + 60);
        this.user_def_1 = buf.readUInt32LE(offset + 64);
        this.user_def_2 = buf.readUInt32LE(offset + 68);
        this.user_def_3 = buf.readUInt32LE(offset + 72);
        this.user_def_4 = buf.readUInt32LE(offset + 74);
        this.name_offset = buf.readUInt32LE(offset + this.desc_length);
        this.name = buf.toString('ascii', this.name_offset + 20).replace(/\0/g, '');
    }

    public toBuffer() {}

    get flags():number {
        return this._flags;
    }
    set flags(theFlags:number) {
        this._flags = theFlags;
    }
    get isNoCreatePlayers():boolean {
        return (this._flags & 1) > 0;
    }
    set isNoCreatePlayers(system:boolean) {
        if (system && !(this._flags & 1) ) {
            this._flags += 1;
        }
        if (!system && (this._flags & 1)) {
            this._flags -= 1;
        }
    } 
    get isMigrateHost():boolean {
        return (this._flags & 4) > 0;
    }
    set isMigrateHost(system:boolean) {
        if (system && !(this._flags & 4) ) {
            this._flags += 4;
        }
        if (!system && (this._flags & 4)) {
            this._flags -= 4;
        }
    }
    get isShortPlayerMessage():boolean {
        return (this._flags & 8) > 0;
    }
    set isShortPlayerMessage(system:boolean) {
        if (system && !(this._flags & 8) ) {
            this._flags += 8;
        }
        if (!system && (this._flags & 8)) {
            this._flags -= 8;
        }
    }
    get isJoinable():boolean {
        return (this._flags & 32) > 0;
    }
    set isJoinable(system:boolean) {
        if (system && !(this._flags & 32) ) {
            this._flags += 32;
        }
        if (!system && (this._flags & 32)) {
            this._flags -= 32;
        }
    }
    get isUsePing():boolean {
        return (this._flags & 64) > 0;
    }
    set isUsePing(system:boolean) {
        if (system && !(this._flags & 64) ) {
            this._flags += 64;
        }
        if (!system && (this._flags & 64)) {
            this._flags -= 64;
        }
    }
    get isNoPlayerUpdates():boolean {
        return (this._flags & 128) > 0;
    }
    set isNoPlayerUpdates(system:boolean) {
        if (system && !(this._flags & 128) ) {
            this._flags += 128;
        }
        if (!system && (this._flags & 128)) {
            this._flags -= 128;
        }
    }
}