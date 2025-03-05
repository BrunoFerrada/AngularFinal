import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('../dashboard/pages/home/home.module').then((m) => m.HomeModule) },
  { path: 'students', loadChildren: () => import('../dashboard/pages/students/students.module').then((m) => m.StudentsModule) },
  { path: 'courses', loadChildren: () => import('../dashboard/pages/courses/courses.module').then((m) => m.CoursesModule) },
  { path: 'users', canActivate: [adminGuard], loadChildren: () => import('../dashboard/pages/users/users.module').then((m) => m.UsersModule) },
  { path: 'teachers', loadChildren: () => import('../dashboard/pages/teachers/teachers.module').then((m) => m.TeachersModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
