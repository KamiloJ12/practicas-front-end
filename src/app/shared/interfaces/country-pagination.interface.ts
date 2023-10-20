import { Country } from "./country.interface";

export interface CountryPagination {
    count: number;
    items: Country[];
}