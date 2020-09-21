import React, { useState } from 'react'
import {Comment, Avatar, Button, Input} from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LikeDislikes from './LikeDislikes';


const {TextArea}= Input;

function SingleComment(props) {
    const User = useSelector(state => state.user)
    const [commentBody, setCommentBody] = useState("");
    const [openReplyForm, setOpenReplyForm] = useState(false);

    const handleChange=(e)=>{
        setCommentBody(e.currentTarget.value);
    }

    const handleReplyChange=()=>{
        setOpenReplyForm(!openReplyForm);
    }

    const handleSubmitReply=(e)=>{
        e.preventDefault();
        const comment={
            sender: User.userData._id,
            movieId: props.movieId,
            replyTo: props.comment._id,
            body: commentBody
        }
        axios.post('/api/comments/addComment', comment)
        .then(response=>{
            if(response.data.success){
                setCommentBody("");
                setOpenReplyForm(!openReplyForm);
                props.updateComentsList(response.data.result);
            }else{
                alert('Failed to add comment');
            }
        })
    }

    const action=[
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span style={{marginLeft: '1.3rem'}} key="comment-basic-reply-to" onClick={handleReplyChange} >Reply</span>
    ]
    return (
        <div>
            <Comment
                actions={action}
                author={props.comment.sender.name}
                avatar={
                    <Avatar src={props.comment.sender.image} alt="image" />
                }
                content={<p>{props.comment.body}</p>}
            ></Comment>    
            {openReplyForm &&
             (
                <form style={{display: 'flex', marginTop: '2rem'}} >
                <TextArea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={commentBody}
                    placeholder="Write your comment"
                />
                <br/>
                <Button style={{width: '20%', height: '52px'}} onClick={handleSubmitReply} >Send</Button>
            </form>
            )
            }
        </div>
    )
}

export default SingleComment
