import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesDetailTableComponent } from './pages/courses-detail-table/courses-detail-table.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseFormDialogComponent,
    CourseDetailComponent,
    CoursesDetailTableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }
