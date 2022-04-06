import React, { useEffect } from 'react';
import { Button,Card,Col,Image,Row,ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../store/actions/orderActions';

export const PlaceOrderScreen = ({history}) => {
    const cart = useSelector((state) => state.cart);
    
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2);
    }
    const dispatch = useDispatch();
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc+item.qty+item.price,0).toFixed(2));
    cart.shippingPrice = addDecimals(cart.itemsPrice>700 ? 0 : 30);
    cart.taxPrice = addDecimals(Number((cart.itemsPrice*0.15).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const {error,order,success} = orderCreate;

    useEffect(()=>{
        if(success){
            history.push(`/orders/${order._id}`)
        }
        // eslint-disable-next-line
    },[history,success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }));       
    }

    return(
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping:</h2>
                            <p><strong>Address: </strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment:</h2>
                            <p><strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Orders:</h2>
                            {cart.cartItems.length===0?<Message variant='danger'>Your Cart is Empty !!!</Message>:
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item,index)=>(
                                            <ListGroup.Item key={index} >
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty}*{item.price} = {item.price*item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )       
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={placeOrderHandler}>
                                    Place Your Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
