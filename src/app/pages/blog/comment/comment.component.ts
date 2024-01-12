import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { error } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AnyTxtRecord } from 'dns';

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

isEdit:boolean=false
editCommentId:any
constructor(private api:ApiService,private router:Router,private fb:FormBuilder){
}
ngOnInit(): void {
  this.user=localStorage.getItem("user")
    if(this.user)
      this.userId=JSON.parse(this.user).id;
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
    editcomment(comment:any) {
      this.isEdit=true
      this.commentForm=this.fb.group({
        content:[comment.content,Validators.required]
      });
      this.editCommentId=comment.commentid
    }
    onEdit(){
      
const formValues=this.commentForm.getRawValue();
const userData={
  userid:this.userId,
  postid:this.postid,
  content:formValues.content,
  parentCommentId:null
 
}
const headers = new HttpHeaders().set("ResponseType","text")
this.api.postReturn(`${environment.BASE_API_URL}/comment/update/${this.editCommentId}`,userData,{headers}).subscribe((data:any)=>{
  console.log(data);
  this.commentCreationSuccess=true;
  this.ngOnInit()

},
(error)=>{
  console.error('Error editing comment:',error);
  this.errorMessage='Failed to edit comment.Please try again..';
});

    }
      deletecomment(commentId:any):void {
        const shouldDelete=window.confirm('Are you sure you want to delete this comment?');
        if(shouldDelete){
       this.api.deleteReturn(`${environment.BASE_API_URL}/comment/deleteComment/${commentId}`).subscribe(
        (data)=>{
          console.log('deleted Post Successfully',data)
        },
        (error)=>{
          console.log('error deleting post',error)
        }
       )
    
        }
      }
      replycomment() {
      throw new Error('Method not implemented.');
      }
  }

