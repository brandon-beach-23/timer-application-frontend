import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketTestComponent } from './components/websocket-test/websocket-test.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebsocketTestComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timer-application-frontend';
}