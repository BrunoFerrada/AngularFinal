import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

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
}
