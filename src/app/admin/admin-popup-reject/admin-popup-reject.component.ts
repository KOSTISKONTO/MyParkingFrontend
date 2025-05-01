import { Component, inject, TemplateRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MyprofileComponent } from 'src/app/myprofile/myprofile.component';
import { AuthserviceService } from 'src/app/authservice.service';


@Component({
  selector: 'app-admin-popup-reject',
  templateUrl: './admin-popup-reject.component.html',
  styleUrls: ['./admin-popup-reject.component.css']
})
export class AdminPopupRejectComponent {

  private modalService = inject(NgbModal);
  @Input() reject!: string;
  @Input() Id!:any;
  status!:any;
 



  constructor(private http:HttpClient){

  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(() => {}, () => {}); // αγνοούμε το αποτέλεσμα
  }

  ngOnInit(): void {
	console.log(this.Id)
  console.log(this.status);
  }

  setupdate(modal: any) {
    console.log(this.Id);
    console.log(this.status);
  
    const params = new HttpParams()
      .set('Id', this.Id)
      .set('status', this.status);
  
    this.http.post<any>('http://localhost:8080/parking/reject_parking_admin', null, { params })
      .subscribe(
        response => {
          console.log(response);
          alert(response.message); // Πρόσεχε: το response είναι αντικείμενο, έχει .message
          modal.close();
        },
        error => {
          console.error('Σφάλμα κατά την αποστολή:', error);
          alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
          modal.close();
        }
      );
  }
  
}


//Δεν έχεις τα απαιτούμενα διακιολογητικά.