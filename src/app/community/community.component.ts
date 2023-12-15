import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment.development';
import { Community } from '../models/data-types';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent implements OnInit {
error:string |null=null;
  
  communityList: Community[] |any

constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getReturn(`${environment.BASE_API_URL}/community/list`).subscribe((data:any)=>{
      this.communityList=data
      console.log(this.communityList);
    },(error)=>{
      console.log(error);
    }
    );
  }

}
