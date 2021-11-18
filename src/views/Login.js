import React, { Component,useState,useEffect }from "react";
import {useHistory,Redirect} from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
// reactstrap components
import {
	Button,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap'

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory()
	
	useEffect(()=>{
		if(localStorage.getItem('isLoggedIn')){
			history.push('/')
		}
	},[]);
	
	const handleSubmit = e =>{
		e.preventDefault();
		
		const data = {
			email: email,
			password: password
		};
		
		axios.post('http://127.0.0.1:8000/api/user/login',data)
			 .then( res => {
				if(res.data.status ==="success"){
					setEmail('');
					setPassword('');
					localStorage.setItem('token',res.data.token);
                    localStorage.setItem('id',res.data.id);
                    localStorage.setItem('first_name',res.data.first_name);
					localStorage.setItem('isLoggedIn', true)
					history.push('/');
				}else{
					alert('error! invalid credentials')
				}
			 })
			 .catch( err => {
				console.log(err);
				alert('error! invalid credentials')
			 })
	};
 
	return (
		<>
		<Header />
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Login</h3>
		</div>
	</div>
	<div className="row justify-content-md-center">
		<div className="col-md-6">
		
			<form className='p-3' onSubmit={handleSubmit}> 
			<div className="card-body">	
				<div className="form-group">
					<label>Email</label>
					<input type="email" className="form-control" required placeholder="Email ..."
						onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-group mt-2">
					<label>Password</label>
					<input type="password" className="form-control" required placeholder="Password ..."
					onChange={e => setPassword(e.target.value)}/>
				</div>
				<div className="form-group mt-2 text-center">
					<button className="btn btn-primary btn-block ml-auto">Login</button>
				</div>
			</div>
			</form>
		</div>
	</div></div>
		</>
	)
}