import express from 'express';
const router = express.Router();
import {createProduct, createReview, deleteProduct, getProductById, getProducts, updateProductById} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProductById);
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProductById).post(protect,createReview);


// router.get('/',asyncHandler(async(req,res)=>{
//     const products = await Product.find({});
//     res.json(products);
// }));



// router.get('/:id',asyncHandler(async(req,res)=>{
//     const product = await Product.findById(req.params.id);
//     if(product){
//         res.json(product);
//     }else{
//         // res.status(404).json({message:'Produxt not Found !!! '});
//         // the below two lines are alternative of the above line
//         res.status(404)
//         throw new Error('Product not Found');
//     }
    
// }));

export default router;