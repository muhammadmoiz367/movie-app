import React, { Fragment, useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/sections/mainImage';
import {Button, Descriptions, Row} from 'antd'
import GridCard from '../LandingPage/sections/gridCard';
import FavouriteButton from './sections/favouriteButton';

function MovieDetailsPage(props) {
    const movieId=props.match.params.movieId;
    const [movie, setMovie]=useState([])
    const [casts, setCasts]=useState([])
    const [toggleShowCast, setToggleShowCast] = useState(false)

    const handleToggle=()=>{
        setToggleShowCast(!toggleShowCast)
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
                setCasts(data.cast)
            })
    }, [])
    return (
        <div>
            {movie && 
                <MainImage image={`${IMAGE_URL}w1280/${movie.backdrop_path}`} title={movie.original_title} text={movie.overview} />
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
            </div>
        </div>
    )
}

export default MovieDetailsPage
