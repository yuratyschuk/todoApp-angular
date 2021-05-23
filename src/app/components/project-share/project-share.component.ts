import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project/project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-share',
  templateUrl: './project-share.component.html',
  styleUrls: ['./project-share.component.css']
})
export class ProjectShareComponent implements OnInit {

  credentials: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<ProjectShareComponent>,
  private projectService: ProjectService) { }

  ngOnInit(): void {


  }


  onSubmit() {
    console.log(this.credentials);

    this.projectService.share(this.credentials, this.data.projectId).subscribe (
      data => {
        console.log(data);
        this.matDialogRef.close();
      }
    ); error => console.log(error);
  }
}
