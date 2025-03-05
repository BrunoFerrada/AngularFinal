import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Teacher } from '../../models';

@Component({
  selector: 'app-teachers-table',
  standalone: false,
  
  templateUrl: './teachers-table.component.html',
  styleUrl: './teachers-table.component.scss'
})
export class TeachersTableComponent {
    @Input()
    dataSource: Teacher[] = []
    displayedColumns = ['id', 'name', 'actions' ]

    @Output()
    delete = new EventEmitter<string>

    @Output()
    edit = new EventEmitter<Teacher>()

    isAdmin$: Observable<boolean>;
    
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.IsAdmin$;
    }
}
