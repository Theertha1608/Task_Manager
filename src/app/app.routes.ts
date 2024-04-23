import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path:"signup",
        loadComponent: () => import('./Components/Authentication/signup/signup.component').then((c) => c.SignupComponent)
    },
    { path: 'dashboard', component: DashboardComponent },
];
