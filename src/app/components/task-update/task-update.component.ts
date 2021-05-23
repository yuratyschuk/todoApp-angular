import {Component, OnInit, Inject} from '@angular/core';
import {TaskService} from 'src/app/services/task/task.service';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/models/task';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task: Task;
  taskId: number;
  currentDate: Date = new Date();

  constructor(private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<TaskUpdateComponent>) {
  }

  ngOnInit(): void {
    this.task = new Task();
    this.taskService.getTaskById(this.data.taskId).subscribe(
      data => {
        this.task = data;
      }
    );
    error => console.log(error);
    this.taskId = this.data.taskId;
  }

  onSubmit(updateToDo: NgForm) {
    this.taskService.update(updateToDo.value, this.data.taskId, this.data.projectId).subscribe(
      data => {
        data.id = this.task.id;
        this.matDialogRef.close(data);
      }
    );
    error => console.log(error);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.task.finishDate = moment(event.value).format('DD-MM-yyyy HH:mm');
  }

  convertDate(dateToConvert: string) {
    return moment(dateToConvert, 'DD-MM-yyyy HH:mm').format('DD-MM-yyyy');
  }
}
