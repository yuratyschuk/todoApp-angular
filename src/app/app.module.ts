import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DemoMaterialModule} from 'src/app/material-module';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpIntercepterJwtAuthServiceService} from './services/http/http-intercepter-jwt-auth-service.service';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './components/logout/logout.component';
import {LoginComponent} from './components/login/login.component';
import {TaskUpdateComponent} from './components/task-update/task-update.component';
import {TaskSaveComponent} from './components/task-save/task-save.component';
import {ProjectSaveComponent} from './components/project-save/project-save.component';
import {TaskInfoComponent} from './components/task-info/task-info.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {ProjectShareComponent} from './components/project-share/project-share.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    TaskListComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    TaskUpdateComponent,
    TaskSaveComponent,
    ProjectSaveComponent,
    TaskInfoComponent,
    ProjectShareComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    FontAwesomeModule,
    DemoMaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterJwtAuthServiceService, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent],
  entryComponents: [TaskUpdateComponent, TaskSaveComponent, ProjectSaveComponent, TaskInfoComponent]
})
export class AppModule {
}
