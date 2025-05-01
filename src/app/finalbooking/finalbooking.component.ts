import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-finalbooking',
  templateUrl: './finalbooking.component.html',
  styleUrls: ['./finalbooking.component.css']
})
export class FinalbookingComponent implements OnInit {
finalbookingForm!:FormGroup
idParking!:any;
date!:any;
time!:any;
cost!:any;
hours!:any;


  constructor(private fb:FormBuilder, private auth:AuthserviceService, private route:ActivatedRoute, private http: HttpClient, private routere:Router){
    this.finalbookingForm = this.fb.group({
      name:['', Validators.required],
      last:['', Validators.required],
      email:['', Validators.required],
      vehicle:['', Validators.required],
      numberofvehicle:['', Validators.required]
    })
  }

  ngOnInit() {
    this.idParking = this.route.snapshot.paramMap.get('idParking');
    this.cost = this.route.snapshot.paramMap.get('cost');
    this.date = this.route.snapshot.paramMap.get('date');
    this.time = this.route.snapshot.paramMap.get('time');
    this.hours = this.route.snapshot.paramMap.get('hours');
  }

  isLoggin():boolean{
    return this.auth.isLoggedIn();
  }

  sumbit(){
    if (!this.isLoggin()){
      if(this.finalbookingForm.get('name')?.invalid ||
    this.finalbookingForm.get('last')?.invalid ||
    this.finalbookingForm.get('email')?.invalid ||
    this.finalbookingForm.get('vehicle')?.invalid ||
    this.finalbookingForm.get('numberofvehicle')?.invalid)
      {
      this.finalbookingForm.markAllAsTouched();
      return;
      }
    
    }
  else{
    if(
    this.finalbookingForm.get('vehicle')?.invalid ||
    this.finalbookingForm.get('numberofvehicle')?.invalid)
      {
      this.finalbookingForm.markAllAsTouched();
      return;
      }

  }
      
  

     const headers = new HttpHeaders({
        'Content-Type': 'application/json'
        
       });
    
    let finalform={}
    if (this.isLoggin()){
      finalform={
        "booking_date": this.date,
          "time_date": this.time,
          "hours_of_booking":this.hours,
          "numberofvehicle": this.finalbookingForm.get('numberofvehicle')?.value,
          "brandvehicle": this.finalbookingForm.get('vehicle')?.value,
          "cost":this.cost,
          "booking_parking": {
            "id": this.idParking
          }
        }
    }
    else{
      finalform={
        "booking_date": this.date,
          "time_date": this.time,
          "hours_of_booking":this.hours,
          "numberofvehicle": this.finalbookingForm.get('numberofvehicle')?.value,
          "brandvehicle": this.finalbookingForm.get('vehicle')?.value,
          "cost":this.cost,
          nameguestguest:this.finalbookingForm.get('name')?.value,
          lastnameguest:this.finalbookingForm.get('last')?.value,
          emailguset:this.finalbookingForm.get('email')?.value,
          "booking_parking": {
            "id": this.idParking
          }
        }
    }
    console.log(finalform);
    
    this.http.post<any>('http://localhost:8080/booking/newBooking', finalform, {headers, withCredentials:false})
    .subscribe(
      response => {
        console.log(response);
        alert(response);
        this.routere.navigate(['']);
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
    
  }


}
