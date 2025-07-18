import { Router } from 'express';
import {
    createUserController,
    getAllUsersController,
    getUserByUIDController,
    deleteUserByUIDController,
    updateUserByUIDController,
    toggleUserDeleteStatusController,
    getDeletedUsersController,
} from './user.controller';

const router = Router();

// Create a user
router.post('/create-user', createUserController);

// Get all users
router.get('/get-all-users', getAllUsersController);

// Get a single user by UID
router.get('/get-user/:uid', getUserByUIDController);

// Delete a user by UID
router.delete('/delete-user/:uid', deleteUserByUIDController);

// Update a user by UID
router.put('/update-user/:uid', updateUserByUIDController);



// Route to toggle user delete status
router.patch('/user/:uid/toggle-delete', toggleUserDeleteStatusController);

// Route to get deleted users
router.get('/users/deleted', getDeletedUsersController);


export default router;
