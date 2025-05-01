import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerowner',
  templateUrl: './registerowner.component.html',
  styleUrls: ['./registerowner.component.css']
})
export class RegisterownerComponent {

  registerForm!:FormGroup;

  
    constructor(private fb:FormBuilder, private auth:AuthserviceService){
      this.registerForm = this.fb.group({
        name:['', Validators.required],
        last:['', Validators.required],
        username:['', Validators.required],
        email:['', Validators.required],
        password:['', Validators.required],
        Afm_Owner:['', Validators.required],
        Identity_owner:['', Validators.required]
      })
    }

    register(){
      if(this.registerForm.get('name')?.invalid ||
         this.registerForm.get('last')?.invalid ||
         this.registerForm.get('username')?.invalid ||
         this.registerForm.get('email')?.invalid ||
         this.registerForm.get('password')?.invalid ||
         this.registerForm.get('Afm_Owner')?.invalid ||
         this.registerForm.get('Identity_owner')?.invalid
       )
       {
        this.registerForm.markAllAsTouched();
        return;
      }
      else{
        this.auth.registerowner(
          this.registerForm.get('name')?.value, 
         this.registerForm.get('last')?.value,
         this.registerForm.get('Afm_Owner')?.value,
         this.registerForm.get('Identity_owner')?.value,
         this.registerForm.get('email')?.value,
         this.registerForm.get('username')?.value,
         this.registerForm.get('password')?.value,
        
         

       

         
  
  
        );
      }
    }

}
