import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment.development';
import { Blog, Community } from '../../models/data-types';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  blogs:Blog[] | any;
  communityList: Community[] |any
  
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    this.api.getReturn(`${environment.BASE_API_URL}/post/blogs`).subscribe((data:any)=>{
      this.blogs = data
      console.log(this.blogs);
      
      
    },(error)=>{
      console.log(error);
      
    });
    this.api.getReturn(`${environment.BASE_API_URL}/community/list`).subscribe((data:any)=>{
      this.communityList=data
      console.log(this.communityList);
    },(error)=>{
      console.log(error);
    }
    );
  }
  goToBlogDetails(id:any){
    this.router.navigate(['/blog',id]);
  }

}
