import { expect } from "chai";
import { PongServer } from "./PongServer";

const mockudp = require("mock-udp");

describe("Test server onMessage", () => {
  it("should reply", () => {
    const scope = mockudp("127.0.0.1:2350");
    const request = Buffer.from(
      "2400b0fa020008fc000000000000000000000000706c617916000e00cd74000034c90300",
      "hex"
    );
    const response = Buffer.from(
      "2400b0fa020008fc000000000000000000000000706c617917000e00cf74000034c90300",
      "hex"
    );

    const myPongServer = new PongServer();
    myPongServer.host = "127.0.0.1";
    myPongServer.start();

    (myPongServer as any).server.emit("message", request, {
      address: "127.0.0.1",
      port: 2350
    });

    console.log(scope.buffer);
    console.log(response);

    expect(Buffer.compare(scope.buffer, response)).to.equal(0);

    //   const buf = Buffer.from('5a00000008000000b9c401000a00000000000000200000000000000000000000b8c40100300000000e000000000000004e6f626c656d616e0000020008fc0000000000000000000000000200092e000000000000000000000000000000000000'
    //   , 'hex');
    //   const player = new Player();
    //   player.fromBuffer(buf, 8);

    //   expect(player.size).to.equal(90);
    //   expect(player.flags).to.equal(8);
    //   expect(player.id).to.equal(115897);
    //   expect(player.shortNameLength).to.equal(10);
    //   expect(player.longNameLength).to.equal(0);
    //   expect(player.serviceDataSize).to.equal(32);
    //   expect(player.playerDataSize).to.equal(0)
    //   expect(player.playerCount).to.equal(0);
    //   expect(player.systemPlayerId).to.equal(115896);
    //   expect(player.fixedSize).to.equal(48);
    //   expect(player.dplayVersion).to.equal(14);
    //   expect(player.unknown).to.equal(0);
    //   expect(player.shortName).to.equal('Nobleman');

    //   expect(player.serviceData[0].address_family).to.equal(2);
    //   expect(player.serviceData[0].port).to.equal(2300);
    //   expect(player.serviceData[0].address).to.equal(0);

    //   expect(player.serviceData[1].address_family).to.equal(2);
    //   expect(player.serviceData[1].port).to.equal(2350);
    //   expect(player.serviceData[1].address).to.equal(0);
  });
});
