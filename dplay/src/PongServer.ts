import { Socket } from "net";
import { EventEmitter } from "events";
import Packet from "./Packet";

const dgram = require("dgram");
const net = require("net");
const uuidv4 = require("uuid/v4");

export class PongServer extends EventEmitter {
    host: string;
    port:number;
    playerId: string;
    
    protected server: any;

    constructor(startingPort:number = 2350) {
        super();



        this.server = dgram.createSocket("udp4");
        this.server.on("listening", () => {
          const address = this.server.address();
        //   try {
        //     // this.server.addMembership("233.255.255.255");
        //     // this.server.setBroadcast(true);
        //   } catch (err) {
        //     console.log(err);
        //   }
          console.log(
            `Pong server listening ${address.address}:${address.port}`
          );
        });
        
        this.server.on("message", (message: Buffer, remote: any) => {
            var request = new Packet();
      
            request.fromBuffer(message);
      
            console.log(
              request.commandId + " from: " + remote.address + ":" + remote.port
            );

      
            if (request.command.constructor.name === 'Ping') {
                const response = new Packet("Pong");

                response.token = 64176;
                response.version = 14;
                response.action = '706c6179';
            
                response.sockAddr.address_family = 2;
                response.sockAddr.port = 2300;
                response.sockAddr.address = 0;
            
                response.command.from = this.playerId;
                response.command.tick = request.command.tick
            
                const buf = response.toBuffer();
                this.server.send(
                  buf,
                  0,
                  buf.length,
                  remote.port,
                  remote.address
                );
            }
          });

        this.bindPort(this.server, this.host, startingPort);
    }

    protected bindPort(object, host, port, attempts = 0) {
        try {
          object.bind(port, host);
          this.port = port;
        } catch (error) {
          if (error.code === "EADDRINUSE") {
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