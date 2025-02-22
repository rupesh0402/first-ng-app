import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  homeGreetings = signal("Hello, welcome to my first Angular app!");

  keyUpHandler(event: KeyboardEvent) {
    console.log(`User Pressed the key ${event.key} key`);
  }
}
