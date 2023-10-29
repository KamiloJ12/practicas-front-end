import { DocumentType } from "./document-type.interface";
import { Municipality } from "./municipality.interfaces";

export interface identityDocument {
    id?: number;
    documentNumber: number;
    issuancePlace: Municipality;
    issuanceDate: Date;
    documentFile: string;
    documentType: DocumentType;
    createdDate: Date;
    updatedDate: Date;
    deletedAt: Date;
}