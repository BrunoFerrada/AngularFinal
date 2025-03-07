import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../models';
import { TeachersFormDialogComponent } from '../../components/teachers-form-dialog/teachers-form-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../../core/services/auth.service';
import { TeacherService } from '../../../../../../core/services/teachers.service';

@Component({
  selector: 'app-teachers-detail',
  standalone: false,
  
  templateUrl: './teachers-detail.component.html',
  styleUrl: './teachers-detail.component.scss'
})
export class TeachersDetailComponent {
    teacherId: string | null = null;
    displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource: Teacher[] = [];
    isAdmin$: Observable<boolean>;
    isLoading = false;

    constructor(private matdialog: MatDialog, private authService: AuthService, private teacherService: TeacherService, private route: ActivatedRoute) {
        this.isAdmin$ = this.authService.IsAdmin$;
    }

    handleTeacherUpdate(data: Teacher[]): void {
        this.dataSource = [...data];
    } 

    openDialogForm(editingTeacher?: Teacher): void {
        this.matdialog.open(TeachersFormDialogComponent, {data: { editingTeacher }})
        .afterClosed().subscribe({
            next: (data) => {
                if (!!data) {
                    if (!!editingTeacher){
                        this.updateTeacher(editingTeacher.id, data)
                    }
                }
            }
        });
    }

    updateTeacher(id: string, data: { name: string, lastName: string }) {
        this.isLoading = true;
        this.teacherService.updateTeacherById(id, data).subscribe ({
          next: (data) => this.handleTeacherUpdate(data),
          error: (err) => (this.isLoading = false),
          complete: () => (this.isLoading = false),
        })
    }

    ngOnInit(): void {
        this.isLoading = true;
    
        this.route.paramMap.subscribe(params => {
          const teacherId = params.get('id'); // Extraer el ID de la ruta

          if (teacherId) {
              this.loadTeacher(teacherId);
          }
        });
    }

    loadTeacher(id: string): void {
      this.teacherService.getTeacher(id).subscribe({
          next: (teacher) => {
              this.dataSource = [teacher];
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
          this.teacherService.deleteTeacherById(id).subscribe({
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
