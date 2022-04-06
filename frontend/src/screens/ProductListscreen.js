import React, { useEffect } from 'react';
import { Row, Col, Spinner, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { listMyOrders } from '../store/actions/orderActions';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { grey } from 'colors';
import { createProduct, deleteProduct } from '../store/actions/productListActions';
import { PRODUCT_CREATE_RESET } from '../store/actions/actionTypes';

export const ProductListScreen = ({history,match}) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete)
    const { loading:loadingDelete,error:errorDelete,success:successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate)
    const { loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct } = productCreate;

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(userInfo && !userInfo.isAdmin){
            history.push('/login');
        }
        if(successCreate){
            history.push(`/admin/products/${createdProduct._id}/edit`);

        }else{
            dispatch(listMyOrders('',pageNumber));
        }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm('Are you Sure')){
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return(
        <>
            <Row>
                <Col>
                    <h1>Products List</h1>    
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler} style={{margin:'10px'}}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Spinner />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Spinner />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            
            {loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message>:
            (
                <Table striped bordered hover responsive className='table-sm' >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr key={product._id} >
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' style={{color:grey}}></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='light' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                        <i className='fas fa-trash' style={{color:'red'}} ></i>
                                    </Button>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>                    
    );
                        
}

// Delete krta hu to page refresh nhi hota