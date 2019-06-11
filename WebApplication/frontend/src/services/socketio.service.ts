import { Injectable, Inject } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { WINDOW } from '../window/provider';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  messages:any;

  constructor(private socket: Socket, @Inject(WINDOW) private window: Window) { 
    if (this.socket) this.disconnect();
    const socketIoConfig: SocketIoConfig = { url: `${window.location.hostname}:${window.location.port}`, options: {} };
    this.socket = new Socket(socketIoConfig);
    this.messages = this.socket.fromEvent('sensors');
    this.socket.on('connect', this.onConnect.bind(this));
  }

  onConnect() {
    console.log('socket.io connected');
  }

  getMessages() {
    return this.messages;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
