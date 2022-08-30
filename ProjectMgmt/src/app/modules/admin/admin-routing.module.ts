import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { NewProjectComponent } from './new-project/new-project.component';

const routes: Routes = [
  {path:'dashboard', component: AdminComponent,
  children:[
    {path: 'newproject', component: NewProjectComponent,}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
