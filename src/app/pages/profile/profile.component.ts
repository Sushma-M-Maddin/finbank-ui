import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    customer: any = {};

    kyc: any = {};

    profileExists = false;
    editMode = false;
    constructor(private service: ProfileService) { }

    ngOnInit() {

        // Load Account Info

        this.service.getCustomer()

            .subscribe((data: any) => {

                this.customer = data;

                console.log("Customer:", data);

            });


        // Load KYC Details

        this.service.getProfile()

            .subscribe({

                next: (data: any) => {

                    this.kyc = data;

                    this.profileExists = true;

                    console.log("KYC:", data);

                },

                error: (err) => {

                    this.profileExists = false;

                    console.log("No KYC Yet");

                }

            });

    }


    createProfile() {
        this.service.createProfile(this.kyc).subscribe({
            next: (res: any) => {
                alert("Profile Created Successfully!");
                location.reload();
            },
            error: (err) => {
                console.error("Profile Creation Error:", err);
                if (err.status === 0) {
                    alert("Unable to connect to the server.");
                } else {
                    alert("Failed to create profile. Please check the details.");
                }
            }
        });
    }

    updateProfile() {
        this.service.updateProfile(this.kyc).subscribe({
            next: (res: any) => {
                alert("Profile Updated Successfully!");
                this.editMode = false;
            },
            error: (err) => {
                console.error("Profile Update Error:", err);
                if (err.status === 0) {
                    alert("Unable to connect to the server.");
                } else {
                    alert("Failed to update profile.");
                }
            }
        });
    }

}