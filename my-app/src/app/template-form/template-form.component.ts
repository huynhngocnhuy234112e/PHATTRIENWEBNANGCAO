import { Component } from '@angular/core';
import { Student } from '../classes/student';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
  standalone: false
})
export class TemplateFormComponent {
  studentModel = new Student("Nam Anh", "anh@gmail.com", "0909090909", "Python", "toi");
  
  courses = ["NodeJS", "ReactJS", "Angular", "Golang", "Python", "Ruby"];
  
  errFlag = false;

  validateCourse(value: any): void {
    if (value === 'none') {
      this.errFlag = true;
    } else {
      this.errFlag = false;
    }
  }
}
