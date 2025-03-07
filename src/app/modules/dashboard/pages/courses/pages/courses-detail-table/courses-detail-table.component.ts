import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Course } from '../../models';
import { Teacher } from '../../../teachers/models';

@Component({
  selector: 'app-courses-detail-table',
  standalone: false,
  
  templateUrl: './courses-detail-table.component.html',
  styleUrl: './courses-detail-table.component.scss'
})
export class CoursesDetailTableComponent {
    @Input()
    dataSource: Teacher[] = []
    displayedColumns = ['id', 'name', 'actions' ]

    @Output()
    delete = new EventEmitter<string>()

    @Output()
    add = new EventEmitter<Course>()

    isAdmin$: Observable<boolean>;
    
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }
}
