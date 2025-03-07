import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models';
import { StudentsFormDialogComponent } from '../../components/students-form-dialog/students-form-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../../core/services/auth.service';
import { StudentsService } from '../../../../../../core/services/students.service';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {
    displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource: Student[] = [];
    isAdmin$: Observable<boolean>;
    isLoading = false;

    constructor(private matdialog: MatDialog, private authService: AuthService, private studentService: StudentsService, private route: ActivatedRoute) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    handleStudentUpdate(data: Student[]): void {
        this.dataSource = [...data];
    } 

    openDialogForm(editingStudent?: Student): void {
        this.matdialog.open(StudentsFormDialogComponent, {data: { editingStudent }})
        .afterClosed().subscribe({
            next: (data) => {
                if (!!data) {
                    if (!!editingStudent){
                        this.updateStudent(editingStudent.id, data)
                    } else {
                        this.addCourse(data);
                    }
                }
            }
        });
    }

    addCourse(data: {name: string}): void {
        this.studentService.addStudent(data).subscribe({
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

    updateStudent(id: string, data: { name: string, lastName: string }) {
        this.isLoading = true;
        this.studentService.updateStudentById(id, data).subscribe ({
          next: (data) => this.handleStudentUpdate(data),
          error: (err) => (this.isLoading = false),
          complete: () => (this.isLoading = false),
        })
    }

    ngOnInit(): void {
        this.isLoading = true;
    
        // Obtener ID del estudiante desde la URL
        this.route.paramMap.subscribe(params => {
          const studentId = params.get('id'); // Extraer el ID de la ruta

          if (studentId) {
              this.loadStudent(studentId);
          }
        });
    }

    loadStudent(id: string): void {
      this.studentService.getStudent(id).subscribe({
          next: (student) => {
              this.dataSource = [student]; // Guardar solo el estudiante obtenido
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
          this.studentService.deleteStudentById(id).subscribe({
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
    }
}
