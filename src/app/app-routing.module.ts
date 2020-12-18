import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { AuthGuard } from './auth/auth.gaurd';

const routes: Routes = [
    // {path: '', pathMatch: 'full', redirectTo: 'maintenance'},
    // {path: 'maintenance', component: MaintenanceComponent},
    // {path: '**', redirectTo: 'maintenance'}
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'maintenance'}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
