import React, { Fragment, useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/sections/mainImage';
import {Button, Descriptions, Row} from 'antd'
import GridCard from '../LandingPage/sections/gridCard';
import FavouriteButton from './sections/favouriteButton';
import Comments from './sections/comments';
import axios from 'axios';
import LikeDislikes from './sections/LikeDislikes';

function MovieDetailsPage(props) {
    const movieId=props.match.params.movieId;
    const [movie, setMovie]=useState([])
    const [casts, setCasts]=useState([])
    const [toggleShowCast, setToggleShowCast] = useState(false)
    const [loadingCast, setLoadingCast] = useState(false)
    const [commentsList, setCommentsList] = useState([])

    const handleToggle=()=>{
        setToggleShowCast(!toggleShowCast)
    }

    const addNewCommentToList=(newComment)=>{
        console.log(newComment);
        setCommentsList(commentsList.concat(newComment));
    }

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data);
            setMovie(data)
        })
        
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data);
            setLoadingCast(!loadingCast)
            setCasts(data.cast)
        })
        
        axios.post('/api/comments/getComments', {movieId: movieId})
        .then(response=>{
            if(response.data.success){
                console.log(response.data.comments);
                setCommentsList(response.data.comments);
            }else{
                alert('Failed to get comments')
            }
        })
        .catch(err=> console.log(err.message))

    }, [])
    return (
        <div>
            {movie 
                ? <MainImage image={`${IMAGE_URL}w1280/${movie.backdrop_path}`} title={movie.original_title} text={movie.overview} />
                : <p>Loading...</p>
            }
            {/*Body*/}
            
            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <FavouriteButton userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={movie} />
                </div>
                {/*Movie info table*/}
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>{movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
                </Descriptions>
                <br/>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Button onClick={handleToggle}>Toggle movie cast</Button>
                </div>
                <br/>

                {/* Movie cards*/}
                {toggleShowCast && (
                    <Row gutter={[16, 16]}>
                    {casts && casts.map((cast, index)=>(
                        <Fragment key={index}>
                            {cast.profile_path && <GridCard actor image={`${IMAGE_URL}w500/${cast.profile_path}`} /> }
                        </Fragment>
                    ))}
                </Row>
                )}
                <br/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>
                <br />

                <Comments comments={commentsList} updateComentsList={addNewCommentToList} movieId={movieId} />
            </div>
        </div>
    )
}

export default MovieDetailsPage
