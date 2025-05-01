import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-header-customer',
  templateUrl: './header-customer.component.html',
  styleUrls: ['./header-customer.component.css']
})
export class HeaderCustomerComponent {

  constructor(public authService:AuthserviceService){

  }

  logout(){
    this.authService.logout();
  }
}
