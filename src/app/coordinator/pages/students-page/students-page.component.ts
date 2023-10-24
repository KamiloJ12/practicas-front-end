import { Component, inject } from '@angular/core';
import { StudentsService } from 'src/app/student/services/students.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent {

  public students: any[] = [];
  public visibleModalDialog: boolean = false;

  private studentsService = inject( StudentsService );
  private userService = inject( UserService );

  public ngOnInit(): void {
    this.studentsService.getStudents()
      .subscribe( students => this.students = students );
  }

  public showModalDialog(): void {
    this.visibleModalDialog = true;
  }

  public addStudents(file: File): void {
    console.log(file.name);
    this.userService.addStudents(file)
      .subscribe({
        error: (error) => console.log(error)
      });
  }
}
