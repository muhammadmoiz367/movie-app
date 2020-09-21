import React, { Fragment, useEffect, useState } from 'react'
import { Icon, Tooltip } from 'antd'
import axios from 'axios'

function LikeDislikes(props) {
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [likeStatus, setLikeStatus]=useState(null);
    const [dislikeStatus, setDislikeStatus]=useState(null);

    let likeData={}

    if(props.movie){
        likeData={ 
            movieId: props.movieId,
            userId: props.userId
        }
    }else{
        likeData={ 
            commentId: props.commentId,
            userId: props.userId
        }
    }

    const onLike=()=>{
         if(likeStatus===null){
            axios.post('/api/likes/like', likeData)
            .then(response=>{
                if(response.data.success){
                    setLikes(likes+1);
                    setLikeStatus('liked');
                    if(dislikeStatus==='disliked'){
                        setDislikeStatus(null);
                        setDislikes(dislikes-1);
                    }
                }else{
                    alert('Failed to like')
                }
            })
         }else{
            axios.post('/api/likes/unlike', likeData)
            .then(response=>{
                if(response.data.success){
                    setLikes(likes-1);
                    setLikeStatus(null);
                }else{
                    alert('Failed to unlike')
                }
            })
         }
    }

    const onDislike=()=>{
        if(dislikeStatus===null){
            axios.post('/api/likes/dislike', likeData)
            .then(response=>{
                if(response.data.success){
                    setDislikes(dislikes+1);
                    setDislikeStatus('disliked');
                    if(likeStatus==='liked'){
                        setLikeStatus(null);
                        setLikes(likes-1);
                    }
                }else{
                    alert('Failed to dislike')
                }
            })
        }else{
            axios.post('/api/likes/undislike', likeData)
            .then(response=>{
                if(response.data.success){
                    setDislikes(dislikes-1);
                    setDislikeStatus(null);
                }else{
                    alert('Failed to undislike')
                }
            })
        }
    }

    useEffect(() => {
        axios.post('/api/likes/getLikes', likeData)
        .then(response=>{
            if(response.data.success){
                // Likes for this movie 
                setLikes(response.data.likes.length);

                // Check whether i liked or not
                response.data.likes.map(like=>{
                    if(like.userId === props.userId)
                        setLikeStatus('liked');
                })
            }
            else{
                alert('Failed to get likes')
            }
        })

        axios.post('/api/likes/getDislikes', likeData)
        .then(response=>{
            if(response.data.success){
                // Likes for this movie 
                setDislikes(response.data.dislikes.length);

                // Check whether i liked or not
                response.data.dislikes.map(dislike=>{
                    if(dislike.userId === props.userId)
                        setDislikeStatus('disliked');
                })
            }
            else{
                alert('Failed to get likes')
            }
        })
    }, [])

    return (
        <div>
            <Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={likeStatus === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                        />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme="outlined"
                        theme={dislikeStatus === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{dislikes}</span>
            </span>
            </Fragment>
        </div>
    )
}

export default LikeDislikes
