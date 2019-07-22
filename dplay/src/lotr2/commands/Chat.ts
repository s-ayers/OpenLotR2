export class Chat {
  customCommand: number;

  messageId: number;
  message: string;

  fromBuffer(buf: Buffer, offset: number = 28) {
    this.customCommand = buf.readUInt16LE(offset);
    this.messageId = buf.readUInt32LE(offset + 4);
    this.message = buf.toString('ascii', offset + 8, buf.length).replace(/\0/g, '');
  }
}
