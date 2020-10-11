import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/project';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/task';
import { ProjectService } from 'src/app/services/project/project.service';
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { TaskSaveComponent } from '../task-save/task-save.component';
import { TaskInfoComponent } from '../task-info/task-info.component';
import { NgForm } from '@angular/forms';
import { ProjectShareComponent } from '../project-share/project-share.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  projectId: number;
  currentProject: Project;
  tasks: Task[];
  taskActive: Task;
  clickEventSubscription: Subscription;
  showInputToCreateTask: boolean = false;
  isShowSubMenu: boolean = false;

  constructor(private taskService: TaskService, private projectService: ProjectService,
    private sharedService: SharedService, private matDialog: MatDialog) {

  }


  ngOnInit(): void {
    this.getParam();

  }

  getParam() {
    this.sharedService.getClickEvent().subscribe((param: any) => {
      if (param !== undefined) {

        this.getTaskList(param);
        this.getProject(param);
      }
    });
  }

  getProject(projectId: number) {
    this.projectService.getById(projectId).subscribe(
      data => {
        this.currentProject = data;
        console.log(data);
      }
    ); error => console.log(error);
  }

  getTaskList(projectId: number) {
    this.projectId = projectId;
    this.taskService.getTaskByProjectId(projectId).subscribe(
      data => {
        console.log(data);
        this.tasks = data;
      }
    ); error => console.log(error);

  }

  changeStatus(taskId: number) {

    console.log(taskId);


    this.taskService.changeTaskStatus(taskId).subscribe(
      data => {
        console.log(data);
        this.taskActive = data;
        this.ngOnInit();
      }
    ); error => console.log(error);


  }

  saveTask(toDo: NgForm) {
    this.taskService.save(toDo.value, this.projectId).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      }
    ); error => console.log(error);
    this.showInputToCreateTask = false;
  }


  onUpdate(taskId: number) {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(TaskUpdateComponent, {
        width: "600px",
        height: "600px",
        autoFocus: true,
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
          taskId: taskId
        }
      }).afterClosed().subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        }
      );
    }
  }

  openTaskInfo(taskId: number) {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(TaskInfoComponent, {
        autoFocus: true,
        width: "600px",
        height: "600px",
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
          taskId: taskId
        }
      });
    }
  }

  shareTaskOpenModalDialog() {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(ProjectShareComponent, {
        autoFocus: true,
        width: "600px",
        height: "600px",
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
        }
      })
    }
  }

  delete(taskId: number) {

    this.taskService.deleteById(taskId).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      }
    ); error => console.log(error);
  }

  createTaskShowInput() {
    this.showInputToCreateTask = true;
  }
  changeTaskShowInput() {
    this.showInputToCreateTask = false;
  }


  showSubMenu() {
    this.isShowSubMenu = true;
  }

  setPriority(priority: number, taskId: number) {

    this.taskService.updatePriority(priority, taskId).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      }
    ); error => console.log(error);

  }

  copyTask(task: Task) {

    task.id = null;
    console.log(task.id);
    this.taskService.save(task, this.projectId).subscribe(
      data => {
        console.log(data);
      }
    ); error => console.log(error);

    this.ngOnInit();
  }
}
