import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
 selectedFile: File | null = null;
  uploadResponse: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    // ✅ dynamically picks the correct backend URL
    this.http.post(`${environment.apiUrl}/upload`, formData)
      .subscribe({
        next: (res: any) => {
          this.uploadResponse = `✅ Uploaded: ${res.filename}`;
        },
        error: (err) => {
          this.uploadResponse = `❌ Error: ${err.message}`;
        },
      });
  }
}
