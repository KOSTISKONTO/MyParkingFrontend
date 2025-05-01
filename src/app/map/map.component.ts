import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 14;

  markers: { lat: number; lng: number; label: string }[] = [];

  setMarkers(parkingList: any[]) {
    this.markers = parkingList.map(p => ({
      lat: p.lat,
      lng: p.lng,
      label: p.nameofParking
    }));
  }

  focusOn(lat: number, lng: number, zoomLevel = 20) {
    this.center = { lat, lng };
    this.zoom = zoomLevel;
  }

  
}
