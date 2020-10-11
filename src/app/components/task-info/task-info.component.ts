import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/task';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  task: Task;
  isAddDescriptionFieldShown: boolean = false;
  currentDate : Date;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public taskService: TaskService ) { 
       
  }

  ngOnInit(): void {
      this.taskService.getTaskById(this.data.taskId).subscribe ( 
        data => { 
          console.log(data);
          this.task = data;
        } 
      ); error => console.log(error);

      this.currentDate = new Date();
      console.log(this.currentDate);
  }

  changeStatus(taskId: number) { 

    console.log(taskId);
    
    this.taskService.changeTaskStatus(taskId).subscribe ( 
      data => { 
        console.log(data);
        this.ngOnInit();
      } 
    ); error => console.log(error);
  
  }

  showForm() { 
    this.isAddDescriptionFieldShown = true;
  }

  hideForm() { 
    this.isAddDescriptionFieldShown = false;
  }

  addDescription(toDo: NgForm) { 
    console.log(toDo.value);

    this.taskService.update(toDo.value, this.data.taskId, this.data.projectId).subscribe ( 
      data => { 
        console.log(data);
        this.ngOnInit();
      }
    ); error => console.log(error);
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
