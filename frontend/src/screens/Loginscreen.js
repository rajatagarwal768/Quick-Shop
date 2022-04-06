import React, { useEffect, useState } from 'react';
import { Col,Row,Form,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../store/actions/userActions';

export const LoginScreen = ({history,location}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { error, userInfo } = userLogin;

    const redirect = location.search? location.search.split('=')[1]:'/';

    useEffect(()=>{
        if(userInfo){
            history.push(redirect);
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password));
    }

    return(
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
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
                <Button className='py-3' type='submit' variant='primary' >
                    Sign In
                </Button>
                <Row>
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect?`/register/redirect=${redirect}`:'/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}