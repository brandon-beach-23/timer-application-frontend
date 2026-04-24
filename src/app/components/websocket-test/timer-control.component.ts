import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TimerRequest } from '../../models/timer-request';

@Component({
  selector: 'app-timer-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatTimePipe],
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

  public status: string = 'Disconnected'
  private websocketService: WebsocketService = inject(WebsocketService);
  private fb = inject(FormBuilder);
  public timerName: string = '';
  public timerDuration: number = 0;
  public elapsedTime: number = 0;
  public currentState: string = 'INITIAL';
  public isConnected: boolean = false;
  timerForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.onConnect();
    
    this.websocketService.status$.subscribe(status => {
      this.status = status;
      this.isConnected = (status === 'Connected');
    });

    this.websocketService.message$.subscribe((timerUpdate: any) => {
      this.elapsedTime = timerUpdate.elapsedTime;
      this.currentState = timerUpdate.timerState;
    });

    this.timerForm = this.fb.group({
      timerName: ['', [Validators.required, Validators.maxLength(50)]],
      timerDuration: [0, [Validators.required]]
    });
  }

  onConnect(): void {
    this.websocketService.connect();
  }

  onDisconnect(): void {
    this.websocketService.disconnect();
  }

 

  startTimer(): void {
    
    const formValue = this.timerForm.value;
    const timerRequest: TimerRequest = {
      timerName: formValue.timerName,
      timerDuration: formValue.timerDuration * 60
    };

   this.websocketService.sendMessage("/app/start", timerRequest);
  }

  pauseTimer(): void {
    this.websocketService.sendMessage("/app/pause", '');
  }

  resumeTimer(): void {
    this.websocketService.sendMessage("/app/resume", '');
  }

  stopTimer(): void {
    this.websocketService.sendMessage("/app/stop", '');
  }

}
