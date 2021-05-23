import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {Project} from 'src/app/models/project';
import {TaskService} from 'src/app/services/task/task.service';
import {Task} from 'src/app/models/task';
import {ProjectService} from 'src/app/services/project/project.service';
import {SharedService} from 'src/app/services/sharedService/shared.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TaskUpdateComponent} from '../task-update/task-update.component';
import {TaskSaveComponent} from '../task-save/task-save.component';
import {TaskInfoComponent} from '../task-info/task-info.component';
import {NgForm} from '@angular/forms';
import {ProjectShareComponent} from '../project-share/project-share.component';

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
  showInputToCreateTask = false;
  isShowSubMenu = false;
  projectList: Project[];

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
    this.projectService.getAll().subscribe(
      data => {
        this.projectList = data;
        this.currentProject = this.projectList.find(project => project.id === projectId);
        console.log(data);
      }
    );
    error => console.log(error);
  }

  getTaskList(projectId: number) {
    this.projectId = projectId;
    this.taskService.getTaskByProjectId(projectId).subscribe(
      data => {
        console.log(data);
        this.tasks = data;
      }
    );
    error => console.log(error);

  }

  changeStatus(taskId: number) {
    const currentTask = this.tasks.find(task => task.id === taskId);
    currentTask.active = !currentTask.active;

    console.log(taskId);
    this.taskService.changeTaskStatus(taskId).subscribe(
      data => {
        console.log(data);
        this.taskActive = data;
      }
    );
    error => console.log(error);


  }

  saveTask(toDo: NgForm) {
    this.taskService.save(toDo.value, this.projectId).subscribe(
      data => {
        console.log(data);
        this.tasks.push(data);
      }
    );
    error => console.log(error);
    this.showInputToCreateTask = false;
  }


  onUpdate(taskId: number) {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(TaskUpdateComponent, {
        width: '600px',
        height: '400px',
        autoFocus: true,
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
          taskId
        }
      }).afterClosed().subscribe(
        data => {
          const currentIndex = this.tasks.findIndex(task => task.id === data.id);
          this.tasks[currentIndex] = data;
        }
      );
    }
  }

  openTaskInfo(taskId: number) {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(TaskInfoComponent, {
        autoFocus: true,
        width: '600px',
        height: '500px',
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
          taskId
        }
      });
    }
  }

  shareProjectOpenModalDialog() {
    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(ProjectShareComponent, {
        autoFocus: true,
        width: '600px',
        height: '200px',
        panelClass: 'mat-dialog-background',
        data: {
          projectId: this.projectId,
        }
      });
    }
  }

  delete(taskId: number) {
    this.taskService.deleteById(taskId).subscribe(
      data => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log(data);
      }
    );
    error => console.log(error);
  }

  showOrHideTaskCreateInput() {
    this.showInputToCreateTask = !this.showInputToCreateTask;
  }

  setPriority(priority: number, taskId: number) {
    this.taskService.updatePriority(priority, taskId).subscribe(
      data => {
        const currentTask = this.tasks.find(task => task.id === taskId);
        currentTask.priority = priority;
      }
    );
    error => console.log(error);

  }

  copyTask(task: Task) {
    this.taskService.save(task, this.projectId).subscribe(
      data => {
        console.log(data);
        this.tasks.push(data);
      }
    );
    error => console.log(error);
  }

  moveTaskToAnotherProject(currentTask: Task, projectId: number) {
    this.taskService.update(currentTask, currentTask.id, projectId).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== currentTask.id);
      }
    ); error => console.log(error);
  }
}
