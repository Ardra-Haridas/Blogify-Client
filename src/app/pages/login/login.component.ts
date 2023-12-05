import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error, log } from 'console';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup | any;
  submitted:boolean=false;
  loginSuccess:boolean | any;
  errorMessage:string | any;

  constructor(private fb: FormBuilder,private api:ApiService,private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]]
    })
  }
  
  onSubmit(){

    this.submitted=true;

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValues=this.loginForm.getRawValue();

    const userData={
      email : formValues.email,
      password:formValues.password

    }
    console.log(userData);

    this.api.postReturn(`${environment.BASE_API_URL}/auth/authenticate`,userData).subscribe((data: any)=>{
      console.log(data);
      if(data.status){
        this.loginSuccess = true;
        this.loginForm.reset();
        const jwtToken:string=data.response;
      localStorage.setItem("token",jwtToken)

      this.api.getReturn(`${environment.BASE_API_URL}/auth/userProfile`).subscribe((data :any)=>{
        localStorage.setItem("user",JSON.stringify(data))
        this.router.navigate(['/home'])
      },(error)=>{
        this.errorMessage=error["error"].message;
        this.loginSuccess=false;
      })
      }else{
        this.errorMessage=data.response;
        this.loginSuccess=false;
      }
    })
    this.submitted=false;
  }
}
