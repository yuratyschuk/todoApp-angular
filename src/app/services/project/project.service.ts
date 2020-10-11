import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/project';

  constructor(private httpClient: HttpClient) {
  }

  getById(projectId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${projectId}`);
  }

  save(project: object): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}/create`, project);
  }

  update(projectId: number, project: object): Observable<object> {
    return this.httpClient.put(`${this.baseUrl}/edit/${projectId}`, project);
  }

  deleteById(projectId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${projectId}`);
  }

  getProjectListByUsername(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/projectList`);
  }

  getAll(): Observable<any> { 
    return this.httpClient.get(`${this.baseUrl}/getAll`)
  }

  share(credentials: string, projectId: number): Observable<any> { 
    const params = new URLSearchParams();
    params.append('credentials', credentials);
    return this.httpClient.post(`${this.baseUrl}/share/${projectId}`,{}, { 
      params: {
        'credentials': credentials
      }
    });
  }

  
}
