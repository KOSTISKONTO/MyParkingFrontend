import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.css']
})
export class AdminOwnersComponent implements OnInit{
  
  constructor(private http:HttpClient){

  }

  owners!:any;
  size_owners = 0
  ngOnInit(): void {
      this.getOwners();
  }


  getOwners(){
    this.http.get<any>(`${environment.api_url}/getOwners`)
    .subscribe(
      response => {
        this.owners=response;
        this.size_owners = this.owners.length;
      },
      error => {
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }
}
