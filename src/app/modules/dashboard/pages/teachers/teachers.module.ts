import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { TeachersFormDialogComponent } from './components/teachers-form-dialog/teachers-form-dialog.component';
import { TeachersDetailComponent } from './pages/teachers-detail/teachers-detail.component';
import { TeacherDetailsTableComponent } from './components/teacher-details-table/teacher-details-table.component';



@NgModule({
  declarations: [
    TeachersComponent,
    TeachersFormDialogComponent,
    TeachersTableComponent,
    TeachersDetailComponent,
    TeacherDetailsTableComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule
  ]
})
export class TeachersModule { }
