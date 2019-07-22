import SocketAddress from "./SocketAddress";
import commands = require("./commands");

export default class Packet {
  public length: number;
  public token: number;
  public sockAddr: SocketAddress;
  public action: string = "706c6179";
  public commandId: number;
  public version: number;
  public command: any;

  constructor(commandName: string = "") {
    this.sockAddr = new SocketAddress();

    if (commandName.length && commands.hasOwnProperty(commandName)) {
      this.command = new commands[commandName]();
      this.commandId = this.command.id;
    }
  }

  public fromBuffer(buf: Buffer) {
    this.length = buf.readUInt16LE(0);
    this.token = buf.readUInt16LE(2);

    this.sockAddr.fromBuffer(buf, 4);

    this.action = buf.toString("hex", 20, 24);
    this.commandId = buf.readUInt16LE(24);
    this.version = buf.readUInt16LE(26);
    if (this.action == '706c6179') {
      try {
        this.command = this.playCommands(buf);
        this.command.fromBuffer(buf);
      } catch (ex) {
        console.log(buf);
        console.log(this);
      }
    } 

    
  }

  public customCommands(buf: Buffer,) {
    // throw("customCommands are not implemented in Dplay Packet");
  }

  public toBuffer() {
    const buf = Buffer.alloc(28);
    buf.writeUInt16LE(0, 0);
    buf.writeUInt16LE(this.token, 2);
    this.sockAddr.toBuffer().copy(buf, 4);

    buf.write(this.action, 20, "hex");
    buf.writeUInt16LE(this.commandId, 24);
    buf.writeUInt16LE(this.version, 26);

    const commandBuf = this.command.toBuffer();

    const pkBuf = Buffer.concat(
      [buf, commandBuf],
      buf.length + commandBuf.length
    );
    pkBuf.writeUInt16LE(pkBuf.length, 0);

    return pkBuf;
  }

  protected playCommands(buf: Buffer) {
    console.log(this.action);
    if (typeof this["_" + this.action] === "function") {
      return this["_" + this.action]();
    }
    // throw "error parseCommand action = " + buf.toString("hex", 20, 24);

    return this["_play"]();
  }

  protected _play() {
    switch (this.commandId) {
      case 1:
        return new commands.EnumSessionsReply();
      case 2:
        return new commands.EnumSessions();

      case 5:
        return new commands.RequestPlayerId();

      case 7:
        return new commands.RequestPlayerReply();
      case 8:
        return new commands.CreatePlayer();
 
      case 11:
        return new commands.DeletePlayer();

      case 19:
        return new commands.AddForwardRequest();

      case 22:
        return new commands.Ping();
      case 23:
        return new commands.Pong();

      case 41:
          return new commands.SuperEnumPlayersReply();

      default:
        throw this.commandId + " command is unknown to '_play'";
    }
  }
}
