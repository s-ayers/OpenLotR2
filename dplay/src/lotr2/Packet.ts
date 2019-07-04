import {default  as Packet} from '../Packet';
import { PlayerInfo } from './commands/PlayerInfo';
import { Chat } from './commands/Chat';

export class Lotr2Packet extends Packet {

    constructor(commandName: string = "") {
        super(commandName);
      }
    public  customCommands(buf: Buffer) {

        super.customCommands(buf);

        
        let customCommand = buf.readUInt16LE(36);
        console.log('custom command ' + customCommand);  

        switch (customCommand) {
            // case 1:
            //   return new commands.EnumSessionsReply();
            // case 2:
            //   return new commands.EnumSessions();
      
            // case 5:
            //   return new commands.RequestPlayerId();
      
            // case 7:
            //   return new commands.RequestPlayerReply();
            // case 8:
            //   return new commands.CreatePlayer();
       
            // case 11:
            //   return new commands.DeletePlayer();
      
            // case 19:
            //   return new commands.AddForwardRequest();
      
            // case 22:
            //   return new commands.Ping();
            case 8297:
              return new Chat();
      
            case 27728:
                return new PlayerInfo();
      
            default:
                return new PlayerInfo();
          }
        
    }

    public  fromBuffer(buf: Buffer) {
        super.fromBuffer(buf);
        if (this.action !== '706c6179') {

            this.command = this.customCommands(buf);
            this.command.fromBuffer(buf, 28);
          }

    }
}