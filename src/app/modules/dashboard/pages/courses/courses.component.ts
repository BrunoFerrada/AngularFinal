import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  isLoading = false;

  dataSource: Course[] = [] ;

  isAdmin$: Observable<boolean>;

  constructor(
    private  courseService: CourseService, 
    private matdialog: MatDialog,
    private authService: AuthService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }
    

  handleCoursesUpdate(data: Course[]): void {
    this.dataSource = [...data];
  } 

  openDialogForm(editingCourse?: Course): void {
    this.matdialog.open(CourseFormDialogComponent, {data: { editingCourse }})
    .afterClosed().subscribe({
      next: (data) => {
        console.log(data)
        if (!!data) {
          if (!!editingCourse){
            this.updateCourse(editingCourse.id, data)
          } else {
            this.addCourse(data);
          }
        }
      }
    });
  }


  addCourse(data: {name: string}): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  updateCourse(id: string, data: { name: string }) {
    this.isLoading = true;
    this.courseService.updateCourseById(id, data).subscribe ({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.dataSource = [...data];
        console.log(data)
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id:string): void {
    if (confirm("Está seguro?")) {
      this.isLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: (data) => {
          this.handleCoursesUpdate(data);
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
