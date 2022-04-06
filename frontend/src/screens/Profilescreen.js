import React, { useEffect, useState } from 'react';
import { Col,Row,Form,Button, Container, Spinner, Table} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import { getUserDetails,updateUserProfileDetails } from '../store/actions/userActions';
import { listMyOrders } from '../store/actions/orderActions';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

export const ProfileScreen = ({history}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const myOrders = useSelector(state => state.myOrders);
    const {loading:loadingOrders,error:errorOrders,orders} = myOrders;

    useEffect(()=>{
        if(!userInfo){
            history.push('/login');
        }else{
            if(!(user.name)){
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            }else{
                console.log(user.name)
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[dispatch,history,user,userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setMessage('Passwords do not matched !!!');
        }else{
            dispatch(updateUserProfileDetails({id:user._id,name,email,password}));
        }
    }

    return <Container> 
    <Row className='my-3 py-3'>
        <Col md={3}>
            <h3>UserProfile</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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
                <Form.Group controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange= {(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange= {(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword' >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmpassword}
                        onChange= {(e)=>setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary' >
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            { loadingOrders ? <Spinner /> : errorOrders?<Message variant='danger'>{errorOrders}</Message>:
                ( <Table striped hover bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid?(order.paidAt.substring(0,10)):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                    <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                    <td>
                                        <LinkContainer to ={`/orders/${order._id}`}>
                                            <Button variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                </Table>
                    
                )
            }
        </Col>
    </Row>
    </Container>
}