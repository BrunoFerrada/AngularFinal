import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

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
    { label: 'Usuarios', routerLink: 'users' },
  ]

  constructor(private authService: AuthService) {

  }

  logout(): void {
    this.authService.logOut();
  }
}
