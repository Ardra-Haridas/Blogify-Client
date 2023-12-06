import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { Blog } from '../../models/data-types';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  blogId:number|any
  blogDetails:Blog|any
  constructor(private api:ApiService,private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.blogId=s["id"]
    });
    this.api.getReturn(`${environment.BASE_API_URL}/post/findbyId/${this.blogId}`).subscribe((data)=>{
      this.blogDetails=data
      console.log(this.blogDetails);
      
      
    },(error)=>{
      console.log(error);
      
    })
  }

}
