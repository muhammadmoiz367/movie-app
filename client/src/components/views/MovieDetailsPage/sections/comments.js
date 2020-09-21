import React, { Fragment, useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Button, Input} from 'antd';
import axios from 'axios';
import SingleComment from './singleComment';
import ReplyComment from './replyComment';

const {TextArea}=Input;

function Comments(props) {
    const [commentBody, setCommentBody] = useState("");
    const User = useSelector(state => state.user)

    const handleChange=(e)=>{
        setCommentBody(e.currentTarget.value)
    }
    const handleSendComment=()=>{
        const comment={
            sender: User.userData._id,
            movieId: props.movieId,
            body: commentBody
        }
        axios.post('/api/comments/addComment', comment)
        .then(response=>{
            if(response.data.success){
                setCommentBody("");
                props.updateComentsList(response.data.result);
                console.log(response.data.result);
            }else{
                alert('Failed to add comment');
            }
        })
        .catch(err=> console.log(err))
    }

    return (
        <div>
            <p>Comments</p>
            <hr/>
            {/* comments list*/}
            {props.comments && props.comments.map((comment, index)=>(
                (!comment.replyTo && 
                    <Fragment key={index}>
                        <SingleComment comment={comment} movieId={props.movieId} updateComentsList={props.updateComentsList} />
                        <ReplyComment commentsList={props.comments} movieId={props.movieId} parentCommentId={comment._id} updateComentsList={props.updateComentsList} />
                    </Fragment>
                )
            ) )}

            {props.comments && props.comments.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'10rem'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }   

            {/*root comment form*/}
            <form style={{display: 'flex', marginTop: '2rem'}} >
                <TextArea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={commentBody}
                    placeholder="Write your comment"
                />
                <br/>
                <Button style={{width: '20%', height: '52px'}} onClick={handleSendComment} >Send</Button>
            </form>
        </div>
    )
}

export default Comments
