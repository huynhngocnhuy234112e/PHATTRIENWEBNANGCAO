import { Component } from '@angular/core';

@Component({
  selector: 'app-mybinding',
  standalone: false,
  templateUrl: './mybinding.html',
  styleUrl: './mybinding.css',
})
export class Mybinding {
  public full_name: string = 'teo';
  public email: string = 'teo@example.com';
  public is_redoned: boolean = true;
}

