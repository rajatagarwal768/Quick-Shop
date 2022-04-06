import React, { useState } from 'react';
import { Form,Button,Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../store/actions/cartActions';

export const PaymentScreen = ({history}) => {
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    
    if(!shippingAddress){
        history.push('/shipping');
    }

   const [paymentMethod, setPaymentMethod] = useState('PayPal');
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h2>Payment</h2>
            <Form className='my-3' onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e)=> setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='BHIM UPI'
                            id='UPI'
                            name='paymentMethod'
                            value='UPI'
                            onChange={(e)=> setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button className='my-3' type='submit'>
                    Continue
                </Button>
            </Form>
    </FormContainer>
}