import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playNotificationSound(): void {
    const audio = new Audio();
    audio.src = "assets/sounds/Victory.m4a";
    audio.load();
    audio.play();
  }
}
