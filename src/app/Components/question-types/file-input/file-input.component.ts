import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { HttpClient } from '@angular/common/http';
import { ConversationService } from '../../../Services/conversation.service';

@Component({
  selector: 'app-file-input',
  standalone: false,
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css'
})
export class FileInputComponent extends BaseQuestionComponent implements OnInit{
  selectedFile: File | null = null;
  uploadError: string | null = null;
  isUploading =false;
  isDropZoneHovered = false;

  constructor(
    private http: HttpClient,
    conversationService: ConversationService ) {
    super(conversationService);
  }

  ngOnInit(): void {
      if(!this.question.conversationId){
        this.uploadError = 'ConversationID is missing';
      }
      if(!this.question.questionId){
        this.uploadError = 'QuestionID is missing';
      }
  }

  onDragOver(event: DragEvent): void {
  event.preventDefault();
  this.isDropZoneHovered = true;
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
  this.isDropZoneHovered = false;
}

onFileDropped(event: DragEvent): void {
  event.preventDefault();
  this.isDropZoneHovered = false;

  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (this.isFileValid(file)) {
      this.selectedFile = file;
      this.uploadError = null;
      if (!this.question.requiresSubmitButton) {
        this.uploadAndSubmit();
      }
    } else {
      this.selectedFile = null;
      this.uploadError = 'Invalid file type. Please select a valid file.';
    }
  }
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.isFileValid(file)) {
        this.selectedFile = file;
        this.uploadError = null;
        if(!this.question.requiresSubmitButton) {
          this.uploadAndSubmit();
        }
      } else {
        this.selectedFile = null;
        this.uploadError = 'Invalid file type. Please select a valid file type';
      }
    }
  }

  private uploadAndSubmit() {
    if(!this.selectedFile || !this.question.conversationId || !this.question.questionId) {
      this.uploadError = 'File, Conversation Id or question Id missing';
      return;
    }

    this.isUploading = true;
    this.uploadFile(this.selectedFile!, this.question.conversationId, this.question.questionId).then(
      (response) => {
        this.isUploading =false;
        const fileName = this.selectedFile!.name;
        const answer = {type: 'file', text: `File uploaded: ${fileName}`, value: fileName, 
                        currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId};
        this.submitAnswer(answer);
        this.selectedFile = null;
      },
      (error) => {
        this.isUploading = false;
        this.uploadError = 'Upload failed. Please try again';
        console.error('Upload error: ',error);
      }
    )
  }
  private uploadFile(file: File, conversationId: string, questionId:string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('conversationId', conversationId);
    // formData.append('questionId',this.question.questionId);
    const url = `http://localhost:5149/api/Upload?conversationId=${encodeURIComponent(conversationId)}&questionId=${encodeURIComponent(questionId)}`;
    return this.http.post(url,formData).toPromise();

  }
  isFileValid(file: File):boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxSize = 15*1024*1024;
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
  onSubmitButtonClicked(): void {
    if(this.selectedFile) {
      this.uploadAndSubmit();
    }
  }
  canSubmit(): boolean {
      return true;
  }

}
