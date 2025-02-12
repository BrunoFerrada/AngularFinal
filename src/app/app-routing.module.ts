import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './modules/dashboard/pages/students/students.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';


const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)},
  { path:'**', redirectTo: 'dashboard/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
