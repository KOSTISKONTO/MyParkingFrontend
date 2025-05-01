import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-header-owner',
  templateUrl: './header-owner.component.html',
  styleUrls: ['./header-owner.component.css']
})
export class HeaderOwnerComponent {

  constructor(public authService:AuthserviceService){

  }
  logout(){
    this.authService.logout();
  }
}
