import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl } from './helper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  isLoading = false; // 👈 spinner state

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadResponse = null; // reset old response
    }
  }

  onClear() {
    this.selectedFile = null;
    this.uploadResponse = null;
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    this.isLoading = true; // 👈 show spinner
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${getApiUrl()}/upload`, formData).subscribe({
      next: (res: any) => {
        this.uploadResponse = `✅ Uploaded: ${res.filename}`;
        this.isLoading = false; // hide spinner
      },
      error: (err) => {
        this.uploadResponse = `❌ Error: ${err.message}`;
        this.isLoading = false; // hide spinner
      },
    });
  }
}
