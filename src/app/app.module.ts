import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { TestserviceService } from './testservice.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { NewParkingComponent } from './new-parking/new-parking.component';
import { LoginComponent } from './login/login.component';
import { RegistercustomerComponent } from './registercustomer/registercustomer.component';
import { RegisterownerComponent } from './registerowner/registerowner.component';
import { HeaderCustomerComponent } from './headers_roles/header-customer/header-customer.component';
import { HeaderOwnerComponent } from './headers_roles/header-owner/header-owner.component';
import { CalendarComponent } from './material/calendar/calendar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { TimepickerComponent } from './timepicker/timepicker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {GoogleMapsModule} from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { FinalbookingComponent } from './finalbooking/finalbooking.component';
import { MybookingsComponent } from './mybookingcomponents/mybookings/mybookings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PopupComponent } from './mybookingcomponents/popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyparkingComponent } from './myparking/myparking.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { HeaderAdminComponent } from './headers_roles/header-admin/header-admin.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminOwnersComponent } from './admin/admin-owners/admin-owners.component';
import { AdminParkingsComponent } from './admin/admin-parkings/admin-parkings.component';
import { AdminPopupRejectComponent } from './admin/admin-popup-reject/admin-popup-reject.component';
import { BookingbyAddressSearchComponent } from './bookingby-address-search/bookingby-address-search.component';





@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    FirstPageComponent,
    HeaderComponent,
    FooterComponent,
    AutocompleteComponent,
    NewParkingComponent,
    LoginComponent,
    RegistercustomerComponent,
    RegisterownerComponent,
    HeaderCustomerComponent,
    HeaderOwnerComponent,
    CalendarComponent,
    TimepickerComponent,
    MapComponent,
    FinalbookingComponent,
    MybookingsComponent,
    MyprofileComponent,
    PopupComponent,
    MyparkingComponent,
    UploadfilesComponent,
    HeaderAdminComponent,
    AdminCustomersComponent,
    AdminOwnersComponent,
    AdminParkingsComponent,
    AdminPopupRejectComponent,
    BookingbyAddressSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule, 
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    HttpClientXsrfModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,  MatNativeDateModule,
    MatFormFieldModule, MatInputModule, NgxMaterialTimepickerModule, MatSelectModule,
    MatAutocompleteModule, MatListModule, GoogleMapsModule, NgbModule],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TestserviceService,
    multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
