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

  public get dataDevelopmentArea() {
    if( !this.student?.developmentArea ) return;
    
    const data = {
      labels: Object.keys(this.student?.developmentArea),
      datasets: [
        {
          data: Object.values(this.student?.developmentArea)
        }
      ]
    }
    return data;
  }
}
