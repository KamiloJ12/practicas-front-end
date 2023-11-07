import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AllowedUsersService } from 'src/app/shared/services/allowed-users.service';
import { StudentsService } from 'src/app/student/services/students.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css'],
  providers: [MessageService],
})
export class StudentsPageComponent {

  public students: any[] = [];
  public visibleModalDialog: boolean = false;
  public selectedFile: File | null = null;

  private studentsService = inject( StudentsService );
  private messageService = inject( MessageService );
  private allowedUsersService = inject( AllowedUsersService );
  private router = inject( Router );

  ngOnInit(): void {
    if( this.router.url.includes('practices') ) {
      this.studentsService.getStudentsInPractices()
        .subscribe( students => this.students = students );
    } else {
      this.studentsService.getStudents()
        .subscribe( students => this.students = students );
    }
  }

  showModalDialog(): void {
    this.selectedFile = null;
    this.visibleModalDialog = true;
  }

  onFileSelected(event: Event): void {
    event.preventDefault();
    if(this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.allowedUsersService.addStudents(formData)
        .subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              detail: 'Se ha cargado el documento',
              life: 3000
            });
            this.selectedFile = null;
          },
          error: (error) => this.messageService.add({
            severity: 'error',
            detail: error,
            life: 3000
          })
        });
    }
  }

  onFileChange(file: File): void {
    this.selectedFile = file;
  }
}
