import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-createblog',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './createblog.component.html',
  styleUrl: './createblog.component.scss'
})
export class CreateblogComponent implements OnInit {


  blogForm:FormGroup | any;
  blogCreationSuccess: boolean | any;
  errorMessage:string |any;

  constructor(private api:ApiService,private router:Router,private fb:FormBuilder){}

  ngOnInit(): void {
  this.blogForm=this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required],
    image:['',Validators.required]
  });
  }
  onCreate() {
    
      const formValues=this.blogForm.getRawValue();

      const userData={
        title:formValues.title,
        content:formValues.content
      }
      console.log(userData);

      this.api.postReturn(`${environment.BASE_API_URL}/post/createpost`,userData).subscribe((data:any)=>{
        console.log(data);
       this.blogCreationSuccess=true;
       this.router.navigate(['/createdblog',data]);
      },
      (error)=>{
        console.error('Error creating blog:',error);
        this.errorMessage='Failed to create blog.Please try again..';
      }
      );
    }
}
