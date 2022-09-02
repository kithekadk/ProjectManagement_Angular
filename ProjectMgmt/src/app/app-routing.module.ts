import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardGuard } from './modules/auth/auth-guard.guard';

const routes: Routes = [
  {path:'', redirectTo:'/home/main', pathMatch:'full'},

  {path:'home', component:HeaderComponent,

  children:[
   {path:'main', component:HomePageComponent}, 
   {
    path:'auth', 
    loadChildren:()=>import('./modules/auth/auth.module')
    .then(mod=>mod.AuthModule)
  },
    {
      path:'user', 
      loadChildren:()=>import('./modules/user/user.module')
    .then(mod=>mod.UserModule),canActivate: [AuthGuardGuard]}
  ]},
  
  {path:'admin', loadChildren:()=>import('./modules/admin/admin.module')
  .then(mod=>mod.AdminModule),canActivate: [AuthGuardGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
