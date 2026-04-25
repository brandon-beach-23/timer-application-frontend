import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerControlComponent } from './components/timer-control/timer-control.component';
import { CommonModule } from '@angular/common';
import { TimerHistoryComponent } from './components/timer-history/timer-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerControlComponent, CommonModule, TimerHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timer-application-frontend';
}