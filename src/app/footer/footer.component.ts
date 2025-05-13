import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { TestserviceService } from '../testservice.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebsocketService } from '../websocket.service'
import { Subscription } from 'rxjs';
import { CalendarComponent } from '../material/calendar/calendar.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { AuthserviceService } from '../authservice.service';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  cityList:any;
  private sub!: Subscription;
  chunkedCities: any[][] = [];
  

  constructor(private http: HttpClient, private websocketService: WebsocketService, private auth:AuthserviceService, private router: Router){
    
  }

   ngOnInit(): void {
 
  this.websocketService.getCities().subscribe((data) => {
    this.cityList = data;
    this.chunkCities();
  });


  this.sub = this.websocketService.cities$.subscribe((data) => {
    this.cityList = data;
    console.log(data);
  });

}
chunkCities() {
    const chunkSize = 5;
    for (let i = 0; i < this.cityList.length; i += chunkSize) {
      this.chunkedCities.push(this.cityList.slice(i, i + chunkSize));
    }
  }

  bookingpage(city:any){
    this.router.navigate(['/booking'], { queryParams: { namecity: city } })
  }
  
}
