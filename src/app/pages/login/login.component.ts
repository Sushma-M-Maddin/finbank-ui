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
  errorMessage: string = '';

  constructor(

    private service: CustomerService,
    private router: Router

  ) { }

  login() {

    this.errorMessage = '';
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
            this.errorMessage = "Unable to connect to the server. Please ensure the backend is running.";
          } else {
            // Fetch error message from backend if available
            const backendError = err.error;
            if (backendError && typeof backendError === 'string') {
              this.errorMessage = backendError;
            } else if (backendError && backendError.message) {
              this.errorMessage = backendError.message;
            } else {
              this.errorMessage = "Login failed. Please check your credentials.";
            }
          }
        }
      });

  }


}
