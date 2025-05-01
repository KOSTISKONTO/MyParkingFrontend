import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookingby-address-search',
  templateUrl: './bookingby-address-search.component.html',
  styleUrls: ['./bookingby-address-search.component.css']
})
export class BookingbyAddressSearchComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}
  adress!:any;

  ngOnInit(): void {
       this.route.params.subscribe(params => {
        this.adress=params['address'];
        console.log(this.adress);

        

  });

}
}
