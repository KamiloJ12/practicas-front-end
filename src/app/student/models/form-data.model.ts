import { Department, Municipality } from 'src/app/shared/interfaces';

export class FormData {
    firstName: string = '';
    lastName: string = '';
    gender: string = '';
    birthdate: Date | null = null;
    address: string = '';
    phoneNumber: number = 0;
    residenceDepartament: Department | null = null; 
    residenceMunicipality: Municipality | null =  null;
    
    //file: File | null = null; // Nuevo campo para el archivo
}