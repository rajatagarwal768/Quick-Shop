import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductsDetails, updateProduct } from '../store/actions/productListActions';
import { PRODUCT_UPDATE_RESET } from '../store/actions/actionTypes';

export const ProductEditScreen = ({match,history}) => {
    const productId = match.params.id;
    
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [description,setDescription] = useState('');
    const [countInStock,setCountInStock] = useState(0);
    const [uploading,setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET});
            history.push('/admin/productlist');
        }else{
            if(!product.name || product._id!==productId){
                dispatch(listProductsDetails(productId));
            }else{
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    },[dispatch,product,productId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUser({_id:userId,name,email,isAdmin}));
        dispatch(updateProduct({
            _id:productId,
            name,
            image,
            brand,
            category,
            description,
            countInStock,
            price
        }))
    }

    const uploadFileHandler = async(e) => {
        console.log(e);
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('image',file);
        setUploading(true);
        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log(1);
            const { data }  = await axios.post('/api/upload',formData,config);
            console.log(data);
            setImage(data);
            setUploading(false);
        }catch(error){
            console.log(error);
            setUploading(false);
        }
    }

    return(
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3' style={{border:'1px solid black' ,margin:'30px'}}>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit Product Details</h1>
            {loading && <Spinner />}
            {error && <Message variant='danger'>{error}</Message>}
            {loadingUpdate && <Spinner />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange= {(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price' >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange= {(e)=>setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image' >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image URL'
                        value={image}
                        onChange= {(e)=>setImage(e.target.value)}
                    ></Form.Control>
                    <input
                        // id='image-file'
                        // label='Choose File'
                        // custom
                        type="file"
                        id="contained-button-file"
                        onChange={uploadFileHandler}
                    ></input>
                    {uploading && <Spinner />}
                </Form.Group>
                <Form.Group controlId='brand' >
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Brand'
                        value={brand}
                        onChange= {(e)=>setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category' >
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        onChange= {(e)=>setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description' >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange= {(e)=>setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock' >
                    <Form.Label>CountInStock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter CountInStock'
                        value={countInStock}
                        onChange= {(e)=>setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary' >
                    Update
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}
