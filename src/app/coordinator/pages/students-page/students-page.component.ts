import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/student/services/students.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent {

  public students: any[] = [];
  public visibleModalDialog: boolean = false;

  private studentsService = inject( StudentsService );
  private router = inject( Router );

  public ngOnInit(): void {
    if( this.router.url.includes('practices') ) {
      this.studentsService.getStudentsInPractices()
        .subscribe( students => this.students = students );
    } else {
      this.studentsService.getStudents()
        .subscribe( students => this.students = students );
    }
  }

  public showModalDialog(): void {
    this.visibleModalDialog = true;
  }

  public addStudents(file: File): void {
    console.log(file.name);
  }
}
