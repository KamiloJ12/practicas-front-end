import { Country } from "./country.interface";

export interface Department {
    id: number;
    name: string;
    country?: Country;
}