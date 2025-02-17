import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {

  linkItems: { label: string, routerLink: string } [] = [
    { label: 'Inicio', routerLink: 'home' },
    { label: 'Estudiantes', routerLink: 'students' },
    { label: 'Cursos', routerLink: 'courses' },
  ]

  constructor(private router: Router) {

  }

  logOut(): void {
    localStorage.removeItem('token');

    this.router.navigate(['auth', 'login'])
  }
}
