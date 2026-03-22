import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit{


  constructor(private http:HttpClient){

  }

  credentials!:any;

  ngOnInit(): void {
    this.http.get<any>(`${environment.api_url}/myprofile`)
    .subscribe(
      response => {
        this.credentials=response;
        
        
      },
      error => {
        
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }

 

  


}
