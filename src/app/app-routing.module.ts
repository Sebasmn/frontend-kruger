import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEmployeesComponent } from './components/admin-components/manage-employees/manage-employees.component';
import { LoginComponent } from './components/bothusers-components/login/login.component';
import { PersonalInformationComponent } from './components/employee-components/personal-information/personal-information.component';
import { AuthGuard } from './_guards/auth.guard';
import { LogindGuard } from './_guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogindGuard] },
  { path: 'adminpanel', component: ManageEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employeepanel', component: PersonalInformationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
