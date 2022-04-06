import React from 'react';
import { Card } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Rating from './Rating';
const Product = ({product}) => {
    return(
        <div style={{width:'90%'}}>
            <Card className='my-3 p-3 rounded'>
                <NavLink to={`/product/${product._id}`} >
                    <Card.Img src={product.image} variant='top' />
                </NavLink>
                <NavLink to={`/product/${product._id}`} >
                    <Card.Text className='my-3' as='div'>
                        <strong>{product.name}</strong>
                    </Card.Text>
                </NavLink>
                <Card.Text as='div'>
                    <Rating 
                        rating={product.rating} 
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='h3'>
                    <strong>${product.price}</strong>
                </Card.Text>
            </Card>
        </div>
    );
}

export default Product;