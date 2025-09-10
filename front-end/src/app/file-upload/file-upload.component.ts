import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl } from './helper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  isLoading = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log("File size (bytes):", this.selectedFile.size);
      console.log("File size (MB):", (this.selectedFile.size / (1024 * 1024)).toFixed(2));
      this.uploadResponse = null;
    }
  }

  onClear(keepMessage: boolean = false) {
  this.selectedFile = null;
  if (!keepMessage) {
    this.uploadResponse = null;
  }
  if (this.fileInput) {
    this.fileInput.nativeElement.value = ''; // reset file input
  }
}

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${getApiUrl()}/upload`, formData).subscribe({
      next: (res: any) => {
        this.uploadResponse = res.message 
        ? `${res.message} → ${res.filename}` 
        : `✅ Uploaded: ${res.filename}`;
        this.isLoading = false;
        this.onClear(true); // 👈 clears file input but keeps success message
      },
      error: (err) => {
        this.uploadResponse = `❌ Error: ${err.error?.message || err.message}`;
        this.isLoading = false;
      },
    });
  }
}
