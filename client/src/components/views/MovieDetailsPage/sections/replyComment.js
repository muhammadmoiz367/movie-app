import React, { Fragment, useEffect, useState } from 'react'
import SingleComment from './singleComment'

function ReplyComment(props) {
    const [replyCommentsNumber, setReplyCommentsNumber] = useState(0)
    const [openReplyComments, setOpenReplyComments] = useState(false)

    const handleShowReplies=()=>{
        setOpenReplyComments(!openReplyComments)
    }

    useEffect(() => {
        let replyCommentsNo=0;
        if(props.commentsList){
            props.commentsList.map(comment=>{
                if(comment.replyTo === props.parentCommentId)
                    replyCommentsNo++;
            })
        }
        setReplyCommentsNumber(replyCommentsNo);
    }, [props.commentsList, props.parentCommentId])

    return (
        <div>
            {replyCommentsNumber > 0 && (
                <p style={{fontSize: '14px', color: 'grey', margin: 0, cursor: 'pointer'}} onClick={handleShowReplies} >
                    View {replyCommentsNumber} more comment(s)
                </p>
            )}

            {openReplyComments && props.commentsList && props.commentsList.map((comment, index)=>(
                <Fragment key={index}>
                    {comment.replyTo === props.parentCommentId && (
                        <div style={{marginLeft: '50px', width: '80%'}}>
                            <SingleComment comment={comment} movieId={props.movieId} updateComentsList={props.updateComentsList} />
                            <ReplyComment commentsList={props.comments} movieId={props.movieId} updateComentsList={props.updateComentsList} />
                        </div>
                    )}
                </Fragment>
            ) )}

        </div>
    )
}

export default ReplyComment
