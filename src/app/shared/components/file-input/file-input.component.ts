import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {

  @Input() documentFile!: File | null;
  @Input() acceptedFileTypes: string = 'pdf';

  @Output() documentFileChange = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  invalidFileType: boolean = false;

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.handleFiles(files);
  }

  private handleFiles(files: FileList | null) {
    if (files) {
      const file = files[0];
      if (this.isValidFileTypes(file)) {
        this.documentFile = file;
        this.documentFileChange.emit(this.documentFile);
        this.invalidFileType = false;
      } else {
        this.invalidFileType = true;
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  private isValidFileTypes(file: File): boolean {
    const acceptedTypes = this.acceptedFileTypes.split(',').map(type => type.trim());
    return acceptedTypes.some( type => file.type.includes(type) );
  }

}
