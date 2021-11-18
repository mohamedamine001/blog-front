import React, { Component } from "react";
import {Redirect, useHistory} from "react-router-dom";
import {
	UncontrolledCollapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavLink,
	NavItem,
	Nav,
	Container,
	Row,
	Col,
	NavDropdown,Button
} from 'react-bootstrap'



export default function Header(props) {
		const history = useHistory();
	 
	function logout(){
		localStorage.clear()
		history.push('/login')
	}
	return (
		<>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Mini-Blog APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {
				localStorage.getItem('isLoggedIn')?
                <>
                <Nav.Link href="/posts">Posts</Nav.Link>
                
                </>
                :
                <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                </>
            }
            </Nav>
			{
				localStorage.getItem('isLoggedIn')?
                <>
			<Nav>
			<NavDropdown title={localStorage.getItem('first_name')}id="basic-nav-dropdown">
				<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
			</NavDropdown>
			</Nav>
				</>
			: ''
			}			
            </Navbar.Collapse>
        </Container>
        </Navbar>
		</>
	)
}