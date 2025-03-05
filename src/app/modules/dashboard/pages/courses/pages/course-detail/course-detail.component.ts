import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TeacherService } from '../../../../../../core/services/teachers.service';
import { Teacher } from '../../../teachers/models';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
    isAdmin$:Observable<boolean>;
    dataSource: Teacher[] = [];
    isLoading = false;
    course: Course | null = null;
    errorMessage = '';

    constructor (private courseService: CourseService, private activatedRoute: ActivatedRoute, private authService: AuthService, private teacherService: TeacherService) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    handleStudentUpdate(data: Teacher[]): void {
            this.dataSource = [...data];
    } 

    ngOnInit(): void {
        this.isLoading = true;
    
        this.courseService.getCourseDetail(this.activatedRoute.snapshot.params['id']).subscribe({
          next: (course) => {
            this.course = course;
    
            if (course.teachers && course.teachers.length > 0) {
              this.dataSource = course.teachers;
            }
          },
          error: (error) => {
            this.isLoading = false;
            if (error instanceof HttpResponse && error.status === 404) {
              this.errorMessage = 'El curso no existe';
            }
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      }
  
    //esto no debe borrar al profe, solo quitarlo del curso, seguro voy a tener que hacer otro sevicio
  /*onDelete(id:string): void {
      if (confirm("Está seguro?")) {
        this.isLoading = true;
        this.teacherService.deleteTeacherById(id).subscribe({
          next: (data) => {
            this.handleStudentUpdate(data);
          },
          error: (err) => {
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        })
      }
  }*/
}
