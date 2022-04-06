import React, { useEffect, useState } from 'react';
import { Col,Row,Form,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../store/actions/userActions';

export const RegisterScreen = ({history,location}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { error, userInfo } = userRegister;

    const redirect = location.search? location.search.split('=')[1]:'/';

    useEffect(()=>{
        if(userInfo){
            history.push(redirect);
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setMessage('Passwords do not matched !!!');
        }else{
            dispatch(register(name,email,password));
        }
    }

    return(
        <FormContainer>
            <h1>Register your Account</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
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
                    Register
                </Button>
                <Row>
                    <Col>
                        Already a User?{' '}
                        <Link to={redirect?`/login/redirect=${redirect}`:'/login'}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}