import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[errorLabel]'
})
export class ErrorLabelDirective {

    private htmlElement?: ElementRef<HTMLElement>;
    private _errors?: ValidationErrors | null;

    @Input() set errors(value: ValidationErrors | null | undefined) {
        this._errors = value;
        this.setErrorMessage();
    }

    constructor(private el: ElementRef<HTMLElement>) {
        this.htmlElement = el;
    }

    setErrorMessage(): void {
        if (!this.htmlElement) return;
        if (!this._errors) {
            this.htmlElement.nativeElement.innerText = '';
            return;
        }

        console.log( this._errors );
        const errors = Object.keys(this._errors);
        console.log(errors);

        if (errors.includes('required')) {
            this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
            return;
        }

        if (errors.includes('minlength')) {
            const min = this._errors!['minlength']['requiredLength'];
            // const current = this._errors!['minlength']['actualLength'];
            this.htmlElement.nativeElement.innerText = `Mínimo ${min} caracteres.`;
            return;
        }

        if (errors.includes('email')) {
            this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
            return;
        }

        if (errors.includes('pattern')) {
            this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
            return;
        }

        if (errors.includes('notEqual')) {
            this.htmlElement.nativeElement.innerText = 'Las contraseñas deben ser iguales.';
            return;
        }

    }


}