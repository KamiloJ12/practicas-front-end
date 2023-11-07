import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../../../student/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  private studentsService = inject( StudentsService );
  private activatedRoute = inject( ActivatedRoute );
  public student: any = null;

  public ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.studentsService.getUstudenById( id ) )
        )
        .subscribe( student => this.student = student );
  }
}
