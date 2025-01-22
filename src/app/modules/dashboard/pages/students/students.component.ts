import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  studentForm: FormGroup;

  students: Student[] = []

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    })
  }


  onSubmit() {
    if(this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      //console.log(this.studentForm.value)
      this.students.push({
        ...this.studentForm.value
      })
    }
  }
}
