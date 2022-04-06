import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { shipping } from '../store/actions/cartActions';

export const ShippingScreen = ({history}) => {
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(shipping({address,city,postalCode,country}));
        history.push('/payment');
    }

    return <FormContainer>
            <CheckoutSteps step1 step2 />
            <h2>Shipping</h2>
            <Form className='my-3' onSubmit={submitHandler}>
                <Form.Group controlId='address' >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange= {(e)=>setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='City Name'
                        value={city}
                        onChange= {(e)=>setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalcode' >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Postal Code'
                        value={postalCode}
                        onChange= {(e)=>setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange= {(e)=>setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit'>
                    Save
                </Button>
            </Form>
    </FormContainer>
}
