import React, { Fragment, useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Button, Input} from 'antd';
import axios from 'axios';
import SingleComment from './singleComment';
import ReplyComment from './replyComment';

const {TextArea}=Input;

function Reviews(props) {
    console.log(props.reviews)
    return (
        <div>
            <p>Reviews</p>
            <hr/>
            {/* comments list*/}
            {props.reviews && props.reviews.map((comment, index)=>(
                (!comment.replyTo && 
                    <Fragment key={index}>
                        <SingleComment comment={comment} movieId={props.movieId} updateComentsList={props.updateComentsList} />
                    </Fragment>
                )
            ) )}

            {props.reviews && props.reviews.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'10rem'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }   
        </div>
    )
}

export default Reviews
