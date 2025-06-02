import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit{
  constructor(private http:HttpClient){

  }

  customers!:any;
  size_customers = 0

  ngOnInit(): void {
      this.getCustomers();
  }

  getCustomers(){
    this.http.get<any>('http://localhost:8080/getCustomers')
    .subscribe(
      response => {
        console.log(response);
        this.customers=response;
        console.log(this.customers.length);
        this.size_customers=this.customers.length;
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }
}
