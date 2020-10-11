import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/project';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.css']
})
export class ProjectSaveComponent implements OnInit {

  saveProject: any;

  constructor(private projectService: ProjectService, private matDialogRef: MatDialogRef<ProjectSaveComponent>) { }

  ngOnInit(): void {

  }

  onSubmit(project: NgForm) { 
    console.log(project.value);

    this.projectService.save(project.value).subscribe ( 
      data => { 
        console.log(data);
        this.saveProject = data;
      }
    ); error => console.log(error);
    
      this.matDialogRef.close([]);
  }

}
