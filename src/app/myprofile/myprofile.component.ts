import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    this.http.get<any>('http://localhost:8080/myprofile')
    .subscribe(
      response => {
        this.credentials=response;
        //console.log(this.credentials);
        
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }

 

  


}
