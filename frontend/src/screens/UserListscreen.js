import React, { useEffect } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { deleteUser, getUserList } from '../store/actions/userActions';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { grey } from 'colors';
export const UserListScreen = ({history}) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete)
    const { success:successDelete } = userDelete;


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList());
        }else{
            history.push('/login');
        }
    },[dispatch,history,userInfo,successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you Sure')){
            dispatch(deleteUser(id));
            console.log('ok');
        }
    }

    return(
        <>
            <h1>Users List</h1>
            {loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message>:
                (
                    <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user)=>(
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin?(<i className='fas fa-check' style={{color:'green'}} ></i>):(<i className='fas fa-times' style={{color:'red'}} ></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit' style={{color:grey}}></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                            <i className='fas fa-trash' style={{color:'red'}} ></i>
                                        </Button>    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    );

}