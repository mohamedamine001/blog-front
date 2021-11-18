import React, {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";

export default function Protected(props) {
	const Cmp = props.Cmp
	const history = useHistory()
	
	useEffect(()=>{
		if(!localStorage.getItem('isLoggedIn')){
			history.push('/login')
		}
	},[]);
	
	return (
		<div>
			<Cmp />
		</div>
	)
}