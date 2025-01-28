import { Routes } from '@angular/router';
import { LoginComponent } from './files/login/login.component';
import { DashboardComponent } from './files/dashboard/dashboard.component';
import { SignupComponent } from './files/signup/signup.component';

export const routes: Routes = [
    {path: "",pathMatch:"full", redirectTo:"/login"},
    {path: "login" , component: LoginComponent},
    {path : "signup" , component : SignupComponent},
    {path : "dashboard" , component : DashboardComponent},
];
