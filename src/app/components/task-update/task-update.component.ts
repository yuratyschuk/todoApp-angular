import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { Task } from 'src/task';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task: Task;
  taskId: number;
  currentDate : Date;

  constructor(private taskService: TaskService, 
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<TaskUpdateComponent> ) {
    }

  ngOnInit(): void {
    this.task = new Task();
      this.taskService.getTaskById(this.data.taskId).subscribe ( 
        data =>  { 
          console.log(data);
          this.task = data;
        }
      ); error => console.log(error);
      this.taskId = this.data.taskId;
      console.log(this.data.taskId);
  }

  onSubmit(updateToDo: NgForm) { 
    console.log(updateToDo.value);
    this.taskService.update(updateToDo.value, this.data.taskId, this.data.projectId).subscribe(
      data => { 
        console.log(data);
        this.matDialogRef.close();
      }
    );  error => console.log(error);
  }
  
  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.task.finishDate = event.value;
    console.log(event.value);

    
    this.taskService.update(this.task, this.data.taskId, this.data.projectId).subscribe ( 
      data => { 
        console.log(data);
        this.ngOnInit();
      }
    ); error => console.log(error);
  }
}
