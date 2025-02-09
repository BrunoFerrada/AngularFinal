import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  studentId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      console.log('ID recibido:', this.studentId);
    });
  }
}
