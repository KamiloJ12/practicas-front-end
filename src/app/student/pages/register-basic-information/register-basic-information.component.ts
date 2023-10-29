import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService, MunicipalityService, ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';
import { Department, Municipality } from 'src/app/shared/interfaces';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-register-basic-information',
  templateUrl: './register-basic-information.component.html',
  styleUrls: ['./register-basic-information.component.css']
})
export class RegisterBasicInformationComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  private departmentService = inject(DepartmentService);
  private munipalityService = inject(MunicipalityService);
  private studentsSerive = inject(StudentsService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public pictureUrl: string = 'https://blocks.primeng.org/assets/images/blocks/avatars/circle-big/avatar-f-2.png';
  public departments: Department[] = [];
  public municipalities: Municipality[] = [];

  public form: FormGroup = this.fb.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    gender: ['Masculino', [ Validators.required ]],
    birthdate: ['', [ Validators.required ]],
    address: ['', [ Validators.required ]],
    phoneNumber: ['', [ Validators.required ]],
    residenceDepartament: ['', [ Validators.required ]],
    residenceMunicipality: ['', [ Validators.required ]],
    resumeDocumentFile: [null, [ Validators.required ]],
    pictureFile: [null, [ Validators.required ]],
  });

  public ngOnInit(): void {
    this.departmentService.findByCountry(1)
      .subscribe( departments => this.departments = departments );
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onPictureChange(event: any): void {
    console.log(event);
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      this.form.get('pictureFile')?.setValue(file);
      this.pictureUrl = URL.createObjectURL(file);
    } else {
      this.pictureUrl = 'https://blocks.primeng.org/assets/images/blocks/avatars/circle-big/avatar-f-2.png';
    }
  }

  public onDocumentFileChange(file: File): void {
    this.form.get('resumeDocumentFile')?.setValue(file);
  }

  public onDepartmentChange(event: any): void {
    const departmentId = event?.value?.id;
    if(!departmentId) return;

    this.munipalityService.findByDepartment(event.value.id)
      .subscribe( municipalities => this.municipalities = municipalities );
  }

  public onSubmit(): void {
    //if(!this.form.valid) return this.form.markAllAsTouched();
    this.formDataService.setBasicData(this.form);
    //this.studentsSerive.createStudent(formData)
    //  .subscribe();
    this.router.navigateByUrl('/student/register/new-identity-documentation');
  }

}
