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
            id: id
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

    const handleRemoveAll=()=>{
        axios.post('/api/favourite/removeAllFavourite')
        .then(response=>{
            if(response.data.success){
                console.log(response.data.msg);
                fetchFavouriteMovies();
            }else{
                alert('Failed to remove all favourite ')
            }
        })
    }

    useEffect(() => {
        fetchFavouriteMovies()
    }, [])

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <div style={{display: 'flex' }}>
                <h1>Movies to watch</h1>
                <Button onClick={handleRemoveAll} style={{ marginLeft: '36rem', marginTop: '.5rem'}} >Remove all</Button>
            </div>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {favouriteMovies && favouriteMovies.map((movie, index)=>{
                        const content=(
                            <Link to={movie.category === "Movie" ? `/movies/${movie.id}` : `/tv/${movie.id}`}>
                                <div>
                                {movie.image
                                ? <img src={`${IMAGE_URL}w300/${movie.image}`} alt="movieImage" />
                                : "No image"
                                }
                            </div>
                            </Link>
                        )
                        return(

                            <tr key={index}>
                                <Popover content={content} title={movie.title}>
                                    <td>{movie.title}</td>    
                                </Popover>
                                <td>{movie.category}</td>
                                <td>{movie.rating}</td>
                                <td><Button onClick={()=>handleRemoveFavourite(movie.id)}>Remove from watchlists</Button></td>
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
