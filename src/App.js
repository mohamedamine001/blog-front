import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Redirect} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header";
import Register from "./views/Register";
import Login from "./views/Login";
import Post from "./views/Post";
 
import Protected from "./components/Protected";

function App() {
  return (
    <Router>
		
		<Switch>
			<Route path='/login'    component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/posts'>
				<Protected Cmp={Post} />
			</Route>
			 
			<Route path='/'>
				<Protected Cmp={Post} />
			</Route>
		</Switch>
	</Router>
  );
}

export default App;
