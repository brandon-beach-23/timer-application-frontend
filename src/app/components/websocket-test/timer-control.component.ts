import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

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
    // 1) Verify Name and Duration have been filled out
    // 2) Send Message to backend including name and duration to start the timer
    // 3) Lock the input fields and start timer button to prevent duplication.
  }

  pauseTimer(): void {
    // 1) Send the request to backend to pause the timer.
  }

  resumeTimer(): void {
    // 1) Send the request to the backend to resume the timer.
  }

  stopTimer(): void {
    // 1) Send the request to the backend to stop the timer.
  }

}
