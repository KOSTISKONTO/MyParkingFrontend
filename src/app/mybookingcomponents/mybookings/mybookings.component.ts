import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


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
  this.http.get<any>('http://localhost:8080/booking/myBookings')
  .subscribe(
    response => {
     this.booking=response;
     console.log(this.booking)
      
    },
    error => {
      console.error('Σφάλμα κατά την αποστολή:', error);
      alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
    }
  );

}
}


