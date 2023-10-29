import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { FrameworksService } from 'src/app/shared/services';
import { Framework } from 'src/app/shared/interfaces';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-register-frameworks',
  templateUrl: './register-frameworks.component.html',
  styleUrls: ['./register-frameworks.component.css']
})
export class RegisterFrameworksComponent {

  private router = inject(Router);
  
  private studentService = inject(StudentsService);
  private frameworksService = inject(FrameworksService);
  private formDataService = inject(FormDataService);

  public frameworks: Framework[] = [];
  public selectedFrameworks: Framework[] = [];

  public ngOnInit(): void {
    this.frameworksService.findAll()
      .subscribe( frameworks => this.frameworks = frameworks );
  }

  public toggleSelection(framework: Framework) {
    const index = this.selectedFrameworks.findIndex((fran) => fran.id === framework.id);
    if (index === -1) {
      this.selectedFrameworks.push(framework);
    } else {
      this.selectedFrameworks.splice(index, 1);
    }
  }
  
  public isSelected(framework: Framework): boolean {
    return this.selectedFrameworks.some((fran) => fran.id === framework.id);
  }

  public onSubmit(): void {
    //if(this.selectedFrameworks.length == 0) return;
    this.formDataService.setFrameworksData(this.selectedFrameworks);
    this.studentService.createStudent(this.formDataService.getFormData())
      .subscribe();
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-academy-information');
  }
}
