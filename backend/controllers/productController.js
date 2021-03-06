import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc  Fetch all products
// @route  GET api/products
// @access  Public
export const getProducts = asyncHandler(async(req,res) => {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    const products = await Product.find({ ...keyword })
    res.json(products);
})


// @desc  Fetch single product
// @route  GET api/products/:id
// @access  Public
export const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        // res.status(404).json({message:'Produxt not Found !!! '});
        // the below two lines are alternative of the above line
        res.status(404)
        throw new Error('Product not Found');
    }
})


// @desc  Delete product
// @route  Delete api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        await product.remove();
        res.json({message:'Product Removed'});
    }else{
        res.status(404)
        throw new Error('Product not Removed');
    }
})

// @desc  Create Product
// @route  Post api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample Brand',
        category:'Sample Category',
        countInStock:0,
        numReviews:0,
        description:'Sample Description'
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})


// @desc  Update Product
// @route  Put api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async(req,res) => {
    const {name,price,description,image,brand,category,countInStock}=req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name
        product.price = price
        product.description=description
        product.image = image
        product.brand = brand 
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }else{
        res.status(404);
        throw new Error('Updation Failed');
    }
})


// @desc  Create Review
// @route  Post api/products/:id/review
// @access  Private
export const createReview = asyncHandler(async(req,res) => {
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        const alreadyReviewed = product.reviews.find(r=> r.user.toString()===req.user._id.toString());
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already Reviewed');
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,item)=> item.rating+acc,0)/product.numReviews;
        await product.save();
        res.status(201).json({message:'Review Added'});
    }else{
        res.status(404);
        throw new Error('Updation Failed');
    }
})