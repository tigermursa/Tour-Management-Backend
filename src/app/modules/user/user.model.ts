import mongoose, { Document, Model } from 'mongoose';
import { IUser } from './user.interface';



// Define the User schema
const userSchema = new mongoose.Schema<IUser>(
    {

        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: 0,
            max: 120, // Example: Realistic age range
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'], // Enum for gender values
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            match: /^\+?[0-9\s\-]+$/, // Example: Validates international phone numbers
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
        },
        work: {
            type: String,
            required: true,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
        versionKey: false, // Disable the "__v" field
    }
);

// Add virtual full name field
userSchema.virtual('fullName').get(function (this: IUser) {
    return `${this.firstName} ${this.lastName}`;
});

// Add indexes for faster queries
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ country: 1, city: 1 });

// Compile the schema into a model
export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
