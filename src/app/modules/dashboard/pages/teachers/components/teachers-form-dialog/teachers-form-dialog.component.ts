import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../models';


interface TeacherFormDialogData {
    editingTeacher?: Teacher
}

@Component({
  selector: 'app-teachers-form-dialog',
  standalone: false,
  
  templateUrl: './teachers-form-dialog.component.html',
  styleUrl: './teachers-form-dialog.component.scss'
})
export class TeachersFormDialogComponent {
    teachersForm : FormGroup;

    constructor(
        private matDialogRef: MatDialogRef<TeachersFormDialogComponent>,
        private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: TeacherFormDialogData
    )
    {
        this.teachersForm = this.fb.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]]
        })

        if (!!data && !!data.editingTeacher) {
            this.teachersForm.patchValue(data.editingTeacher)
        }
    }

    onConfirm(): void {
        if (this.teachersForm.invalid){
          this.teachersForm.markAllAsTouched()
        } else {
          this.matDialogRef.close(this.teachersForm.value)
        }
      }
}
