import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client, IFrame } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private statusSubject = new Subject<string>();
  public status$ = this.statusSubject.asObservable();

  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  private historySubject = new Subject<any>();
  public history$ = this.historySubject.asObservable();
  
  private stompClient: Client | null = null;

  constructor() { }

  connect(): void {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws/timer',
      onConnect: (frame: IFrame) => {
        this.statusSubject.next('Connected');
      },
      onStompError: (frame: IFrame) => {
        this.statusSubject.next('Error: ' + frame.body);
      }
    });
    this.stompClient.activate();
  }

 disconnect(): void {
  if(this.stompClient){
    this.stompClient.deactivate();
    this.statusSubject.next('Disconnected');      
  }
}

  sendMessage(destination: string, body: any): void {
    console.log('Sending to', destination, ':', body);
    if (this.stompClient && this.stompClient.connected){
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(body)
      });
    }
  }

  subscribe(destination: string): void {
    if (this.stompClient){
      this.stompClient.subscribe(destination, (message: any) => {
        const parsed = JSON.parse(message.body);
      
        if (destination === '/topic/timer-updates') {
          this.messageSubject.next(parsed);
        } else if (destination === '/topic/timer-history') {
          this.historySubject.next(parsed);
        }
      });
    }
  }
}