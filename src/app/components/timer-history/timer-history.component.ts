import { Component, inject, OnInit } from '@angular/core';
import { TimerSessionResponse } from '../../models/timer-session-response';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

@Component({
  selector: 'app-timer-history',
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './timer-history.component.html',
  styleUrl: './timer-history.component.css'
})
export class TimerHistoryComponent implements OnInit{
  
  public timerSessions: TimerSessionResponse[] = [];
  private websocketService: WebsocketService = inject(WebsocketService);

  constructor() {}

 ngOnInit() {
  this.websocketService.status$.subscribe(status => {
    if (status === 'Connected') {
      this.websocketService.subscribe('/topic/timer-history');
      this.requestHistory();
    }
  });
  
  this.websocketService.history$.subscribe((historyUpdate: any) => {
    console.log('Received history update:', historyUpdate);
    if (Array.isArray(historyUpdate)) {
      this.timerSessions = historyUpdate;
    }
  });
}

  requestHistory() {
    console.log('Requesting history...');
    this.websocketService.sendMessage("/app/history", '');
  }
}
