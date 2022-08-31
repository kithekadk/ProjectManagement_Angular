import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:'', redirectTo:'/home/main', pathMatch:'full'},
  {path:'home', component:HeaderComponent,
  children:[
   {path:'main', component:HomePageComponent}, 
   {path:'auth', loadChildren:()=>import('./modules/auth/auth.module')
    .then(mod=>mod.AuthModule)},
    {path:'user', loadChildren:()=>import('./modules/user/user.module')
    .then(mod=>mod.UserModule)}
  ]},
  {path:'admin', loadChildren:()=>import('./modules/admin/admin.module')
  .then(mod=>mod.AdminModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
