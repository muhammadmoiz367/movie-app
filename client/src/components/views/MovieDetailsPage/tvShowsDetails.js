import React, { Fragment, useEffect, useState } from 'react'
import {Button, Descriptions, Row, Tabs} from 'antd'
import axios from 'axios';
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import Comments from '../MovieDetailsPage/sections/comments';
import Reviews from '../MovieDetailsPage/sections/reviews';
import LikeDislikes from '../MovieDetailsPage/sections/LikeDislikes';
import GridCard from '../LandingPage/sections/gridCard';
import MainImage from '../LandingPage/sections/mainImage';
import userImage from '../MovieDetailsPage/sections/no-image.png'
import FavouriteButton from './sections/favouriteButton';

const { TabPane } = Tabs;

function TVShowsDetails(props) {
    const tvId=props.match.params.tvId;
    const [tvShow, setTvShow]=useState([])
    const [casts, setCasts]=useState([])
    const [toggleShowCast, setToggleShowCast] = useState(false)
    const [loadingCast, setLoadingCast] = useState(false)
    const [commentsList, setCommentsList] = useState([])
    const [reviewList, setReviewList] = useState([]);

    const handleToggle=()=>{
        setToggleShowCast(!toggleShowCast)
    }

    const addNewCommentToList=(newComment)=>{
        console.log(newComment);
        setCommentsList(commentsList.concat(newComment));
    }

    useEffect(() => {
        fetch(`${API_URL}tv/${tvId}?api_key=${API_KEY}&language=en-US`)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data);
            setTvShow(data)
        })
        
        fetch(`${API_URL}tv/${tvId}/credits?api_key=${API_KEY}&language=en-US`)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data);
            setLoadingCast(!loadingCast)
            setCasts(data.cast)
        })

        axios.post('/api/comments/getComments', {movieId: tvId})
        .then(response=>{
            if(response.data.success){
                setCommentsList(response.data.comments);
            }else{
                alert('Failed to get comments')
            }
        })
        .catch(err=> console.log(err.message))
        fetch(`${API_URL}tv/${tvId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                const apiReviews=data.results.map(comment=>{
                    return {
                        sender: {
                            image: userImage,
                            name: comment.author
                        },
                        body: comment.content,
                        tvShowId: data.id
                    }
                })
                setReviewList(apiReviews);  
            })

    }, [])

    return (
        <div>
            {tvShow.length !== 0
                ? <MainImage image={`${IMAGE_URL}w1280/${tvShow.backdrop_path}`} title={tvShow.original_name} text={tvShow.overview} />
                : <p>Loading...</p>
            }
            {/*Body*/}
            
            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <FavouriteButton tvShow userFrom={localStorage.getItem('userId')} tvId={tvId} tvShowInfo={tvShow} />
                </div>
                {/*tvShow info table*/}
                <Descriptions title="tvShow Info" bordered>
                    <Descriptions.Item label="Title" span={2}>{tvShow.original_name}</Descriptions.Item>
                    <Descriptions.Item label="first_release_date">{tvShow.first_air_date}</Descriptions.Item>
                    <Descriptions.Item label="seasons">{tvShow.number_of_seasons}</Descriptions.Item>
                    <Descriptions.Item label="Total episodes">{tvShow.number_of_episodes}</Descriptions.Item>
                    <Descriptions.Item label="rating" >{tvShow.vote_average} /10</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{tvShow.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{tvShow.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{tvShow.popularity}</Descriptions.Item>
                </Descriptions>
                <br/>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Button onClick={handleToggle}>Toggle tvShow cast</Button>
                </div>
                <br/>

                {/* tvShow cards*/}
                {tvShow && toggleShowCast && (
                    <Row gutter={[16, 16]}>
                    {casts && casts.map((cast, index)=>(
                        <Fragment key={index}>
                            {cast.profile_path && <GridCard actor image={`${IMAGE_URL}w500/${cast.profile_path}`} name={cast.name} character={cast.character} /> }
                        </Fragment>
                    ))}
                </Row>
                )}
                <br/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie movieId={tvId} userId={localStorage.getItem('userId')} />
                </div>
                <br />

                <Tabs type="card">
                    <TabPane tab="Reviews" key="1">
                        <Reviews reviews={reviewList} movieId={tvId} />
                    </TabPane>
                    <TabPane tab="Comments" key="2">
                        <Comments comments={commentsList} updateComentsList={addNewCommentToList} movieId={tvId} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default TVShowsDetails
