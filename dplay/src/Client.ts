import Packet from "./Packet";
import { EventEmitter } from "events";
import { PongServer } from "./PongServer";

const dgram = require("dgram");
const net = require("net");
const uuidv4 = require("uuid/v4");

const MULTICAST_ADDR = "233.255.255.255";

export class Client extends EventEmitter {
  protected lobbyPort: number = 47624;
  protected gamePort: number = 2300;
  protected PongServer: PongServer;
  protected host: string = '0.0.0.0';

  // protected lobby: any;
  protected game: any;

  public sessions: any;

  constructor(config?: any) {
    super();

    // this.lobby = dgram.createSocket("udp4");
    this.game = net.createServer(socket => {
      // socket.name = socket.remoteAddress + ":" + socket.remotePort;
      // this.clients.push(socket);
      socket.on("data", (message: Buffer, remote: any) => {
        const packet = new Packet();
        packet.fromBuffer(message);
        // console.log(packet);
  
        // console.log(
        //   packet.commandId + " from: " + remote.address + ":" + remote.port
        // );
        // console.log(packet.command);
        // });
        const data = { packet: packet, socket: socket };
        console.log(packet.command.constructor.name);
        this.emit(packet.command.constructor.name, data);
      });
      socket.on("error", err => {
        console.log("an error: ", err);
      });


    });
    this.game.on("connection", () => {
      console.log("connection");
    });
    this.game.on('listening', () => {
      const address = this.game.address();
      console.log(
        `Client listening ${address.address}:${address.port}`
      );
    });
    this.game.on('data', (message: Buffer, remote: any) => {
      const packet = new Packet();

      packet.fromBuffer(message);

      console.log(
        packet.commandId + " from: " + remote.address + ":" + remote.port
      );
      const data = { packet: packet, socket: this.game };

      console.log(packet.command);
      console.log(packet.command.constructor.name);

      this.emit(packet.command.constructor.name, data);
    });

    this.on("EnumSessionsReply", data => {
      console.log('EnumSessionsReply - ');
      const buf = Buffer.from(
        "2000b0fa020008fc000000000000000000000000706c617905000e0009000000",
        "hex"
      );
      data.socket.write(buf);

    });
  }

  public start() {
    this.game.listen(this.gamePort, this.host);
    this.PongServer = new PongServer();
    this.EnumSessions();
  }

  public EnumSessions() {
    const packet = new Packet("EnumSessions");

    packet.token = 64176;
    packet.version = 14;
    packet.action = '706c6179';

    packet.sockAddr.address_family = 2;
    packet.sockAddr.port = this.gamePort;
    packet.sockAddr.address = 0;

    packet.command.guid = "c048821c7297cf11b74f00c0df413ed1";
    packet.command.password_offset = 0;
    packet.command.isJoinable = true;
 
    const buf = packet.toBuffer();
    const lobby = dgram.createSocket("udp4");
      // lobby.setMulticastTTL(128);
      lobby.bind(  () => {
        lobby.setBroadcast(true)
        lobby.setMulticastTTL(128);

        lobby.send(
          buf,
          0,
          buf.length,
          this.lobbyPort,
          '255.255.255.255',
          function() {
            console.log("Sent EnumSessions.");
          }
        );
      });


  


  }
}
