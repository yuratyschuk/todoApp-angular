import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {RouteGuardServiceService} from './services/routeGuard/route-guard-service.service';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'project', component: ProjectListComponent, canActivate: [RouteGuardServiceService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardServiceService]},
  {path: '**', redirectTo: '/project'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
