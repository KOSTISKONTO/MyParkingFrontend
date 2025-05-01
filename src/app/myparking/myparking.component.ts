import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-myparking',
  templateUrl: './myparking.component.html',
  styleUrls: ['./myparking.component.css']
})
export class MyparkingComponent implements OnInit{
  constructor( private http:HttpClient){

  }

  parkings:any;
  selectedFiles: File[] = [];
  parkingId: any[]=[];// Βάλε το ID που αντιστοιχεί στο Parking σου

  uploadSuccess = false;
  uploadError = false;
  
  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/parking/myparking')
    .subscribe(
      response => {
       this.parkings=response;
       console.log(this.parkings)
      

       
        
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
      }
    );
  
  }

 



  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles(parking_id:any) {
    console.log(this.parkingId);
    if (!parking_id || this.selectedFiles.length === 0) {
      alert("Επίλεξε αρχεία και βάλε σωστό ID.");
      return;
    }

    const formData = new FormData();
    formData.append("id", parking_id);

    for (const file of this.selectedFiles) {
      formData.append("files", file);
    }

    this.http.post('http://localhost:8080/parking/upload-files', formData).subscribe({
      next: (responce) => {
        console.log(responce);
        this.uploadSuccess = true;
        this.uploadError = false;
      },
      error: (responce) => {
        console.log(responce);
        this.uploadError = true;
        this.uploadSuccess = false;
      }
    });
    





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
    
    const url = 'http://localhost:8080/parking/getfiles_of_myparking?filename=' + encodeURIComponent(fullPath);

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
  
  

}

