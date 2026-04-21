import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-websocket-test',
  templateUrl: './websocket-test.component.html',
  styleUrls: ['./websocket-test.component.css']
})
export class WebsocketTestComponent implements OnInit {

  public messages: string[] = [];
  public status: string = 'Disconnected'
  private websocketService: WebsocketService = inject(WebsocketService);

  constructor() { }

  ngOnInit() {
    this.websocketService.message$.subscribe(msg => {
      this.messages.push(msg);
    });

    this.websocketService.status$.subscribe(msg => {
      this.status = msg;
    });
  }

  onConnect(): void {
    this.websocketService.connect();
  }

  onDisconnect(): void {
    this.websocketService.disconnect();
  }

  onSendMessage(destination: string, body: any): void {
    this.websocketService.sendMessage(destination, body);
  }

}
