import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teachers-detail',
  standalone: false,
  
  templateUrl: './teachers-detail.component.html',
  styleUrl: './teachers-detail.component.scss'
})
export class TeachersDetailComponent {
  teacherId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teacherId = params['id'];
    });
  }
}
