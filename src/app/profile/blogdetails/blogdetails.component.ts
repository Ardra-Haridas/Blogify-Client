import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from '../../models/data-types';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.scss'
})
export class BlogComponent implements OnInit{
  blogId:number|any
  @Input() blogDetails:Blog|any
  
  blog: any;
  blogs: any;
  user:string|any
  userId: number|any;
  likeFlag:boolean|any = false
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.blogId=this.blogDetails.id
    this.api.getReturn(`${environment.BASE_API_URL}/post/findbyId/${this.blogId}`).subscribe((data)=>{
      this.blogDetails=data
      console.log(this.blogDetails);
      this.user=localStorage.getItem("user")
      this.userId=JSON.parse(this.user).id;
      this.api.getReturn(`${environment.BASE_API_URL}/like/likebyuser/${this.userId}/${this.blogId}`).subscribe((data)=>{
        console.log(data);
        if(data!=0){
          this.likeFlag = true
        }
      })
      
    },(error)=>{
      console.log(error);
      
    })
  }

  likepost():void{
    this.user=localStorage.getItem("user")
    this.userId=JSON.parse(this.user).id;
    if(!this.likeFlag){
      this.api.postReturn(`${environment.BASE_API_URL}/like/likePost/${this.blogId}/${this.userId}` ,null).subscribe(
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
      this.api.postReturn(`${environment.BASE_API_URL}/like/unlikePost/${this.blogId}/${this.userId}` ,null,{headers}).subscribe(
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
