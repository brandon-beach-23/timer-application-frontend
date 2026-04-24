import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerControlComponent } from './components/websocket-test/timer-control.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerControlComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timer-application-frontend';
}