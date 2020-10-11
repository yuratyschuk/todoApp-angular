import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {RouteGuardServiceService} from './services/routeGuard/route-guard-service.service';
import { ProjectSaveComponent } from './components/project-save/project-save.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'project', component: ProjectListComponent, canActivate:[RouteGuardServiceService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardServiceService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
