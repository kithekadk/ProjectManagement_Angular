import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogUpComponent } from './log-up/log-up.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'1', component: LogUpComponent},
  {path:'2', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
