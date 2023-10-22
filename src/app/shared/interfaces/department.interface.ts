import { Country } from "./country.interface";
import { Municipality } from "./municipality.interfaces";

export interface Department {
    id: number;
    name: string;
    country?: Country;
    municipalities: Municipality[];
}