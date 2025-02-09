import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {

  linkItems: { label: string, routerLink: string } [] = [
    { label: 'Inicio', routerLink: 'home' },
    { label: 'Estudiantes', routerLink: 'students' },
    { label: 'Cursos', routerLink: 'courses' }
  ]

}
