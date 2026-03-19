import { Component, OnInit } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  ngOnInit() {
  this.loadGoogleMaps().then(() => {
    console.log('Maps loaded');
    

    
  });
}


loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject('Google Maps failed to load');

      document.head.appendChild(script);
    });
  }

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
