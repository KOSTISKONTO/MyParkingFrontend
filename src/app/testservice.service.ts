import {  Injectable } from '@angular/core';
import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import { Observable } from 'rxjs';  // Για να δουλέψουμε με παρατηρητές

@Injectable({
  providedIn: 'root'
})
export class TestserviceService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log('Cloned Request:', cloned);
      return next.handle(cloned);
    }

    return next.handle(req);
  }

  constructor(
    private http:HttpClient, 
   
    
  )
   {

   }

   apiUrl="http://localhost:8080/register/"


   testservice(){
    return this.http.get('http://localhost:8000/testsave/')
   }

   createPerson(user: any): Observable<any> {

    return this.http.post(this.apiUrl, user);
  }



  

 }

/*'nroDPElNTpqy1j2pLTMtTFGeVdYnBkQM */