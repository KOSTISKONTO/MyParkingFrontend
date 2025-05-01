import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service'
import { Subscription } from 'rxjs';
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public imageurl: string
  )
  {

  }
}

@Component({
  selector: 'app-fisrt-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit{

  todos = [
    new Todo (1, 'Agrinio City', "../../assets/famous/monastiraki.jpg"),
    new Todo(2, 'Athens City', "../../assets/famous/akropoli.jpg"  ),
    new Todo (3, 'Patra City', "../../assets/famous/monastiraki.jpg")
  ]

  popularcityList:any;
 private sub!: Subscription;
  constructor(private websocketService: WebsocketService){

  }
  ngOnInit(): void {
    this.websocketService.getCities().subscribe((data) => {
      this.popularcityList = data;
    });
  
  
    this.sub = this.websocketService.cities$.subscribe((data) => {
      this.popularcityList = data;
      console.log(data);
    });
  }

refresh(){
  window.location.reload();
}



}
