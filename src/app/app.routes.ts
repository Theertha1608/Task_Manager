import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SideNavbarComponent } from './Components/side-navbar/side-navbar.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import { TaskTableComponent } from './Components/task-table/task-table.component';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { AuthGuard } from './Guards/auth.guard';



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: "signup", loadComponent: () => import('./Components/Authentication/signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'side-navbar', component: SideNavbarComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
    { path: 'task-table', component: TaskTableComponent, canActivate: [AuthGuard] },
    { path: 'task-details/:id', component: TaskDetailsComponent, canActivate: [AuthGuard] },
    { path: 'pie-chart', component: PieChartComponent, canActivate: [AuthGuard] }
  ];
