import { Socket } from "net";
import { EventEmitter } from "events";
import Packet from "./Packet";

const dgram = require("dgram");
const net = require("net");
const uuidv4 = require("uuid/v4");

export class Server extends EventEmitter {
  protected lobbyPort: number = 47624;
  protected gamePort: number = 0;
  protected pingPort: number = 2350;
  protected host: string;

  protected lobby: any;
  protected server: any;
  protected clients: Socket[] = [];

  constructor(config?: any) {
    super();

    // this.lobbyPort = config.lobbyPort || 47624;
    // this.gamePort = config.gamePort || 1039;
    // this.pingPort = config.pingPort || 2350;

    // this.host = config.host || '0.0.0.0';

    this.server = net.createServer(socket => {
      socket.name = socket.remoteAddress + ":" + socket.remotePort;
      this.clients.push(socket);
    });

    this.server.on("listening", () => {
      const address = this.server.address();
      console.log(
        "TCP server listening on " + address.address + ":" + address.port
      );
    });

    this.lobby = dgram.createSocket("udp4");
    this.lobby.on("listening", () => {
      const address = this.lobby.address();
      try {
        this.lobby.addMembership("233.255.255.255");
        this.lobby.setBroadcast(true);
      } catch (err) {
        console.log(err);
      }
      console.log(
        "UDP server listening on " + address.address + ":" + address.port
      );
    });

    this.lobby.on("message", (message: Buffer, remote: any) => {
      var protocol = new Packet();

      protocol.fromBuffer(message);

      console.log(
        protocol.commandId + " from: " + remote.address + ":" + remote.port
      );
      const socket = net.connect(protocol.sockAddr.port, remote.address, () => {
        console.log("connecting to client");

      });
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
        // console.log(packet.command.constructor.name);
        this.emit(packet.command.constructor.name, data);
      });
      socket.on("error", err => {
        console.log("an error: ", err);
      });
      const data = { packet: protocol, socket: socket };

      this.emit(protocol.command.constructor.name, data);
    });

    this.on("EnumSessions", data => {
      data.socket.write(
        Buffer.from(
          "8200b0fa020008fc000000000000000000000000706c617901000e005000000044000000b8e478e9abf6eb42904ef534fae44b2cc048821c7297cf11b74f00c0df413ed105000000010000000000000000000000bac4000000000000000000000000000000000000000000005c0000004c6f726473322053657373696f6e31000000",
          "hex"
        ),
        () => {
        //   console.log("wrtten");
        }
      );
    //   this.clients.push(data.socket);
    });

    this.on('RequestPlayerId', (data) => {
        console.log('RequestPlayerId');
        data.socket.write(
            Buffer.from(
              "4400b0fa020008fc000000000000000000000000706c617907000e00b8c40100000000000000000000000000000000000000000000000000000000000000000000000000" 
              ,"hex"
            ),
            () => {
            //   console.log("wrtten");
            }
          );
    });
  }

  public start() {
    this.server.listen(this.gamePort, this.host);
    this.bindPort(this.lobby, this.host, this.lobbyPort);
  }

  protected bindPort(object, host, port, attempts = 0) {
    try {
      object.bind(port, host);
    } catch (error) {
      if (error.code === "EADDRINUSE") {
        // var nextPort = Math.floor(Math.random()*100) + 2300;
        const nextPort = port + 1;
        console.log(
          "Port " +
            port +
            " is already in use. Attempting with port " +
            nextPort
        );
        this.bindPort(object, host, nextPort, attempts);
      }
    }
  }
}
