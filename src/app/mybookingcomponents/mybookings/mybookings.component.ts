import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit{

  constructor( private http:HttpClient){

  }

booking:any;

ngOnInit(): void {
  this.http.get<any>(`${environment.api_url}/booking/myBookings`)
  .subscribe(
    response => {
     this.booking=response;

      
    },
    error => {
   
      alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
    }
  );

}
}


