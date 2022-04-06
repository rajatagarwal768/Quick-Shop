import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails,updateUser } from '../store/actions/userActions';
import { USER_UPDATE_RESET } from '../store/actions/actionTypes';

export const UserEditScreen = ({match,history}) => {
    const userId = match.params.id;
    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin,setisAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading:loadingUpdate,error:errorUpdate, success:successUpdate } = userUpdate;

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET});
            history.push('/admin/userlist');
        }else{
            if(!user.name || user._id!==userId){
                dispatch(getUserDetails(userId));
            }else{
                setName(user.name);
                setEmail(user.email);
                setisAdmin(user.isAdmin);
            }
        }
    },[dispatch,user,userId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:userId,name,email,isAdmin}));
    }

    return(
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3' style={{border:'1px solid black' ,margin:'30px'}}>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit User Details</h1>
            {loadingUpdate && <Spinner />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Form.Group controlId='isAdmin' >
                    <Form.Check
                        type='checkbox'
                        label='IsAdmin'
                        checked={isAdmin}
                        onChange= {(e)=>setisAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary' >
                    Update
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}