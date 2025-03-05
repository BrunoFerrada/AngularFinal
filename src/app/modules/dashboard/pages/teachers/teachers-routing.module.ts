import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeachersDetailComponent } from './pages/teachers-detail/teachers-detail.component';

const routes: Routes = [

  { path:'', component: TeachersComponent },
  { path: ':id', component: TeachersDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
