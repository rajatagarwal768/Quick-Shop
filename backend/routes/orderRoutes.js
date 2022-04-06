import express from 'express';
const router = express.Router();
import { protect,admin } from '../middlewares/authMiddleware.js';
import { createOrders, getMyOrders, getOrderById, getOrders, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js';

router.route('/').post(protect,createOrders).get(protect,admin,getOrders);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
// we can try put request using get in postman

export default router;
