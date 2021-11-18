import React, { Component,useState,useEffect }from "react";
import { useHistory, Redirect} from "react-router-dom";



export default function Comment({com}) {
    const [comments, setComments] = useState([]);
    setComments(com)
    return (
		<>
        
        {  comments.map((comment) => (
            
            <div key={comment.id}>{comment.content}</div>
        ))}
        
        </>
    );
}