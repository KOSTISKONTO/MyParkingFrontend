import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(public authService:AuthserviceService){

  }

  logout(){
    this.authService.logout();
  }

}
