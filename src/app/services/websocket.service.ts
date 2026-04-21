import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private statusSubject = new Subject<string>();
  public status$ = this.statusSubject.asObservable();

  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();
  
  private stompClient: any = null;

  constructor() { }

  connect(){
    const socket = new SockJS('http://localhost:8080/ws/timer');
    this.stompClient = Stomp.over(socket);

    this.stompClient!.connect({}, (frame: any) => {
      this.statusSubject.next('Connected');
      
      }, (error: any) => {
          this.statusSubject.next('Error' + error.message);
      });
  }

  disconnect(): void {
    if(this.stompClient){
      this.stompClient.disconnect(() => {
        this.statusSubject.next('Disconnected');
      });      
    }
  }

  sendMessage(destination: string, body: any): void {
    if (this.stompClient){
      this.stompClient.send(destination, {}, JSON.stringify(body));
    }
  }

  subscribe(destination: string): void {
    if (this.stompClient){
      this.stompClient.subscribe(destination, (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    }
  }
}
