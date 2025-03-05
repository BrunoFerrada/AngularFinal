import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

interface StudentFormDialogData {
    editingStudent?: Student
  }

@Component({
  selector: 'app-students-form-dialog',
  standalone: false,
  
  templateUrl: './students-form-dialog.component.html',
  styleUrl: './students-form-dialog.component.scss'
})
export class StudentsFormDialogComponent {
    studentForm : FormGroup;

    constructor(
        private matDialogRef: MatDialogRef<StudentsFormDialogComponent>,
        private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: StudentFormDialogData
    )
    {
        this.studentForm = this.fb.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]]
        })

        if (!!data && !!data.editingStudent) {
            this.studentForm.patchValue(data.editingStudent)
        }
    }

    onConfirm(): void {
        if (this.studentForm.invalid){
          this.studentForm.markAllAsTouched()
        } else {
          this.matDialogRef.close(this.studentForm.value)
        }
      }

}
