import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc   Auth user and get token
// @route  POST api/users/login
// @access  Public
export const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    
    const user = await User.findOne({email});

    if(user && await user.matchPassword(password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

})


// @desc   Get Profile
// @route  Get api/users/profile
// @access  Private
export const getProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404);
        // throw new Error('NOT REGISTERED');
    }
})


// @desc   Register a user
// @route  GET api/users/
// @access  Public
export const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    
    const existedUser = await User.findOne({email});

    if(!existedUser){
        const newUser = await User.create({
            name,
            email,
            password
        })
        if(newUser){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            })
        }
    }else{
        res.status(400);
        throw new Error('User already Existed');
    }

})


// @desc   Update Profile
// @route  Put api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password= req.body.password
        }
        const updatedUser = await user.save();
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        // throw new Error('NOT REGISTERED');
    }
})


// @desc   Get all users
// @route  Get api/users
// @access  Private/Admin
export const listUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users);
})


// @desc   Remove a user
// @route  Delete api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({message: 'User Removed Successfully !!!'});
    }else{
        res.status(404);
        throw new Error('User Not Present');
    }
})



// @desc   Get a user by id
// @route  Get api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
})



// @desc   Update User
// @route  Put api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        
        const updatedUser = await user.save();
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('Problem in Updating');
    }
})

