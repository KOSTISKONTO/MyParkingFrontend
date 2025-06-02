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
        this.customers=response;
        this.size_customers=this.customers.length;
      },
      error => {
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }
}
