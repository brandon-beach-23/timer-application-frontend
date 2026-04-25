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
    this.requestHistory();

    this.websocketService.message$.subscribe((historyUpdate: any) => {
         this.timerSessions = historyUpdate;
        });
    
        
  }

  requestHistory() {
    this.websocketService.sendMessage("/app/history", '');
  }
}
