import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentDetailsTableComponent } from './components/student-details-table/student-details-table.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    StudentsFormDialogComponent,
    StudentsTableComponent,
    StudentDetailsTableComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
