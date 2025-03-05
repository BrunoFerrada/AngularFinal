import { Component } from '@angular/core';
import { TeachersFormDialogComponent } from './components/teachers-form-dialog/teachers-form-dialog.component';
import { Teacher } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { TeacherService } from '../../../../core/services/teachers.service';

@Component({
  selector: 'app-teachers',
  standalone: false,
  
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {


  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: Teacher[] = [];
  isAdmin$: Observable<boolean>;
  isLoading = false;

  constructor(private matdialog: MatDialog, private authService: AuthService, private studentService: TeacherService) {
      this.isAdmin$ = this.authService.IsAdmin$;
  }

  handleTeacherUpdate(data: Teacher[]): void {
      this.dataSource = [...data];
  } 

  openDialogForm(editingTeacher?: Teacher): void {
      this.matdialog.open(TeachersFormDialogComponent, {data: { editingTeacher }})
      .afterClosed().subscribe({
          next: (data) => {
              console.log(data)
              if (!!data) {
                  if (!!editingTeacher){
                      this.updateStudent(editingTeacher.id, data)
                  } else {
                      this.addCourse(data);
                  }
              }
          }
      });
  }

  addCourse(data: {name: string}): void {
      this.studentService.addTeacher(data).subscribe({
      next: (data) => {
          this.handleTeacherUpdate(data);
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
      this.studentService.updateTeacherById(id, data).subscribe ({
        next: (data) => this.handleTeacherUpdate(data),
        error: (err) => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      })
  }

  ngOnInit(): void {
      this.isLoading = true;
  
      this.studentService.getTeachers().subscribe({
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
        this.studentService.deleteTeacherById(id).subscribe({
          next: (data) => {
            this.handleTeacherUpdate(data);
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
