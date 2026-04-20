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
  
  private stompClient = null;

  constructor() { }

  connect(){
        const socket = new SockJS('http://localhost:8080/ws/timer');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, (frame) => {
            this.statusSubject.next('Connected');
            this.stompClient.subscribe('/topic/test', (message) => {
                this.messageSubject.next(JSON.parse(message.body));
            });
        }, (error) => {
            this.statusSubject.next('Error' + error.message);
        });
  }

  disconnect(): void {

  }

  sendMessage(destination: string, body: any): void {

  }

  subscribe(destination: string): void {

  }


}
