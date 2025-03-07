import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TeacherService } from '../../../../../../core/services/teachers.service';
import { Teacher } from '../../../teachers/models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from '../../components/course-form-dialog/course-form-dialog.component';

@Component({
    selector: 'app-course-detail',
    standalone: false,
    templateUrl: './course-detail.component.html',
    styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'actions'];
        dataSource: Course[] = [];
        isAdmin$: Observable<boolean>;
        isLoading = false;
    
        constructor(private matdialog: MatDialog, private authService: AuthService, private courseService: CourseService, private route: ActivatedRoute) {
            this.isAdmin$ = this.authService.IsAdmin$;
        }
    
        handleCourseUpdate(data: Course[]): void {
            this.dataSource = [...data];
        } 
    
        openDialogForm(editingCourse?: Course): void {
            this.matdialog.open(CourseFormDialogComponent, {data: { editingCourse }})
            .afterClosed().subscribe({
                next: (data) => {
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
            this.courseService.addCourse(data).subscribe({
            next: (data) => {
                this.handleCourseUpdate(data);
            },
            error: (err) => {
                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
            }
            })
        }
    
        updateCourse(id: string, data: { name: string, lastName: string }) {
            this.isLoading = true;
            this.courseService.updateCourseById(id, data).subscribe ({
              next: (data) => this.handleCourseUpdate(data),
              error: (err) => (this.isLoading = false),
              complete: () => (this.isLoading = false),
            })
        }
    
        ngOnInit(): void {
            this.isLoading = true;
        
            // Obtener ID del estudiante desde la URL
            this.route.paramMap.subscribe(params => {
              const CourseId = params.get('id'); // Extraer el ID de la ruta
    
              if (CourseId) {
                  this.loadCourse(CourseId);
              }
            });
        }
    
        loadCourse(id: string): void {
          this.courseService.getCourse(id).subscribe({
              next: (Course) => {
                  this.dataSource = [Course]; // Guardar solo el estudiante obtenido
              },
              error: () => {
                  this.isLoading = false;
              },
              complete: () => {
                  this.isLoading = false;
              }
          });
      }
        
        onDelete(id:string): void {
            if (confirm("Está seguro?")) {
              this.isLoading = true;
              this.courseService.deleteCourseById(id).subscribe({
                next: (data) => {
                  this.handleCourseUpdate(data);
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