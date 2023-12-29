import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { error, log } from 'console';
import { Blog, User } from '../models/data-types';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { BlogComponent } from './blogdetails/blogdetails.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,BlogComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  userid:number|any;
  username:string| any;
email:any;
bio: string|any;
blogDetails:Blog[]|any=[]
users:User[] |any;
user:string|any
  likeFlag:boolean|any = false
constructor(private api:ApiService,private activatedRoute:ActivatedRoute,private router:Router){}
ngOnInit(): void {
  this.activatedRoute.params.subscribe(s => {
    this.userid=s["id"]
  });
  this.api.getReturn(`${environment.BASE_API_URL}/auth/userbyId/${this.userid}`).subscribe((data)=>{
    this.users=data
    console.log(this.users);
    this.fetchUserBlogPost()
  },(error)=>{
    console.log(error);
  }
  );
}
fetchUserBlogPost() {
  this.user=localStorage.getItem("user")
    this.userid=JSON.parse(this.user).id;
  if (this.users && this.users.id) {
    this.api.getReturn(`${environment.BASE_API_URL}/auth/${this.users.id}/blogposts`).subscribe(
      (blogpost) => {
        console.log("User Blog Post:", blogpost);
        this.blogDetails = blogpost;
      },
      (error) => {
        console.log("Error fetching blog posts", error);
      }
    );
  }
}
likepost(blogId:number):void{
  this.user=localStorage.getItem("user")
  this.userid=JSON.parse(this.user).id;
  if(!this.likeFlag){
    this.api.postReturn(`${environment.BASE_API_URL}/like/likePost/${blogId}/${this.userid}` ,null).subscribe(
      (response)=>{
        this.blogDetails.likes++;
        this.likeFlag = true
      },
      (error)=>{
        console.log('error liking post',error);
      }
  )
  }else{
    const headers = new HttpHeaders().set("ResponseType","text")
    this.api.postReturn(`${environment.BASE_API_URL}/like/unlikePost/${blogId}/${this.userid}` ,null,{headers}).subscribe(
      (response:any)=>{
        if(response=="success"){
          this.blogDetails.likes--;
          this.likeFlag = false
        }
      },
      (error)=>{
        console.log('error unliking post',error);
      }
  )
  }
  
}


}
