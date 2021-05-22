import {Component, OnInit} from '@angular/core';
import {ProjectService} from 'src/app/services/project/project.service';
import {NgForm} from '@angular/forms';
import {Project} from 'src/app/models/project';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.css']
})
export class ProjectSaveComponent implements OnInit {

  saveProject: Project;

  constructor(private projectService: ProjectService, private matDialogRef: MatDialogRef<ProjectSaveComponent>) {
  }

  ngOnInit(): void {

  }

  onSubmit(project: NgForm) {
    this.projectService.save(project.value).subscribe(
      data => {
        console.log(data);
        this.matDialogRef.close(data);
      }
    );
    error => console.log(error);
  }

}
