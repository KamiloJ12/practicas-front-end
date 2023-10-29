import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../../../student/services/students.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  private studentsService = inject( StudentsService );
  
  public student: any = null;
  items = [
    {
      label: 'Datos personales',
      link: '/personal-information',
      routerLinkActive: '',
    },
    {
      label: 'Documento de identidad',
      link: '#documento',
      routerLinkActive: '',
    },
    {
      label: 'Informacion academica',
      link: '/academic-information',
      routerLinkActive: '',
    },
    {
      label: 'Informacion medica',
      link: '/medical-information',
      routerLinkActive: '',
    },
    {
      label: 'Areas de desarrollo de practicas',
      link: '/development-area',
      routerLinkActive: '',
    }
  ];  

  public ngOnInit(): void {
    this.studentsService.getUserById(2)
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
