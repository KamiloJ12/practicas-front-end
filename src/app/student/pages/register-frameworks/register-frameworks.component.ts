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
  public selectedFrameworks: number[] = [];

  public ngOnInit(): void {
    this.frameworksService.findAll()
      .subscribe( frameworks => this.frameworks = frameworks );

    const data = this.formDataService.getFormData()?.frameworks ?? [];
    this.selectedFrameworks = data;
  }

  public toggleSelection(frameworkId: number = 0) {
    const index = this.selectedFrameworks.findIndex((id) => id === frameworkId);
    if (index === -1) {
      this.selectedFrameworks.push(frameworkId);
    } else {
      this.selectedFrameworks.splice(index, 1);
    }
  }
  
  public isSelected(frameworkId: number = 0): boolean {
    return this.selectedFrameworks.some((id) => id === frameworkId);
  }

  public onSubmit(): void {
    if(this.selectedFrameworks.length == 0) return;
    
    this.formDataService.setFrameworksData(this.selectedFrameworks);
    this.studentService.createStudent(this.formDataService.getFormDataToSubmit())
      .subscribe();
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-programming-language');
  }
}
