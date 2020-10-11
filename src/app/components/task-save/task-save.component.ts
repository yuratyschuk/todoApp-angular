import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.css'],

})
export class TaskSaveComponent implements OnInit {

  constructor(private taskService: TaskService, 
    @Inject(MAT_DIALOG_DATA) public data: any ) {
     }

  ngOnInit(): void {
  }

  onSubmit(toDo: NgForm) { 
    console.log(toDo.value);
    this.taskService.save(toDo.value, this.data).subscribe(
      data => { 
        console.log(data);
        
      }
    );  error => console.log(error);
  }
}
