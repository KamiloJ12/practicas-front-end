import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { ProgrammingLanguagesService } from '../../../shared/services';
import { ProgrammingLanguages } from '../../../shared/interfaces';

@Component({
  selector: 'app-register-programming-languages',
  templateUrl: './register-programming-languages.component.html',
  styleUrls: ['./register-programming-languages.component.css']
})
export class RegisterProgrammingLanguagesComponent implements OnInit {

  private router = inject(Router);
  
  private programmingLanguagesService = inject(ProgrammingLanguagesService);
  private formDataService = inject(FormDataService);
  
  public programmingLanguages: ProgrammingLanguages[] = []; // Agrega más lenguajes según sea necesario
  public selectedLanguages: number[] = [];

  public ngOnInit(): void {
    this.programmingLanguagesService.findAll()
      .subscribe( programmingLanguages => this.programmingLanguages = programmingLanguages );

    const data = this.formDataService.getFormData()?.programmingLanguages ?? [];
    this.selectedLanguages = data;
  }

  public toggleSelection(languageId: number = 0) {
    const index = this.selectedLanguages.findIndex((id) => id === languageId);
    if (index === -1) {
      this.selectedLanguages.push(languageId);
    } else {
      this.selectedLanguages.splice(index, 1);
    }
  }
  
  public isSelected(languageId: number = 0): boolean {
    return this.selectedLanguages.some((id) => id  === languageId);
  }

  public onSubmit(): void {
    if(this.selectedLanguages.length == 0) return;
    
    this.formDataService.setProgrammingLanguagesData(this.selectedLanguages);
    this.router.navigateByUrl('/student/register/new-frameworks');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-development-area');
  }
}
