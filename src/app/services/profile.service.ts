import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class ProfileService {

 constructor(private http:HttpClient){}

 getCustomer(){

  return this.http.get(
   'http://localhost:8080/customer/profile'
  );

 }

 getProfile(){

  return this.http.get(
   'http://localhost:8080/profile/my'
  );

 }

 createProfile(data:any){

  return this.http.post(
   'http://localhost:8080/profile/create',
   data
  );

 }
 updateProfile(data:any){

return this.http.put(

"http://localhost:8080/profile/update",

data

);

}

}

// Customer info and KYC info come from different APIs.
// Angular was calling /customer/my which does not exist.