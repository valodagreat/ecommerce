import React from 'react'
import { Nav, Navbar,Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../redux/User/userTypes';
import SearchBox from '../SearchBox/SearchBox';

function Header() {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const logoutHandle = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Shop It</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link ><i className="fas fa-shopping-cart"></i>{cartItems.length === 0 ? "" : cartItems[0].qty ? (cartItems.reduce((acc, item) =>(acc + item.qty),0)) : cartItems.length} Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? 
                        (<NavDropdown title={userInfo.name} id="username">
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandle}>Logout</NavDropdown.Item>
                        </NavDropdown>) : <LinkContainer to='/login'>
                            <Nav.Link ><i className="fas fa-user"></i> Sign In</Nav.Link>
                        </LinkContainer>}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title={`Admin`} id="adminmenu">
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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
