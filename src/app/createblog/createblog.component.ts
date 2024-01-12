import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';

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
  blogId: any=null;
  user:any
  userId:any
  communityId:any
  constructor(private api:ApiService,private activatedRoute:ActivatedRoute,private router:Router,private fb:FormBuilder){}

  ngOnInit(): void {
    if(typeof localStorage !== "undefined" && localStorage.getItem("user")){
      this.user=localStorage.getItem("user")
      this.userId=JSON.parse(this.user).id;
    }
    this.activatedRoute.params.subscribe(s => {
      this.blogId=s["blogId"]
      this.communityId = s["communityId"]
    });
  this.blogForm=this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required],
    image:['',Validators.required]
  });
  if(this.blogId!=null){
    this.api.getReturn(`${environment.BASE_API_URL}/post/findbyId/${this.blogId}`).subscribe((data:any)=>{
      console.log(data);  
      this.blogForm=this.fb.group({
        title:[data.title,Validators.required],
        content:[data.content,Validators.required],
        image:['',Validators.required]
      });        
    })
  }
  }
  onCreate() {
    
      const formValues=this.blogForm.getRawValue();

      const userData={
        title:formValues.title,
        content:formValues.content,
        userid:this.userId,
        communityid:this.communityId ? this.communityId : null
      }
      console.log(userData);

      this.api.postReturn(`${environment.BASE_API_URL}/post/createpost`,userData).subscribe((data:any)=>{
        console.log(data);
       this.blogCreationSuccess=true;
       this.router.navigate(['/home',data]);
      },
      (error)=>{
        console.error('Error creating blog:',error);
        this.errorMessage='Failed to create blog.Please try again..';
      }
      );
    }
    onEdit(){
      const formValues=this.blogForm.getRawValue();

      const userData={
        title:formValues.title,
        content:formValues.content
      }
      const headers=new HttpHeaders().set("ResponseType","text")
      this.api.postReturn(`${environment.BASE_API_URL}/post/update/${this.blogId}`,userData,{headers}).subscribe((data:any)=>{
        console.log(data);
        this.blogCreationSuccess=true;
        this.router.navigate(['/home'],data);
      },
      (error)=>{
        console.error('Error editing post',error);
        this.errorMessage='Failed to edit Blog..';
      });
    }
}
