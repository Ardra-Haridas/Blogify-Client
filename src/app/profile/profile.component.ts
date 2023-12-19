import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { error, log } from 'console';
import { Blog, User } from '../models/data-types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  userid:number|any;
  username:string| any;
  user:string|any
email:any;
bio: string|any;
blogDetails:Blog[]|any=[]
users:User[] |any;
constructor(private api:ApiService,private activatedRoute:ActivatedRoute){}
ngOnInit(): void {
  this.api.getReturn(`${environment.BASE_API_URL}/auth/userProfile`).subscribe((data)=>{
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


}
