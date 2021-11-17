import { io, Socket } from "socket.io-client";

 class ChatService {
  public socket: Socket|any;

  public connect(): void {
    this.socket = io("http://localhost:3000");
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
  
  public send(obj: any): void {

    this.socket.emit("msg-from-client", obj);
  }
}

export default ChatService;