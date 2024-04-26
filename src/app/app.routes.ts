import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SideNavbarComponent } from './Components/side-navbar/side-navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path:"signup",
        loadComponent: () => import('./Components/Authentication/signup/signup.component').then((c) => c.SignupComponent)
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'side-navbar', component: SideNavbarComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'create-task', component: CreateTaskComponent},
];
