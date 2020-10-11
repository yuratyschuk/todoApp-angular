import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterJwtAuthServiceService implements HttpInterceptor {

  constructor(private  authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) { 

    let jwtAuthHeader = this.authenticationService.getAuthenticatedToken();
    let username = this.authenticationService.getAuthenticatedUser();
    console.log(jwtAuthHeader);

    if(jwtAuthHeader && username) { 
      request = request.clone({
        setHeaders : {
            Authorization : jwtAuthHeader
          }
        }) 
    }
    return next.handle(request);
  }

}
