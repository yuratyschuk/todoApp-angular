import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from "../../models/appConstants";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = AppConstants.API_BASE_URL + '/projects';

  constructor(private httpClient: HttpClient) {
  }

  getById(projectId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${projectId}`);
  }

  save(project: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/save`, project);
  }

  update(projectId: number, project: object): Observable<object> {
    return this.httpClient.put(`${this.baseUrl}/edit/${projectId}`, project);
  }

  deleteById(projectId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${projectId}`);
  }

  getProjectListByUsername(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/list`);
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAll`);
  }

  share(credentials: string, projectId: number): Observable<any> {
    const params = new URLSearchParams();
    params.append('credentials', credentials);
    return this.httpClient.post(`${this.baseUrl}/share/${projectId}`, {}, {
      params: {
        'credentials': credentials
      }
    });
  }


}
