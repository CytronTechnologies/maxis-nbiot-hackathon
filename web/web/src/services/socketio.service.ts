import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  messages = this.socket.fromEvent('sensors');

  constructor(private socket: Socket) { 
    this.socket.on('connect', this.onConnect.bind(this));
  }

  onConnect() {
    console.log('socket.io connected');
  }

  getMessages() {
    return this.messages;
  }
}
