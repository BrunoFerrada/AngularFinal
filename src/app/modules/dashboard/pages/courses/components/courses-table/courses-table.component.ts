import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
    @Input()
    dataSource: Course[] = []
    displayedColumns = ['id', 'name', 'actions' ]

    @Output()
    delete = new EventEmitter<string>

    @Output()
    edit = new EventEmitter<Course>()

    isAdmin$: Observable<boolean>;
    
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }
}
