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
  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [];
  editStudentId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    })
  }


  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      if (this.editStudentId) {
        // Editar estudiante existente
        this.students = this.students.map(student =>
          student.id === this.editStudentId
            ? { id: student.id, ...this.studentForm.value }
            : student
        );
        this.editStudentId = null; // Salir del modo de edición
      } else {
        // Agregar nuevo estudiante
        this.students = [
          ...this.students,
          {
            id: generateRandomString(5),
            ...this.studentForm.value,
          },
        ];
      }
      this.studentForm.reset();
    }
  }

  onDelete(id: string) {
    this.students = this.students.filter((el) => el.id != id)
  }

  onEdit(id: string) {
    const studentToEdit = this.students.find(student => student.id === id);
    if (studentToEdit) {
      this.editStudentId = id;
      this.studentForm.patchValue({
        name: studentToEdit.name,
        lastName: studentToEdit.lastName,
      });
    }
  }
}
