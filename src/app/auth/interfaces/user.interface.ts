export interface User {
    id: number;
    email: string;
    isActive: boolean;
    isEmailConfirmed: boolean;
    role: string;
    deletedAt: Date;
}
