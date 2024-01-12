import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  fileName = '';
  userid: any;

  constructor(private api:ApiService) {}

  onFileSelected(event:any) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("imageFile", file);

          const upload$ = this.api.postReturn(`${environment.BASE_API_URL}/auth/uploadImage/${this.userid}`, formData);

          upload$.subscribe();
      }
  }

}
