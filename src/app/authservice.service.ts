import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private login_url = `${environment.api_url}/login`;
  private registercustomer_url = `${environment.api_url}/register_customer`;
  private registerowner_url = `${environment.api_url}/register_owner`;




  // ✅ Reactive role tracking
  private roleSubject = 
    localStorage.getItem('role');

  getRole(){
  return this.roleSubject;
  }

  isCustomer(){
    return localStorage.getItem('role')==='ROLE_CUSTOMER';
  }

  isOwner(){
    return localStorage.getItem('role')==='ROLE_OWNER';
  }

  isAdmin(){
    return localStorage.getItem('role')==='ROLE_ADMIN';
  }
  
  

  constructor(private http: HttpClient, private router: Router) {}
  

  login(username: string, password: string): void {
    const credentials = {
      username: username,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(this.login_url, credentials, { headers })
      .subscribe({
        next: (response) => {
       
          const token = response.token;
          const roles = response.roles;

          localStorage.setItem('jwt', token);
          localStorage.setItem('role', roles)
          

         

          this.router.navigate(['']).then(() => {
            window.location.reload(); // πλήρης ανανέωση
          });
        },
        error: (error) => {
        
          alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
        }
      });
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.router.navigate(['']).then(() => {
      window.location.reload(); // πλήρης ανανέωση
    });
    

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  registercustomer(name: string, last: string, email: string, username: string, password: string): void {
    const registerForm = {
      name, last, email, username, password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(this.registercustomer_url, registerForm, { headers })
      .subscribe({
        next: (response) => {
          
          alert(response.message || 'Επιτυχής εγγραφή!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
         
          alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
        }
      });
  }

  registerowner(
    name: string,
    last: string,
    Afm_Owner: string,
    Identity_owner: string,
    email: string,
    username: string,
    password: string,
    
   
  ): void {
    const registerForm = {
      name, last, Afm_Owner, Identity_owner, email, username, password,  
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(this.registerowner_url, registerForm, { headers })
      .subscribe({
        next: (response) => {
          
          alert(response.message || 'Επιτυχής εγγραφή!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          
          alert('Κάτι πήγε στραβά. Προσπαθήστε ξανά.');
        }
      });
  }


}
