import { Department } from "./department.interface";

export interface Country {
    id: number;
    name: string;
    departments: Department[];
}