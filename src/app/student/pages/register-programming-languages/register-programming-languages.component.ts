import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { ProgrammingLanguagesService } from '../../../shared/services';
import { ProgrammingLanguages } from '../../../shared/interfaces';

@Component({
  selector: 'app-register-programming-languages',
  templateUrl: './register-programming-languages.component.html',
  styleUrls: ['./register-programming-languages.component.css']
})
export class RegisterProgrammingLanguagesComponent {

  private router = inject(Router);
  
  private programmingLanguagesService = inject(ProgrammingLanguagesService);
  private formDataService = inject(FormDataService);
  
  public programmingLanguages: ProgrammingLanguages[] = []; // Agrega más lenguajes según sea necesario
  public selectedLanguages: ProgrammingLanguages[] = [];

  public ngOnInit(): void {
    this.programmingLanguagesService.findAll()
      .subscribe( programmingLanguages => this.programmingLanguages = programmingLanguages );
  }

  public toggleSelection(language: ProgrammingLanguages) {
    const index = this.selectedLanguages.findIndex((lang) => lang.id === language.id);
    if (index === -1) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages.splice(index, 1);
    }
  }
  
  public isSelected(language: ProgrammingLanguages): boolean {
    return this.selectedLanguages.some((lang) => lang.id === language.id);
  }

  public onSubmit(): void {
    if(this.selectedLanguages.length == 0) return;
    this.formDataService.setProgrammingLanguagesData(this.selectedLanguages);
    this.router.navigateByUrl('/student/register/new-frameworks');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-academy-information');
  }
}
