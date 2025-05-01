import { Component } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private auth:AuthserviceService, private fb:FormBuilder){
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
    
  }

  login(){
    if(this.loginForm.get('username')?.invalid ||
      this.loginForm.get('password')?.invalid
    ){
      this.loginForm.markAllAsTouched();
      return;
    }
    else{
      this.auth.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    }
  }

}
