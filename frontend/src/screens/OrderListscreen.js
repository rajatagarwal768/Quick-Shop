import React, { useEffect } from 'react';
import { Row, Col, Spinner, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getOrderList } from '../store/actions/orderActions';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { grey } from 'colors';
import { ORDER_LIST_RESET } from '../store/actions/actionTypes';

export const OrderListScreen = ({history,match}) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders} = orderList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(()=>{
        dispatch({type:ORDER_LIST_RESET})
        if(!userInfo.isAdmin && userInfo ){
            history.push('/login');
        }
        dispatch(getOrderList());
    },[dispatch,history,userInfo])

    return(
        <>
            <Row>
                <Col>
                    <h1>Orders List</h1>    
                </Col>
            </Row>
            {loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message>:
            (
                <Table striped bordered hover responsive className='table-sm' >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id} >
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ):
                                (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0,10)
                                ):
                                (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' style={{color:grey}}></i>
                                        </Button>
                                    </LinkContainer>  
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