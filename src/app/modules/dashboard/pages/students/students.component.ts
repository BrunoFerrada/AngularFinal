import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils/idRandom';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';

@Component({
    selector: 'app-students',
    standalone: false,
    
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
    displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource: Student[] = [];
    isAdmin$: Observable<boolean>;
    isLoading = false;

    constructor(private matdialog: MatDialog, private authService: AuthService, private studentService: StudentsService) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    handleStudentUpdate(data: Student[]): void {
        this.dataSource = [...data];
    } 

    openDialogForm(editingStudent?: Student): void {
        this.matdialog.open(StudentsFormDialogComponent, {data: { editingStudent }})
        .afterClosed().subscribe({
            next: (data) => {
                console.log(data)
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
    
        this.studentService.getStudents().subscribe({
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
