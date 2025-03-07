import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { CourseService } from '../../../../../../core/services/courses.service';
import { Course } from '../../../courses/models';

@Component({
  selector: 'app-student-details-table',
  standalone: false,
  
  templateUrl: './student-details-table.component.html',
  styleUrl: './student-details-table.component.scss'
})
export class StudentDetailsTableComponent implements OnInit {
    @Input()
    dataSource: Student[] = []
    displayedColumns = ['id', 'name', 'course', 'actions' ]

    @Output()
    delete = new EventEmitter<string>

    @Output()
    edit = new EventEmitter<Student>()

    isAdmin$: Observable<boolean>;
    courseNames: { [courseId: string]: string } = {};

    
    constructor(private authService: AuthService, private courseService: CourseService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }

    ngOnInit(): void {
      this.loadCourseNames();
  }

  loadCourseNames(): void {
      this.dataSource.forEach(student => {
          if (student.courseId && !this.courseNames[student.courseId]) {
              this.courseService.getCourse(student.courseId).subscribe({
                  next: (course: Course) => {
                      this.courseNames[student.courseId!] = course.name; // Guarda el nombre del curso
                  },
                  error: (err) => {
                      console.error(`Error al obtener el curso ${student.courseId}:`, err);
                      this.courseNames[student.courseId!] = 'Desconocido'; // Fallback en caso de error
                  }
              });
          }
      });
  }

  getCourseName(courseId: string): string {
      return this.courseNames[courseId] || 'Sin curso';
  }
}
