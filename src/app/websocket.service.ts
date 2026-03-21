import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Client;
  private subscription!: StompSubscription;
  private citiesSubject = new BehaviorSubject<any[]>([]);
  public cities$ = this.citiesSubject.asObservable();
  private popularcitiesSubject = new BehaviorSubject<any[]>([]);
  public popularcities$ = this.popularcitiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.connect();
  }

  private connect(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new WebSocket(`${environment.wsUrl}/websocket`),
      reconnectDelay: 5000, // auto-reconnect
      onConnect: () => {
       

        this.subscription = this.stompClient.subscribe('/topic/cities', (message: IMessage) => {
          const data = JSON.parse(message.body);
          this.citiesSubject.next(data);
        });
        this.subscription = this.stompClient.subscribe('/topic/popularities', (message: IMessage) => {
          const data = JSON.parse(message.body);
          this.popularcitiesSubject.next(data);
        });

      },
      onStompError: (frame) => {
       
      },
      onWebSocketError: (event: Event) => {
       
      }
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.subscription?.unsubscribe();
      this.stompClient.deactivate();
    }
  }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/parking/cities`); // προσαρμόζεις το endpoint
  }

  
}
