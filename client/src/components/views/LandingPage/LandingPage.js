import React, { Fragment, useEffect, useState } from 'react'
import {Typography, Row} from 'antd'
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import MainImage from './sections/mainImage';
import GridCard from './sections/gridCard';

const {Title}=Typography;

function LandingPage() {
    const [movies, setMovies] = useState([])
    let [page, setPage]=useState(0)

    const fetchMovies=(path)=>{
        fetch(path)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data)
            console.log(data.results)
            setMovies([...movies, ...data.results])
            //setMovies(movies.concat(data.results))
            setPage(data.page)
        })
    }
    const handleLoadMoreMovies=()=>{
        const path=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page+1}`
        fetchMovies(path)
    }

    useEffect(() => {
        const endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endPoint)
    }, [])


    return (
        <>
            <div style={{ width: '100%', margin: 0}}>
                {movies[0] && 
                    <MainImage image={`${IMAGE_URL}w1280/${movies[0].backdrop_path}`} title={movies[0].original_title} text={movies[0].overview} />
                }
                {/*Body*/}
                <div style={{width: '85%', margin: '1rem auto'}}>
                    <Title level={2}>Latest movies</Title>
                    <hr/>
                    {/* Movie cards*/}
                    <Row gutter={[16, 16]}>
                        {movies && movies.map((movie, index)=>(
                            <Fragment key={index}>
                                <GridCard image={`${IMAGE_URL}w500/${movie.poster_path}`} movieId={movie.id}/>
                            </Fragment>
                        ))}
                    </Row>
                    <br/>
                    {/*Load more button*/}
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <button onClick={handleLoadMoreMovies}>Load more</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
