import { IUser } from './user.interface';
import { User } from './user.model';

// Create a new user
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern?.uid) {
            throw new Error('This UID is already in use.');
        }
        throw error; // Re-throw other errors
    }
};

// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find({ isDeleted: false }); // Only get users where isDeleted is false
};

export const getUserByUID = async (uid: string): Promise<IUser | null> => {
    return await User.findOne({ uid });
};

export const deleteUserByUID = async (uid: string): Promise<IUser | null> => {
    return await User.findOneAndDelete({ uid });
};

export const updateUserByUID = async (uid: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findOneAndUpdate({ uid }, updateData, { new: true, runValidators: true });
};


export const toggleUserDeleteStatus = async (uid: string): Promise<IUser | null> => {
    // Find the user and toggle the 'isDeleted' status
    const user = await User.findOne({ uid });

    if (user) {
        user.isDeleted = !user.isDeleted; // Toggle isDeleted value
        await user.save(); // Save the updated user
    }

    return user;
};

export const getDeletedUsers = async (): Promise<IUser[]> => {
    // Fetch all users with isDeleted = true
    return await User.find({ isDeleted: true });
};