import React, { useEffect } from 'react'
import { API_KEY, API_URL } from '../../Config';

function MovieDetailsPage(props) {
    const movieId=props.match.params.movieId;
    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response=> response.json() )
        .then(data=>{
            console.log(data);
        })
    }, [])
    return (
        <div>
            movie details page
        </div>
    )
}

export default MovieDetailsPage
