import {  Injectable } from '@angular/core';
import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import { Observable } from 'rxjs';  // Για να δουλέψουμε με παρατηρητές
import { environment } from 'src/environments/environment';
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
    
      return next.handle(cloned);
    }

    return next.handle(req);
  }

  constructor(
    private http:HttpClient, 
   
    
  )
   {

   }

   apiUrl=`${environment.api_url}/register/`


   testservice(){
    return this.http.get(`${environment.api_url}/testsave/`)
   }

   createPerson(user: any): Observable<any> {

    return this.http.post(this.apiUrl, user);
  }



  

 }

/*'nroDPElNTpqy1j2pLTMtTFGeVdYnBkQM */