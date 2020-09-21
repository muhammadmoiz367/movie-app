import React, { useEffect, useState, Fragment } from 'react'
import { Row } from 'antd';
import Title from 'antd/lib/skeleton/Title';
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import GridCard from '../LandingPage/sections/gridCard';

function SearchMovie(props) {
    const [movies, setMovies] = useState([])
    const query=props.match.params.search;

    useEffect(() => {
        fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then(response=> response.json() )
        .then(data=>{
            setMovies(data.results)
        })
    }, [query])

    return (
        <div>
            <>
            <div style={{ width: '100%', margin: 0}}>
                {/*Body*/}
                <div style={{width: '85%', margin: '1rem auto'}}>
                    <Title level={2}>Your searched movies</Title>
                    <hr/>
                    {/* Movie cards*/}
                    <Row gutter={[16, 16]}>
                        {movies.length>0
                        ? movies.map((movie, index)=>(
                            (movie.poster_path && 
                                <Fragment key={index}>
                                    <GridCard image={`${IMAGE_URL}w500/${movie.poster_path}`} movieId={movie.id}/>
                                </Fragment>
                            )
                        ))
                        : <p>No movies found</p>
                    }
                    </Row>
                </div>
            </div>
        </>
        </div>
    )
}

export default SearchMovie
