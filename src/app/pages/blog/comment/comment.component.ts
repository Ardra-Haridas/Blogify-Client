import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { error } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{

comment: any;
showcomments: boolean=false;
@Input() comments:Comment|any
newComment:string='';
  @Input() postid: number|any;
commentForm: FormGroup | any;
commentCreationSuccess: boolean | any;
errorMessage:string |any;
  user: string | any;
  userId: any;
commentid: number|any;
constructor(private api:ApiService,private router:Router,private fb:FormBuilder){
}
ngOnInit(): void {
  this.api.getReturn(`${environment.BASE_API_URL}/comment/commentsByPostId/${this.postid}`).subscribe((data:any)=>{
    this.comments=data
  },(error)=>{
    console.log(error);
  })
  this.commentForm=this.fb.group({
    content:['',Validators.required]
  });
}
  addComment():void {
    this.user=localStorage.getItem("user")
    if(this.user)
      this.userId=JSON.parse(this.user).id;

const formValues=this.commentForm.getRawValue();
const userData={
  userid:this.userId,
  postid:this.postid,
  content:formValues.content,
  parentCommentId:null
 
}
console.log(userData);
const headers = new HttpHeaders().set("ResponseType","text")
this.api.postReturn(`${environment.BASE_API_URL}/comment/createComment`,userData,{headers}).subscribe((data:any)=>{
  console.log(data);
  this.commentCreationSuccess=true;
  this.ngOnInit()

},
(error)=>{
  console.error('Error creating comment:',error);
  this.errorMessage='Failed to create comment.Please try again..';
})
  }
  likeComment(commentid:number):void{
    this.user=localStorage.getItem("user")
    this.userId=JSON.parse(this.user).id;
    const headers=new HttpHeaders().set("ResponseType","text")
  
      
      this.api.postReturn(`${environment.BASE_API_URL}/like/likeComment/${commentid}/${this.userId}`,null,{headers}).subscribe(
        (response)=>{
          this.ngOnInit()
          
        },
        (error)=>{
          console.log('error liking comment',error);
        }
      )
   
      
      this.api.postReturn(`${environment.BASE_API_URL}/like/unlikeComment/${commentid}/${this.userId}`,null,{headers}).subscribe(
        (response:any)=>{
          if(response){
            this.ngOnInit()
           
          }
        },
        (error)=>{
          console.log('error unliking comment',error);
        }
      )
    }
    editcomment() {
      throw new Error('Method not implemented.');
      }
      deletecomment() {
      throw new Error('Method not implemented.');
      }
      replycomment() {
      throw new Error('Method not implemented.');
      }
  }

