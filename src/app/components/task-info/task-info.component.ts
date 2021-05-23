import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskService} from 'src/app/services/task/task.service';
import {Task} from 'src/app/models/task';
import {NgForm} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  task: Task;
  isAddDescriptionFieldShown: boolean = false;
  currentDate: Date = new Date();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.getTaskById(this.data.taskId).subscribe(
      data => {
        console.log(data);
        this.task = data;
      }
    );
    error => console.log(error);

  }

  changeStatus(taskId: number) {

    console.log(taskId);

    this.taskService.changeTaskStatus(taskId).subscribe(
      data => {
        console.log(data);
        this.task.active = data.active;
      }
    );
    error => console.log(error);

  }

  showForm() {
    this.isAddDescriptionFieldShown = !this.isAddDescriptionFieldShown;
  }

  addDescription(toDo: NgForm) {
    console.log(toDo.value);
    toDo.value.active = this.task.active;
    toDo.value.priority = this.task.priority;
    toDo.value.finishDate = this.task.finishDate;

    this.taskService.update(toDo.value, this.data.taskId, this.data.projectId).subscribe(
      data => {
        data.id = this.task.id;
        this.task = data;
      }
    );
    error => console.log(error);
  }


  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.task.finishDate = moment(event.value).format('DD-MM-yyyy HH:mm');
    console.log(event.value);


    this.taskService.update(this.task, this.data.taskId, this.data.projectId).subscribe (
      data => {
        console.log(data);
      }
    ); error => console.log(error);
  }

  convertDate(dateToConvert: string) {
    return moment(dateToConvert, 'DD-MM-yyyy HH:ss').format('DD-MM-yyyy');
  }
}
