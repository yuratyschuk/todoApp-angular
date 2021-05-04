import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'test';
  password = 'test';
  invalidLogin: boolean;
  errorMessage = 'Invalid Credentials';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  handleAuthLogin(): void {
    this.authenticationService.authenticate(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['project']);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    );
  }
}
