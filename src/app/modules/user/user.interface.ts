
export interface IUser extends Document {
    uid: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    country: string;
    city: string;
    phoneNumber: string;
    email: string;
    work: string;
    fullName: string; // Virtual field
    isDeleted: boolean;
}