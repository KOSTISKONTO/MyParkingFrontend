import { Component, inject, TemplateRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MyprofileComponent } from 'src/app/myprofile/myprofile.component';
import { AuthserviceService } from 'src/app/authservice.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  private modalService = inject(NgbModal);
  @Input() title!: string;
  @Input() request!: string;
  @Input() jsonname!:string;
  @Input() jsonoldPassword!:string;
  @Input() jsonnewPassword!:string;
  @Input() jsonValidatePassword!:string;
  update!:string;
  oldPassword!:string;
  newPassword!:string;
  validatepassword!:string;
  
  constructor(private http:HttpClient, private route:Router, private myprofile:MyprofileComponent, private auth:AuthserviceService){

  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(() => {}, () => {}); // αγνοούμε το αποτέλεσμα
  }

  ngOnInit(): void {
	 console.log(this.jsonname);
   console.log(this.jsonoldPassword)
   console.log(this.jsonnewPassword)
  }

  setupdate(modal:any){
    let finalrequest;
    console.log(this.update);
    console.log(this.jsonname);
    if(this.jsonoldPassword==null){
       finalrequest={
        [this.jsonname]:this.update
      }
    }
    else{
       finalrequest={
        [this.jsonoldPassword]:this.oldPassword,
        [this.jsonnewPassword]:this.newPassword,
        [this.jsonValidatePassword]:this.validatepassword
      }
    }
  
    console.log(finalrequest);
    this.http.post<any>(this.request,  finalrequest)
    .subscribe(
      response => {
        if(this.jsonname=="username"){
          this.auth.logout();
          modal.close();
        }
        else{
          console.log(response);
          this.myprofile.ngOnInit();
          modal.close();
        }
        

        
      },
      error => {
        console.error('Σφάλμα κατά την αποστολή:', error);
        alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
        modal.close();
      }
    );
  }


}
