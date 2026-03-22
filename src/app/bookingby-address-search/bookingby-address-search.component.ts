import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { CalendarComponent } from '../material/calendar/calendar.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { AuthserviceService } from '../authservice.service';
import { MapComponent } from '../map/map.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookingby-address-search',
  templateUrl: './bookingby-address-search.component.html',
  styleUrls: ['./bookingby-address-search.component.css']
})
export class BookingbyAddressSearchComponent implements OnInit{
  constructor(private route: ActivatedRoute, private http:HttpClient, private router:Router) {}
  adress!:any;
  hoursbooking:number=1;
  parkingList: any[] = [];
  datebooking!:any;
  timebooking!:any;
  responcee:any;
  distances:any[] = []

  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent;
  @ViewChild(TimepickerComponent) timepicker!:TimepickerComponent;
  @ViewChild(MapComponent) map!:MapComponent;
  @ViewChild('mapSection') mapSection!: ElementRef;


  ngOnInit(): void {
     
       this.route.params.subscribe(params => {
        this.adress=params['address'];
      
        this.http.get<any>(`${environment.api_url}/booking/todo`, {
          params: {address: this.adress}
        }).subscribe({
          next:(res:any)=>{
          
            this.distances=res;
            this.responcee=res;
           
          }
        })
  });
  const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
  }
  ngAfterViewInit(): void {
    // Καθυστέρηση μικρή για να φορτώσουν σωστά τα components
    setTimeout(() => {
      this.getDate();
      this.getTime();
      
        this.fetchAvailability(this.responcee);
      
    }, 1000);
  }


  fetchAvailability(responcee: any): void {
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('el-GR');
    const params = new HttpParams()
      .set('City', responcee[0].City)
      .set('date', this.datebooking)
      .set('time', this.timebooking)
      .set('hours', this.hoursbooking);
  
  
    this.http.get<any>(`${environment.api_url}/booking/availability`, { params })
      .subscribe(
        response => {
          this.parkingList = response;
          this.parkingList.forEach(p => {
            const extra = this.distances.find(e => e.Address === p.address);
            if (extra) {
              p.duration = extra.Duration;
              p.distance = extra.Distance;
              p.name = extra.Name;
              p.city = extra.City;
            }
          });
          
  
          // Φτιάχνουμε array με όλα τα requests για τις συντεταγμένες
          const coordsRequests = this.parkingList.map(p => {
            const finalAddress = p.address + ', ' + responcee[0].City + ', ' + 'Ελλάδα';
           
            const params = new HttpParams().set('address', finalAddress);
            return this.http.get<any>(`${environment.api_url}/booking/coordinates`, { params }).toPromise();
          });
         
          // Εκτελούμε όλα τα requests ταυτόχρονα
          Promise.all(coordsRequests).then(coordsArray => {
          
            for (let i = 0; i < this.parkingList.length; i++) {
              this.parkingList[i].lat = coordsArray[i].lat;
              this.parkingList[i].lng = coordsArray[i].lng;
            }
           
  
            // Περνάμε τα πάρκινγκ με τα lat/lng στον χάρτη
            this.map.setMarkers(this.parkingList);
  
            // Optionally κάνουμε zoom/κέντρο στο πρώτο parking
            if (this.parkingList.length > 0) {
              this.map.focusOn(this.parkingList[0].lat, this.parkingList[0].lng, 13);
            }
          });
  
       
       
        },
        error => {
         
          alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
        }
      );

}

getDate(){
  this.calendarComponent.selectedDate;
  this.datebooking = this.calendarComponent.formatDate(this.calendarComponent.selectedDate)
  
}

getTime(){
this.timebooking = this.timepicker.selectedTime;

return this.timebooking;
}


book(idParking:any, cost:number){
  
  this.router.navigate([
    '/finalbooking',
    idParking,
    cost,
    this.datebooking,
    this.hoursbooking,
    this.timebooking
  ]);
}

focusParking(parking: any) {
  this.map.focusOn(parking.lat, parking.lng);
  setTimeout(() => {
    this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);

}

availabilityy() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.getDate();
  this.getTime();
  const params = new HttpParams()
    .set('City', this.responcee[0].City)
    .set('date', this.datebooking)
    .set('time', this.timebooking)
    .set('hours', this.hoursbooking);

  this.http.get<any>(`${environment.api_url}/booking/availability`, { params })
    .subscribe(
      response => {
        this.parkingList = response;
        this.parkingList.forEach(p => {
            const extra = this.distances.find(e => e.Address === p.address);
            if (extra) {
              p.duration = extra.Duration;
              p.distance = extra.Distance;
              p.name = extra.Name;
              p.city = extra.City;
            }
          });

        // Φτιάχνουμε array με όλα τα requests για τις συντεταγμένες
        const coordsRequests = this.parkingList.map(p => {
          const finalAddress = p.address + ', ' + this.responcee[0].City + ', ' + 'Ελλάδα';
          
          const params = new HttpParams().set('address', finalAddress);
          return this.http.get<any>(`${environment.api_url}/booking/coordinates`, { params }).toPromise();
        });
        
        // Εκτελούμε όλα τα requests ταυτόχρονα
        Promise.all(coordsRequests).then(coordsArray => {
        
          for (let i = 0; i < this.parkingList.length; i++) {
            this.parkingList[i].lat = coordsArray[i].lat;
            this.parkingList[i].lng = coordsArray[i].lng;
          } 
         

          // Περνάμε τα πάρκινγκ με τα lat/lng στον χάρτη
          this.map.setMarkers(this.parkingList);

          // Optionally κάνουμε zoom/κέντρο στο πρώτο parking
          if (this.parkingList.length > 0) {
            this.map.focusOn(this.parkingList[0].lat, this.parkingList[0].lng, 13);
          }
        });

      
      },
      error => {
   
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );


}



}
