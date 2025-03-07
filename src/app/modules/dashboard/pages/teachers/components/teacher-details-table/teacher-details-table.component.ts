import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-teacher-details-table',
  standalone: false,
  
  templateUrl: './teacher-details-table.component.html',
  styleUrl: './teacher-details-table.component.scss'
})
export class TeacherDetailsTableComponent {
    @Input()
    dataSource: Teacher[] = []
    displayedColumns = ['id', 'name', 'actions' ]

    @Output()
    delete = new EventEmitter<string>

    @Output()
    edit = new EventEmitter<Teacher>()

    isAdmin$: Observable<boolean>;
    courseNames: { [courseId: string]: string } = {};

    
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }
}
