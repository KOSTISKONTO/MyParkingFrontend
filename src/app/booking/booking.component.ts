
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
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit  {
availabilityForm!:FormGroup
  cityList:any;
  private sub!: Subscription;
  activeCity!:string;
  activeCityboolean=false;
  hoursbooking:number=1;
  datebooking!:any;
  timebooking!:any;
  isopen!:any;
  parkingname!:string;
  costofparking!:any;
  available!:any;
  Idparking!:any;
  parkingList: any[] = [];

  


  chunkedCities: any[][] = [];
  chunkCities() {
    const chunkSize = 5;
    for (let i = 0; i < this.cityList.length; i += chunkSize) {
      this.chunkedCities.push(this.cityList.slice(i, i + chunkSize));
    }
  }
  

  constructor(private http: HttpClient, private websocketService: WebsocketService, private auth:AuthserviceService, private router: Router, private route: ActivatedRoute){
    
  }

  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent;
  @ViewChild(TimepickerComponent) timepicker!:TimepickerComponent;
  @ViewChild(MapComponent) map!:MapComponent;
  @ViewChild('mapSection') mapSection!: ElementRef;
  
  
  getDate(){
      this.calendarComponent.selectedDate;
      this.datebooking = this.calendarComponent.formatDate(this.calendarComponent.selectedDate)
      console.log(this.datebooking);
  }

  getTime(){
    this.timebooking = this.timepicker.selectedTime;
    //console.log(this.timebooking);
    return this.timebooking;
  }


 
 
 ngOnInit(): void {

  this.route.queryParams.subscribe(params => {
    const namecity = params['namecity'];
    console.log('Name:', namecity);
    if(params['namecity']){ 
      this.setActiveCity(namecity)

    }
  });
 
  this.websocketService.getCities().subscribe((data) => {
    this.cityList = data;
    this.chunkCities();
  });


  this.sub = this.websocketService.cities$.subscribe((data) => {
    this.cityList = data;
    console.log(data);
  });

}

setActiveCity(name:string){
  this.activeCity=name;
  this.activeCityboolean=true;
  console.log(this.getTime(), this.activeCity,  this.hoursbooking);
}

availabilityy() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.getDate();
  this.getTime();
  const params = new HttpParams()
    .set('City', this.activeCity)
    .set('date', this.datebooking)
    .set('time', this.timebooking)
    .set('hours', this.hoursbooking);

  this.http.get<any>('http://localhost:8080/booking/availability', { params })
    .subscribe(
      response => {
        this.parkingList = response;

        // Φτιάχνουμε array με όλα τα requests για τις συντεταγμένες
        const coordsRequests = this.parkingList.map(p => {
          const finalAddress = p.address + ', ' + this.activeCity + ', ' + 'Ελλάδα';
          console.log(finalAddress);
          const params = new HttpParams().set('address', finalAddress);
          return this.http.get<any>('http://localhost:8080/booking/coordinates', { params }).toPromise();
        });
        console.log(coordsRequests);
        // Εκτελούμε όλα τα requests ταυτόχρονα
        Promise.all(coordsRequests).then(coordsArray => {
        
          for (let i = 0; i < this.parkingList.length; i++) {
            this.parkingList[i].lat = coordsArray[i].lat;
            this.parkingList[i].lng = coordsArray[i].lng;
          }
         console.log(this.parkingList);

          // Περνάμε τα πάρκινγκ με τα lat/lng στον χάρτη
          this.map.setMarkers(this.parkingList);

          // Optionally κάνουμε zoom/κέντρο στο πρώτο parking
          if (this.parkingList.length > 0) {
            this.map.focusOn(this.parkingList[0].lat, this.parkingList[0].lng, 13);
          }
        });

        console.log(response);
        
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
}


focusParking(parking: any) {
  this.map.focusOn(parking.lat, parking.lng);
  setTimeout(() => {
    this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);

}


book(idParking:any, cost:number){
  console.log(idParking, cost);
  this.router.navigate([
    '/finalbooking',
    idParking,
    cost,
    this.datebooking,
    this.hoursbooking,
    this.timebooking
  ]);


}




}









