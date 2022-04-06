import React, { useEffect, useState } from 'react';
import { Card,Col,Image,Row,ListGroup, Spinner,Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder,deliverOrder } from '../store/actions/orderActions';
import axios from 'axios';
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../store/actions/actionTypes';

export const OrderScreen = ({match,history}) => {
    const orderId = match.params.id;

    const orderDetails = useSelector(state => state.orderDetails);
    const {loading,error,order} = orderDetails;
    console.log(order);
    const dispatch = useDispatch();

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const orderPay = useSelector(state => state.orderPay);
    const {loading:loadingPay,success:successPay} = orderPay;


    const [sdkReady,setSdkReady] = useState(false);

    useEffect(()=>{
        const addPayPalScript = async() => {
            const {data: clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        if(!order || successPay || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId));
            
        }else if(!order.isPaid){
            if(window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true);
            }
        }
    },[dispatch,orderId,order,successPay,successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId,paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
      }

    return <>
        {loading?<Spinner />: error? <Message variant='danger'>{error}</Message>:
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping:</h2>
                            <p><strong>Name:  </strong>{order.user.name}</p>
                            <p><strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p><strong>Address: </strong>
                                {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            {order.isDelivered?<Message variant='success'>Delivered Successfully</Message>:<Message variant='danger'>Not Delivered Yet</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment:</h2>
                            <p><strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid?<Message variant='success'>Paid Successfully at {order.paidAt}</Message>:<Message variant='danger'>Not Paid Yet</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Orders:</h2>
                            {order.orderItems.length===0?<Message variant='danger'>Your order is Empty !!!</Message>:
                                (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item,index)=>(
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
                                    <Col>{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Spinner/>}
                                    {!sdkReady ? (<Spinner />):(
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Spinner />}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    }
    </>
}
