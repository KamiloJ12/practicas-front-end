import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService, MunicipalityService, ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';
import { Department, DocumentType, Municipality, identityDocument } from 'src/app/shared/interfaces';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DocumentTypeService } from '../../../shared/services/document-type.service';

@Component({
  selector: 'app-identity-information',
  templateUrl: './identity-information.component.html',
  styleUrls: ['./identity-information.component.css']
})
export class IdentityInformationComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private munipalityService = inject(MunicipalityService);
  private documentTypeService = inject(DocumentTypeService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  
  public identityForm: FormGroup = this.fb.group({
    documentNumber: [null, [ Validators.required, Validators.min(0) ]],
    issuancePlace: [null, [ Validators.required ]],
    issuanceDate: [null, [ Validators.required ]],
    documentFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
    documentType: [null, [ Validators.required ]],
  });

  public filteredMunicipalities: Municipality[] = [];
  public filteredDepartments: Department[] = [];
  public documentsType: DocumentType[] = [];

  get identityInfo() {
    return this.identityForm.value;
  }

  ngOnInit(): void {
    this.documentTypeService.getDocumentsType()
      .subscribe(documentsType => this.documentsType = documentsType);
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.identityForm, field );
  }

  filterMunicipality(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    const departament = this.identityForm.get('residenceDepartament')?.value.name;
    this.munipalityService.getSuggestion(query, departament)
      .subscribe( municipalities => this.filteredMunicipalities = municipalities ); 
  }

  filterDepartament(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.departmentService.getSuggestion(query)
      .subscribe( departments => this.filteredDepartments = departments ); 
  }

  submitForm() {
    if (this.identityForm.invalid) {
      return this.identityForm.markAllAsTouched();
    }
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      identityDocument: this.identityForm.value
    });
    console.log(this.formDataService.getFormData());
    this.router.navigateByUrl('/student/register/identity-information');
  }

  @ViewChild('fileInput') fileInput!: any;

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    if (files?.length) {
      this.identityForm.get('documentFile')?.setValue(files[0]);
    } if (this.identityForm.get('documentFile')?.hasError('invalidFileType')) {
      this.identityForm.get('documentFile')?.setValue(null);
    }
    this.fileInput.nativeElement.value = '';
  }
}
