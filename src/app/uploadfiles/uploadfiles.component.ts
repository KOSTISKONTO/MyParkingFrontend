import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent {

  selectedFiles: File[] = [];
  parkingId: number = 1; // Βάλε το ID που αντιστοιχεί στο Parking σου

  uploadSuccess = false;
  uploadError = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles() {
    if (!this.parkingId || this.selectedFiles.length === 0) {
      alert("Επίλεξε αρχεία και βάλε σωστό ID.");
      return;
    }

    const formData = new FormData();
    formData.append("id", this.parkingId.toString());

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
}
