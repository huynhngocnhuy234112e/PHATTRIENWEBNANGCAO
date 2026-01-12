import { Component } from '@angular/core';

@Component({
  selector: 'app-mycomponent',
  standalone: false,
  templateUrl: './mycomponent.html',
  styleUrl: './mycomponent.css',
})
export class MyComponent {
  myVar: string = 'Hello Angular';

  getMyVar(): string {
    return this.myVar;
  }
}