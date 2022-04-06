import express from 'express';
const router = express.Router();
import { authUser,deleteUser,getProfile,getUserById,listUsers,registerUser, updateProfile, updateUser } from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

router.route('/').post(registerUser).get(protect,admin,listUsers);
router.post('/login',authUser);
router.route('/profile').get(protect,getProfile).put(protect,updateProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);

export default router;