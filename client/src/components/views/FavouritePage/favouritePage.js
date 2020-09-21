import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Popover } from 'antd';
import { IMAGE_URL } from '../../Config';
import { Link } from 'react-router-dom';

function FavouritePage() {
    const [favouriteMovies, setFavouriteMovies] = useState([])

    const data={ userFrom: localStorage.getItem('userId') };

    const fetchFavouriteMovies=()=>{
        axios.post('/api/favourite/getFavouriteMovies', data)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.favourites)
                setFavouriteMovies(response.data.favourites)
            }
            else{
                alert('Failed to get favourite movies');
            }
        })
    }

    const handleRemoveFavourite=(id)=>{
        const favouriteData={
            userFrom: localStorage.getItem('userId'),
            movieId: id
        }
        axios.post('/api/favourite/removeFavourite', favouriteData)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.msg);
                    fetchFavouriteMovies();
                }else{
                    alert('Failed to remove from favourite ')
                }
            })
    }

    useEffect(() => {
        fetchFavouriteMovies()
    }, [])

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>Favourite movies</h1>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie title</th>
                        <th>Movie runtime</th>
                        <th>Remove from favourites</th>
                    </tr>
                </thead>
                <tbody>
                    {favouriteMovies && favouriteMovies.map((movie, index)=>{
                        const content=(
                            <Link to={`/movies/${movie.movieId}`}>
                                <div>
                                {movie.movieImage
                                ? <img src={`${IMAGE_URL}w300/${movie.movieImage}`} alt="movieImage" />
                                : "No image"
                                }
                            </div>
                            </Link>
                        )
                        return(

                            <tr key={index}>
                                <Popover content={content} title={movie.movieTitle}>
                                    <td>{movie.movieTitle}</td>    
                                </Popover>
                                <td>{movie.movieRuntime}</td>
                                <td><Button onClick={()=>handleRemoveFavourite(movie.movieId)}>Remove from favourites</Button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default FavouritePage
