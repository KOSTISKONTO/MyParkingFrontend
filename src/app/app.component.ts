import { Component, OnInit } from '@angular/core'; // ✅ πρόσθεσε OnInit
import { AuthserviceService } from 'src/app/authservice.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  // ✅ implements OnInit

  title = 'myParking_Frontend';



  constructor(private authService: AuthserviceService){}

  ngOnInit(): void {
    
  }  
}
