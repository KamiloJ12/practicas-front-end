import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-basic-personal-information',
  templateUrl: './basic-personal-information.component.html',
  styleUrls: ['./basic-personal-information.component.css']
})
export class BasicPersonalInformationComponent {

  private fb = inject( FormBuilder );
  private router = inject( Router );

  public basicPersonalForm: FormGroup = this.fb.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    gender: ['', [ Validators.required ]],
    birthdate: ['', [ Validators.required ]],
    address: ['', [ Validators.required ]],
    phoneNumber: ['', [ Validators.required ]],
    residenceDepartament: ['', [ Validators.required ]],
    residenceMunicipality: ['', [ Validators.required ]],
  });

  public filteredMunicipalities: any[] = [];

  filterMunicipality(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    console.log(query);
  }

  submitForm() {
    console.log(this.basicPersonalForm.value);
  }
}
