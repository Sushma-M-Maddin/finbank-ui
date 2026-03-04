import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: any = {};
  accountType: string = 'Customer';

  constructor(

    private service: CustomerService,
    private router: Router

  ) { }

  login() {

    this.service.login(this.loginData)

      .subscribe({
        next: (response: any) => {
          console.log("TOKEN RECEIVED:", response);
          localStorage.setItem("token", response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error("Login Error:", err);
          if (err.status === 0) {
            alert("Unable to connect to the server. Please ensure the backend is running.");
          } else {
            alert("Login failed. Please check your credentials.");
          }
        }
      });

  }


}
