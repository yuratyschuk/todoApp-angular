import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from 'src/app/services/project/project.service';
import {Project} from 'src/app/models/project';
import {TaskListComponent} from '../task-list/task-list.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NgModel, NgForm} from '@angular/forms';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {SharedService} from 'src/app/services/sharedService/shared.service';
import {ProjectSaveComponent} from '../project-save/project-save.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  id: number;
  showCreateButton = true;

  @Output('change')
  change = new EventEmitter();

  constructor(private projectService: ProjectService, private authenticationService: AuthenticationService,
              private sharedService: SharedService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.projectService.getProjectListByUsername().subscribe(
      data => {
        console.log(data);
        this.projects = data;
      }
    );
    error => console.log(error);
  }

  onSubmit(form: NgForm) {
    this.id = Number(JSON.stringify(form.controls.id.value));
    console.log(this.id);
    this.sharedService.sendClickEvent(this.id);
  }

  onCreate() {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(ProjectSaveComponent, {
        autoFocus: true,
        width: '600px',
        height: '200px',
        panelClass: 'mat-dialog-background'
      }).afterClosed().subscribe(
        data => {
          if (data) {
            this.projects.push(data);
          }
        }
      );
    }
  }


}

