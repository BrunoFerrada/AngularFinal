import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
    isAdmin$:Observable<boolean>;

    isLoading = false;
    course: Course | null = null;
    errorMessage = '';

    constructor (private courseService: CourseService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.courseService.getCourseDetail(this.activatedRoute.snapshot.params['id']).subscribe({
            next: (course) => {
            this.course = course
            },
            complete: () => {
            this.isLoading = false;
            },
            error: (error) => {
            this.isLoading = false;
            if (error instanceof HttpResponse) {
                if (error.status === 404) {
                  this.errorMessage = 'El curso no existe';
                }
              }
            }
        });
    }
}
