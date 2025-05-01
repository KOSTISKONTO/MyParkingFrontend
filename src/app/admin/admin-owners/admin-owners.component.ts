import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.css']
})
export class AdminOwnersComponent implements OnInit{
  
  constructor(private http:HttpClient){

  }

  owners!:any;

  ngOnInit(): void {
      this.getOwners();
  }


  getOwners(){
    this.http.get<any>('http://localhost:8080/getOwners')
    .subscribe(
      response => {
        console.log(response);
        this.owners=response;
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }
}
