import React, { Component,useState,useEffect }from "react";
import { useHistory, Redirect} from "react-router-dom";
import axios from "axios";
import moment from 'moment';

import Header from "../components/Header/Header";
import Comments from "../components/Comments"; 
import {Card} from 'react-bootstrap'
export default function Post(props) {
	const history = useHistory()
	 
	
	const [Content, setContent] = useState('');
	
	const token = localStorage.getItem("token");
	const id_user = localStorage.getItem('id');
	const first_name = localStorage.getItem('first_name');
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [isFailed, setIsFailed] = useState(false);
	
	const config = {
		headers: {
		  'Authorization': 'Bearer ' + token
		}
	  }
	  
	/* Fetch POSTS */
		 
		function fetchPosts(){
				setIsLoading(true)
				console.log(config)
				axios.get('http://127.0.0.1:8000/api/user/posts',config)
					.then((res) => {
						
 						const posts = res.data.data
					 
						setPosts(posts)
						setIsLoading(false)
					})
					.catch((err) => {
						console.log(err);
						setIsFailed(true)
						setIsLoading(false)
					})
			}

		useEffect(() => {
			fetchPosts()
		}, []);	
	  
	
	/* Submit BlogPost*/
	const handleSubmit = e =>{
		e.preventDefault();
		
		
		const data = {
			content : Content,
		};
		
		axios.post('http://127.0.0.1:8000/api/user/posts',data,config)
			 .then( res => {
				setContent('');
				 
				console.log(res);
				//reset form inputs
				e.target.reset();
				fetchPosts()

			 })
			 .catch( err => {
				console.log(err);
			 })
	};

     /* Delete Action*/
	function Delete(id){
		axios.delete('http://127.0.0.1:8000/api/user/posts/'+id,config)
			 .then( res => {
				if(res.data.status ==="success"){
					const alldata = posts.filter(post=>post.id !== id)
					setPosts(alldata)
				}else{
					alert('error')
				}
			 })
			 .catch( err => {
				console.log(err);
			 })
	}
 

	return (
		<>
		<Header />
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Blog Posts</h3>
		</div>
	</div>
	
	<Card  className="mb-5">
	<Card.Header>Hi {first_name}, what's new?</Card.Header>
		<Card.Body>
		<form className='p-3' onSubmit={handleSubmit}> 
		<input type="text" className="form-control" id="content" name="content" required placeholder="Post content ..."
						onChange={e => setContent(e.target.value)}/>
		<div className="form-group mt-2 float-end">
			<button className="btn btn-primary btn-block ml-auto">Publish</button>
		</div>
		</form>
			 
		</Card.Body>
	</Card>
	<div className="row justify-content-md-center">
		
		
		
		<h3> Posts List </h3>
		</div>

		
		{posts.map((post) => (
			 <Card key={post.id}  className="mb-5">
			 <Card.Header>
				 [{moment(new Date(post.created_at)).format("DD/MM/YYYY, hh:mm:ss")}] <b>{post.user.first_name}</b>
				 { post.user_id == id_user ? <a className="text-danger cursor-pointer float-end" onClick={()=>Delete(post.id)}>Delete</a> : '' }
			 </Card.Header>
			 <Card.Body>
				 <blockquote className="blockquote mb-0">
				 <p>{post.content}</p>
				 <hr />
				 <Card.Title>Comments</Card.Title>
				 <footer className="blockquote-footer">
					 <Comments postId={post.id}></Comments>
				 </footer>
				 </blockquote>
			 </Card.Body>
		 </Card>
		))}
		
		</div>
		</>
	)
}