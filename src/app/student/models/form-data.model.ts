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
    
    identityDocument: identityDocument | null = new identityDocument();
}

class identityDocument {
    documentNumber: number = 0;
    issuancePlace: Municipality | null = null;
    issuanceDate: Date | null = null;
    documentFile: File | null = null;
    documentType: DocumentType | null = null;
}