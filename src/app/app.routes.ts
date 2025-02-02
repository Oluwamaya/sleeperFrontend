import { Routes } from '@angular/router';
import { LoginComponent } from './files/login/login.component';
import { DashboardComponent } from './files/dashboard/dashboard.component';
import { SignupComponent } from './files/signup/signup.component';
import { TaskComponent } from './files/task/task.component';
import { PlanComponent } from './files/plan/plan.component';
import { TeamComponent } from './files/team/team.component';
import { ProfilrComponent } from './files/profilr/profilr.component';
import { NavbarComponent } from './files/navbar/navbar.component';

export const routes: Routes = [
    {path: "",pathMatch:"full", redirectTo:"/login"},
    {path: "login" , component: LoginComponent},
    {path : "signup" , component : SignupComponent},
    { path: 'signup/:referralCode', component: SignupComponent },
    {path : "navbar" , component: NavbarComponent},
    {path : "dashboard" , component : DashboardComponent},
    {path: "task" , component : TaskComponent},
    {path : "plans" , component: PlanComponent},
    {path : "referral" , component: TeamComponent},
    {path : "profile" ,  component : ProfilrComponent}

];
