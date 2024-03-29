import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from "../../models/appConstants";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = AppConstants.API_BASE_URL + '/tasks';

  constructor(private http: HttpClient) {
  }

  getTaskByProjectId(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${projectId}`);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${taskId}`);
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  changeTaskStatus(taskId: number): Observable<any> {

    return this.http.put(`${this.baseUrl}/active/${taskId}`, {});
  }

  save(task: any, projectId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/save/${projectId}`, task);
  }

  update(task: any, taskId: number, projectId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/update/${taskId}/projects/${projectId}`, task);
  }

  deleteById(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${taskId}`);
  }

  updatePriority(priority: any, taskId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/priority/${taskId}`, {}, {
      params: {
        'priority': priority
      }
    });
  }
}
