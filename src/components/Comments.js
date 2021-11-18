import React, { Component,useState,useEffect }from "react";
import { useHistory, Redirect} from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import {Alert} from 'react-bootstrap'
export default function Comments({postId}) {
    console.log(postId+'    ... PROPS');
    const [comments, setComments] = useState([]);
    const [Comment, setComment]  = useState('');
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem('id');
    const config = {
		headers: {
		  'Authorization': 'Bearer ' + token
		}
	}
    /* Fetch Comments */
		 
		function fetchComments(){
            
            console.log(config)
            axios.get('http://127.0.0.1:8000/api/user/comments?post_id='+postId,config)
                .then((res) => {
                    
                    const comm = res.data.data
                    setComments(comm)
                   console.log(JSON.stringify(comm))
                })
                .catch((err) => {
                     
                    console.log(err);
                     
                })
        }

        useEffect(() => {
            fetchComments()
        }, []);
       /* Submit Comment*/
	const handleSubmitComment = (e,id) =>{
		e.preventDefault();
		
		
		const data = {
			content : Comment,
            post_id : id
		};
		
		axios.post('http://127.0.0.1:8000/api/user/comments',data,config)
			 .then( res => {
				setComment('');
				//reset form inputs
				e.target.reset();
				fetchComments()
			 })
			 .catch( err => {
				console.log(err);
			 })
	};

    /* Delete Action*/
	function Delete(id){
		axios.delete('http://127.0.0.1:8000/api/user/comments/'+id,config)
			 .then( res => {
				if(res.data.status ==="success"){
					const alldata = comments.filter(comment=>comment.id !== id)
					setComments(alldata)
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
        {comments.map((comment) => (
            <Alert key={comment.id}>
             <b>{comment.user.first_name}</b> :  {comment.content}
                <p><i>{moment(new Date(comment.created_at)).format("DD/MM/YYYY, hh:mm:ss")}</i> { comment.user_id == id_user ?   <a className="text-blue cursor-pointer " onClick={()=>Delete(comment.id)}>- Delete</a> : '' }</p>
            </Alert>
        ))}
        
            <form  onSubmit={e => handleSubmitComment(e,postId)}> 
                
                    <div className="form-group">
                        
                        <input type="text" className="form-control" id="comment" name="comment" required placeholder="Enter your comment ..."
                            onChange={e => setComment(e.target.value)}/>
                    </div>
                    
                    <div className="form-group mt-2 pull-right">
                        <button className="btn btn-primary btn-block float-end">Publish</button>
                    </div>
                
            </form>
        
        </>
    );
}