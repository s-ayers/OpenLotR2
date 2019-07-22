import {Command} from './Command';



export class RequestPlayerReply extends Command {

    public id:number =  7;

    // public desc_length: number;
    public flags: number;
    // public instance: string;
    public playerId: string;






    public fromBuffer(buf: Buffer) {
        const offset = 28;

        // this.desc_length = buf.readUInt32LE(offset);
        // this.flags = buf.readUInt32LE(offset);
        // this.instance = buf.toString('hex', offset + 8, offset + 24);
        this.playerId = buf.toString('hex', offset, offset + 4);
        // this.max_players = buf.readUInt32LE(offset + 40);
        // this.current_players = buf.readUInt32LE(offset + 44);
        // this.name_pointer = buf.readUInt32LE(offset + 48);
        // this.password_pointer = buf.readUInt32LE(offset + 52);
        // this.reserved_1 = buf.readUInt32LE(offset + 56);
        // this.reserved_2 = buf.readUInt32LE(offset + 60);
        // this.user_def_1 = buf.readUInt32LE(offset + 64);
        // this.user_def_2 = buf.readUInt32LE(offset + 68);
        // this.user_def_3 = buf.readUInt32LE(offset + 72);
        // this.user_def_4 = buf.readUInt32LE(offset + 74);
        // this.name_offset = buf.readUInt32LE(offset + this.desc_length);
        // this.name = buf.toString('ascii', this.name_offset + 20).replace(/\0/g, '');


    }
    public toBuffer() {}
}