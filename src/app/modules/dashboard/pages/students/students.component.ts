import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils/idRandom';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];
  students: Student[] = [];

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
      this.students = [
        ...this.students,
        {
          id: generateRandomString(6),
          ...this.studentForm.value,
        }
      ]

      this.studentForm.reset();
    }
  }

  onDelete(id: string) {
    this.students = this.students.filter((el) => el.id != id)
  }
}
