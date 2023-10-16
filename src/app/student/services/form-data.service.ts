import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: FormData = new FormData();

  getFormData(): FormData {
    return this.formData;
  }

  setFormData(data: FormData): void {
    this.formData = { ...data };
  }

  clearFormData(): void {
    this.formData = new FormData();
  }
}
