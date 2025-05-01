
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestserviceService } from '../testservice.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebsocketService } from '../websocket.service'
import { Subscription } from 'rxjs';
import { CalendarComponent } from '../material/calendar/calendar.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { AuthserviceService } from '../authservice.service';
import { add } from 'date-fns';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit  {
availabilityForm!:FormGroup
  finalcost=-1;
  time:any;
  date:any;
  parkingid:any;
  hours:any;
  cityList:any;
  test_variable:any;
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
  

  constructor(private test:TestserviceService, private http: HttpClient, private websocketService: WebsocketService, private auth:AuthserviceService, private router: Router){
    
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
          const finalAddress = p.address + ', ' + this.activeCity;
          const params = new HttpParams().set('address', finalAddress);
          return this.http.get<any>('http://localhost:8080/booking/coordinates', { params }).toPromise();
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

        console.log(response);
        alert('Η φόρμα υποβλήθηκε επιτυχώς!');
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
}

booking(Idparking:any){
  const IsLoggin = this.auth.isLoggedIn();
  console.log(Idparking);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    
   });
  const formbooking={
  "booking_date": this.datebooking,
  "time_date": this.timebooking,
  "hours_of_booking":this.hoursbooking,
  "numberofvehicle": "AOR2545",
  "brandvehicle": "AUDI A3",
  "booking_parking": {
    "id": Idparking
  }
};
this.http.post<any>('http://localhost:8080/booking/newBooking', formbooking, {headers, withCredentials:false})
    .subscribe(
      response => {
        console.log(response);
        alert(response);
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

/*
coord(address:string){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    
   });
  
   const finalformm=address +", " + this.activeCity;
   const params = new HttpParams()
  .set('address', finalformm);
  this.http.get<any>('http://localhost:8080/booking/coordinates',{ params})
    .subscribe(
      response => {
        this.map.setMarker(response.lat, response.lng)
        console.log(response);
        alert(response);
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );

}
*/












  










































































getTest() {
  this.test.testservice().subscribe(response => {
    this.test_variable=response;
  });
}



parking = {
"parking": {
  "name_of_parking": "Paaaaaaaaaa",
  "City": "lamiaaaaaaa",
  "address": "Omonia 1",
  "TK": "10431",
  "afm": "6915096958",
  "total_spaces": 80,
  "startworking": "06:00",
  "endworking": "22:00",
  "Is24": false,
  "generalPolicyList": [
    {
      "dayType": "Daily",
      "policy": "ByLocalTimeCustom",
      "ByLocalTimeCustom": [
        {
          "fromhour": "06:00",
          "tohour": "12:00",
          "cost": 4.0
        },
        {
          "fromhour": "12:00",
          "tohour": "17:00",
          "cost": 5.5
        },
        {
          "fromhour": "17:00",
          "tohour": "22:00",
          "cost": 6.5
        }
      ]
    }
  ]
}
}



logout(): void {
localStorage.removeItem('jwt'); // 🔥 Διαγράφει το token
// optional: πας τον χρήστη στην αρχική σελίδα ή στο login

}


onSubmit(): void {

  const headers = new HttpHeaders({
   'Content-Type': 'application/json'
   
  });

  this.http.get<any>('http://localhost:8080/myprofile', { headers, withCredentials: false })
    .subscribe(
      response => {
        console.log(response);
        console.log(response.afm_owner);
        console.log(response.username);
        alert('Η φόρμα υποβλήθηκε επιτυχώς!');
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
    
}



getCookie(name: string): string | null {
const cookies = document.cookie.split('; ');
for (const cookie of cookies) {
  const [cookieName, cookieValue] = cookie.split('=');
  if (cookieName === name) {
    return decodeURIComponent(cookieValue);
  }
}
return null;
}

availability(){
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb3N0aXMiLCJpYXQiOjE3NDM2MDY3OTB9.8XzauRt035LLKmor2RZHj-SheENM9hPLwoLaNu0G-ZapI7n--_NUTnyJJCpc8J2GRA0spe3CQDPKxNC1wQVe-A'
  
 });
const parkingId = 103;
const date = '2025-04-07';        // ISO DATE format (yyyy-MM-dd)
const time = '09:00';             // ISO TIME format (HH:mm)
const hours = 2;

const params = new HttpParams()
  .set('parkingId', parkingId)
  .set('date', date)
  .set('time', time)
  .set('hours', hours);


this.http.get<any>('http://localhost:8080/booking/availability', { params})
    .subscribe(
      response => {
        this.finalcost = response.message.cost;
        this.parkingid = response.message.parkingId;
        this.time = response.message.time;
        this.date = response.message.date;
        this.hours = response.message.hours;
        console.log(this.finalcost);
        alert('Η φόρμα υποβλήθηκε επιτυχώς!');
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );


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
/*
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ2FwaSIsImlhdCI6MTc0Mzg4NzkxOX0.8fCWkTPpRhz7Zby3kwbCS2qmDB8SI9yLSjOQKNAnMj01eqlJZpuWVr3yl1FcbGQuDBZLVjz83CaTuw2obLB7bw'
  
 });

console.log(this.finalcost);
const booking = {
  time_date: this.time,
  booking_date: this.date,
  hours_of_booking: this.hours,
  cost: this.finalcost,
  nameguestguest: "myguest",
  lastnameguest: "mylast",
  emailguset: "itit22052@hua.gr",
  numberofvehicle: "AOR2545",
  brandvehicle: "AUDI A3",
  booking_parking: {
    id: this.parkingid
  }
};

this.http.post<any>('http://localhost:8080/booking/newBooking', booking, {headers, withCredentials:false})
    .subscribe(
      response => {
        console.log(response);
        alert(response);
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
*/

}



login(){
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
  
 });
const credentials={
  "username":"kostis",
  "password":"123456"

}

this.http.post<any>('http://localhost:8080/login', credentials, {headers, withCredentials:false})
.subscribe(
response => {
  console.log(response);
  const token = response.token;
  localStorage.setItem('jwt', token); // ✅ Αποθήκευση στο localStorage
  alert(response);
},
error => {
  console.error('Σφάλμα κατά την αποστολή:', error);
  alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
}
);

}
newparking(){
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
  
 });


this.http.post<any>('http://localhost:8080/parking/newParking', this.parking, {headers, withCredentials:false})
    .subscribe(
      response => {
        console.log(response);
        alert(response);
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
}
}









/* 

POP UP GIA HTML
<!--ΝΑ ΤΟ ΜΕΛΕΤΗΣΩ-->
<div *ngIf="results()" class="container">
  <div class="row">
    <!-- Για κάθε διεύθυνση της activeCity θα δημιουργηθεί ένα κουμπί -->
    <div class="col-xl-{{12 / activeCity.length}}" *ngFor="let address of activeCity; let i = index">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" 
              data-bs-toggle="modal" [attr.data-bs-target]="'#exampleModal' + i">
        {{ address }}
      </button>
    </div>
  </div>
</div>

<!-- Modal (για κάθε διεύθυνση ξεχωριστά) -->
<div *ngFor="let address of activeCity; let i = index">
  <div class="modal fade" [id]="'exampleModal' + i" tabindex="-1" aria-labelledby="'exampleModalLabel' + i" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" [id]="'exampleModalLabel' + i">{{ address }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Εδώ μπορείς να τοποθετήσεις οποιαδήποτε πληροφορία που θέλεις να εμφανίζεται στο Modal -->
          Πληροφορίες για την διεύθυνση {{ address }}.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Κλείσιμο</button>
          <button type="button" class="btn btn-primary">Αποθήκευση αλλαγών</button>
        </div>
      </div>
    </div>
  </div>
</div>
*/

