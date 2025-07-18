import { NextFunction, Request, Response } from 'express';
import { createUser, deleteUserByUID, getAllUsers, getDeletedUsers, getUserByUID, toggleUserDeleteStatus, updateUserByUID } from './user.service';

export const createUserController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await createUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error: any) {
        if (error.message === 'This UID is already in use.') {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        next(error); // Pass other errors to the error handler
    }
};
export const getAllUsersController = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const users = await getAllUsers();

        if (!users.length) {
            return res.status(200).json({
                success: true,
                message: 'No users found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            total: users.length,
            data: users,
        });
    } catch (error: any) {
        next(error); // Pass errors to Express error handler
    }
};

export const getUserByUIDController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { uid } = req.params;
        const user = await getUserByUID(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        next(error); // Pass error to the handler
    }
};

export const deleteUserByUIDController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { uid } = req.params;
        const user = await deleteUserByUID(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserByUIDController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { uid } = req.params;
        const updatedUser = await updateUserByUID(uid, req.body);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};



export const toggleUserDeleteStatusController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { uid } = req.params;
        const user = await toggleUserDeleteStatus(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: `User ${user.isDeleted ? 'marked as deleted' : 'restored'}`,
        });
    } catch (error) {
        next(error);
    }
};

// New controller to fetch deleted users
export const getDeletedUsersController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const deletedUsers = await getDeletedUsers();

        res.status(200).json({
            success: true,
            data: deletedUsers,
        });
    } catch (error) {
        next(error);
    }
};