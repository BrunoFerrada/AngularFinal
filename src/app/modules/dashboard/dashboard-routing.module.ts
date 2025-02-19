import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('../dashboard/pages/home/home.module').then((m) => m.HomeModule) },
  { path: 'students', loadChildren: () => import('../dashboard/pages/students/students.module').then((m) => m.StudentsModule) },
  { path: 'courses', loadChildren: () => import('../dashboard/pages/courses/courses.module').then((m) => m.CoursesModule) },
  { path: 'users', loadChildren: () => import('../dashboard/pages/users/users.module').then((m) => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
