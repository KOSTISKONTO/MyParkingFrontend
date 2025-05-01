import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MyparkingComponent } from 'src/app/myparking/myparking.component';

@Component({
  selector: 'app-admin-parkings',
  templateUrl: './admin-parkings.component.html',
  styleUrls: ['./admin-parkings.component.css']
})
export class AdminParkingsComponent implements OnInit{
  parkings!:any;
  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
      this.getParkings();
  }



  getParkings(){
    this.http.get<any>('http://localhost:8080/parking/getParkings')
    .subscribe(
      response => {
        console.log(response);
        this.parkings=response;

      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }


  getfiles(file: any) {
    let fullPath: string;
  
    if (typeof file === 'object' && file.fullPath) {
      // Χρησιμοποίησε μόνο το όνομα του αρχείου από το fullPath
      fullPath = file.fullPath.split('\\').pop() || file.fullPath.split('/').pop() || '';
    } else if (typeof file === 'string') {
      fullPath = file;
    } else {
      alert("Μη έγκυρο αρχείο.");
      return;
    }
  
    if (!fullPath) {
      alert("Δεν βρέθηκε όνομα αρχείου.");
      return;
    }
    
    const url = 'http://localhost:8080/parking/getfilesofparking?filename=' + encodeURIComponent(fullPath);

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fullPath.split('_').slice(1).join('_'); // Καθαρό όνομα
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      },
      error: (error) => {
        console.error('Σφάλμα στο κατέβασμα αρχείου:', error);
        alert('Σφάλμα κατά την προσπάθεια λήψης αρχείου.');
      }
    });
  
    

  }
    
  validateParking(id:any){
    const params = new HttpParams()
    .set('Id',id)

    this.http.post<any>('http://localhost:8080/parking/validate_parking_admin', null, {params} )
    .subscribe(
      response => {
        console.log(response);
        //this.parkings=response;
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  }



}
