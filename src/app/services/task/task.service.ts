import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task} from 'src/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/task';

  constructor(private http: HttpClient) { }

  getTaskByProjectId(projectId: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/taskList/${projectId}`);
  }

  getTaskById(taskId: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/${taskId}`);
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  changeTaskStatus(taskId: number): Observable<any> { 

    return this.http.put(`${this.baseUrl}/taskActive/${taskId}`, {});
  }

  save(task: any, projectId: number) :Observable<any>{ 
    return this.http.post(`${this.baseUrl}/taskSave/${projectId}`, task);
  }

  update(task: any, taskId: number, projectId: number): Observable<any> { 
    return this.http.put(`${this.baseUrl}/taskUpdate/${taskId}/projects/${projectId}`, task);
  }

  deleteById(taskId: number): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/taskDelete/${taskId}`);
  }

  updatePriority(priority: any, taskId: number): Observable<any> { 
    return this.http.put(`${this.baseUrl}/priority/${taskId}`, {}, {
      params: {
        'priority': priority
      }
    });
  }
}
