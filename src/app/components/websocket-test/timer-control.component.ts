import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

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
