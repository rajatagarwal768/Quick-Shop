import React from 'react';
import { Route } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import {logout} from '../store/actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }
    return(
        <header>
            <Navbar bg="primary" variant="dark" collapseOnSelect>
                <Container>
                    {/* <img style={{width:'50px'}} src="./images/icon.jpg" alt='icon'></img> */}
                    <LinkContainer to="/">
                        <Navbar.Brand>Quick Shop</Navbar.Brand>
                    </LinkContainer>
                    <div><Route render={({ history }) => <SearchBox history={history} />} /></div>
                    <Nav className="ml-auto">
                        <LinkContainer to='/'>
                            <Nav.Link><i className="fas fa-home"></i>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo? (
                            <NavDropdown title={userInfo.name} id='username' >
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </NavDropdown>) :
                            (<LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i>Sign in</Nav.Link>
                            </LinkContainer>)
                        }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
