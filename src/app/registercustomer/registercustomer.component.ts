import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-registercustomer',
  templateUrl: './registercustomer.component.html',
  styleUrls: ['./registercustomer.component.css']
})
export class RegistercustomerComponent {

  resgisterForm!:FormGroup

  constructor(private fb:FormBuilder, private auth:AuthserviceService){
    this.resgisterForm = this.fb.group({
      name:['', Validators.required],
      last:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  register(){
    if(this.resgisterForm.get('name')?.invalid ||
       this.resgisterForm.get('last')?.invalid ||
       this.resgisterForm.get('username')?.invalid ||
       this.resgisterForm.get('email')?.invalid ||
       this.resgisterForm.get('password')?.invalid
     )
     {
      this.resgisterForm.markAllAsTouched();
      return;
    }
    else{
      this.auth.registercustomer(
        this.resgisterForm.get('name')?.value, 
       this.resgisterForm.get('last')?.value,
       this.resgisterForm.get('email')?.value,
       this.resgisterForm.get('username')?.value,
       this.resgisterForm.get('password')?.value


      );
    }
  }

}
