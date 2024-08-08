import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/oldComponents/login/login.component";
import {SignupComponent} from "./components/oldComponents/signup/signup.component";
import {authGuard} from "./guard/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardComponent} from "./components/oldComponents/dashbord/dashboard.component";
import {ForgotpassComponent} from "./components/oldComponents/forgotpass/forgotpass.component";
import {NewloginComponent} from "./components/newlogin/newlogin.component";
import {NewsignupComponent} from "./components/newsignup/newsignup.component";
import {NewforgotpassComponent} from "./components/newforgotpass/newforgotpass.component";
import {GhostforgotComponent} from "./components/oldComponents/ghostforgot/ghostforgot.component";
import {HeaderComponent} from "./components/header/header.component";
import {NewdashboardComponent} from "./components/newdashboard/newdashboard.component";
import {EditDataComponent} from "./components/edit-data/edit-data.component";


const routes: Routes = [
  { path: '', redirectTo: '/newlogin', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'newlogin', component:NewloginComponent},
  {path:'signup',component: SignupComponent},
  {path:'newsingup', component: NewsignupComponent },
  {path:'resetpass', component: ForgotpassComponent},
  {path:'forgotpass', component:NewforgotpassComponent},
  {path:'profile', component:ProfileComponent},
  {path:'dashboard', component: DashboardComponent,  canActivate:[authGuard]},
  {path:'newdashboard', component: NewdashboardComponent,  canActivate:[authGuard]},
  {path:'profile:id',component: ProfileComponent, canActivate:[authGuard]},
  {path:'edit/:id', component:EditDataComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
