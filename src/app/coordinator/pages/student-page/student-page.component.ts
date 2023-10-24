import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../../../student/services/students.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  student: any = null;
  private studentsService = inject( StudentsService );

  public ngOnInit(): void {
    this.studentsService.getUserById(2)
      .subscribe( student => this.student = student );
  }
}
