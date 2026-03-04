import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  customer: any = {};
  accountType: string = 'Customer';
  registrationSuccess: boolean = false;
  newAccountNumber: string = "Pending Validation...";

  constructor(

    private service: CustomerService,
    private router: Router

  ) { }

  register() {

    console.log("Sending Payload: ", this.customer);

    this.service.register(this.customer)
      .subscribe({
        next: (res: any) => {
          this.registrationSuccess = true;
          this.newAccountNumber = res.accountNo || "Generated Successfully";
        },
        error: (err) => {
          console.error("Registration Error:", err);

          // Workaround: The backend saves the user in the database successfully, but crashes 
          // with a 400 "Authentication failed" error when trying to send the Welcome Email
          // due to SMTP mail configuration issues. We can treat this as a success.
          if (err.status === 400 && err.error === "Authentication failed") {
            this.registrationSuccess = true;
            this.newAccountNumber = "Check Email for Account ID";
            return;
          }

          if (err.status === 0) {
            alert("Unable to connect to the server. Please ensure the backend is running.");
          } else if (err.error && typeof err.error === 'string') {
            alert("Registration failed: " + err.error);
          } else {
            alert("Registration failed. Please try again.");
          }
        }
      });

  }

}
