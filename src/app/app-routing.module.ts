
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { BookingComponent } from './booking/booking.component';
import { NewParkingComponent } from './new-parking/new-parking.component';
import { LoginComponent } from './login/login.component';
import { RegistercustomerComponent } from './registercustomer/registercustomer.component';
import { RegisterownerComponent } from './registerowner/registerowner.component';
import { FinalbookingComponent } from './finalbooking/finalbooking.component';
import { roleGuard } from './guards/role.guard';
import { MybookingsComponent } from './mybookingcomponents/mybookings/mybookings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyparkingComponent } from './myparking/myparking.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminOwnersComponent } from './admin/admin-owners/admin-owners.component';
import { AdminParkingsComponent } from './admin/admin-parkings/admin-parkings.component';
import { BookingbyAddressSearchComponent } from './bookingby-address-search/bookingby-address-search.component';


const routes: Routes = [

 {path: '', component:FirstPageComponent},
 {path:'booking', component:BookingComponent, canActivate:[roleGuard],  data: { roles: ['ROLE_CUSTOMER', 'ROLE_ADMIN']}},
 {path: 'newParking', component:NewParkingComponent, canActivate:[roleGuard], data:{roles :['ROLE_OWNER', 'ROLE_ADMIN']}},
 {path: 'login', component:LoginComponent},
 {path: 'registercustomer', component:RegistercustomerComponent},
 {path: 'registerowner', component:RegisterownerComponent},
 {path:'finalbooking/:idParking/:cost/:date/:hours/:time', component:FinalbookingComponent, canActivate:[roleGuard], data:{roles:['ROLE_CUSTOMER', 'ADMIN']}},
 {path:'mybookings', component:MybookingsComponent, canActivate:[roleGuard], data:{roles:['ROLE_CUSTOMER', 'ROLE_ADMIN']}},
 {path:'myparking', component:MyparkingComponent, canActivate:[roleGuard], data:{roles:['ROLE_OWNER', 'ROLE_ADMIN']}},
 {path:'myprofile', component:MyprofileComponent},
 {path:'upload-files', component:UploadfilesComponent},
 {path:'getCustomers', component:AdminCustomersComponent, canActivate:[roleGuard], data:{roles:['ROLE_ADMIN']}},
 {path:'getOwners', component:AdminOwnersComponent, canActivate:[roleGuard], data:{roles:['ROLE_ADMIN']}},
 {path:'parkings', component:AdminParkingsComponent, canActivate:[roleGuard], data:{roles:['ROLE_ADMIN']}},
 {path:'bookingbysearch/:address', component:BookingbyAddressSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
