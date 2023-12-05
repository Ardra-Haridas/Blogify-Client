import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
     registerForm : FormGroup|any;
     submitted:boolean=false;
     registerSuccess:boolean | any;
     errorMessage:string | any;

     constructor(private rb:FormBuilder,private api:ApiService){
     }
  ngOnInit(): void {
   this.registerForm=this.rb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')]],
    password:['',[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]],
    confirmpassword:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]]
   })
  }

  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
   const formValues=this.registerForm.getRawValue();

   const userData={
    name :formValues.username,
    email:formValues.email,
    password:formValues.password
   }
   const apiUrl='http://localhost:8080/api/v1/auth/register';

   this.api.postReturn(apiUrl,userData).subscribe((data:any)=>{
    console.log(data);
    if(data.status){
      this.registerSuccess=true;
      this.registerForm.reset();
    }else{
      this.errorMessage=data.response;
      this.registerSuccess=false;
    }
   
    
   })

  }
}
