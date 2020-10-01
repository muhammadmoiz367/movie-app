import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'

function FavouriteButton(props) {
    const [favouriteNumber, setFavouriteNumber] = useState(0)
    const [isFavourite, setIsFavourite] = useState(false)

    const favouriteData={
        userFrom: props.userFrom,
        id: props.tvShow ? props.tvId : props.movieId,
        title: props.tvShow ? props.tvShowInfo.original_name : props.movieInfo.original_title,
        image: props.tvShow ? props.tvShowInfo.backdrop_path : props.movieInfo.backdrop_path,
        rating: props.tvShow ? props.tvShowInfo.vote_average : props.movieInfo.vote_average,
        category: props.tvShow ? 'TV Show' : 'Movie'
    }

    const handleFavouriteButton=()=>{
        if(isFavourite){
            axios.post('/api/favourite/removeFavourite', favouriteData)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.msg);
                    setFavouriteNumber(favouriteNumber-1)
                    setIsFavourite(!isFavourite)
                }else{
                    alert('Failed to remove from favourite ')
                }
            })
        }else{
            axios.post('/api/favourite/addFavourite', favouriteData)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.msg);
                    setFavouriteNumber(favouriteNumber+1)
                    setIsFavourite(!isFavourite)
                }else{
                    alert('Failed to add to favourite ')
                }
            })
        }
    }

    useEffect(() => {

        axios.post('/api/favourite/getFavouriteNumber', favouriteData)
        .then(response=>{
            if(response.data.success){
                setFavouriteNumber(response.data.favouriteNumber)
            }else{
                alert('Failed to get favourite number')
            }
        })

        axios.post('/api/favourite/checkFavourite', favouriteData)
        .then(response=>{
            if(response.data.success){
                setIsFavourite(response.data.favourite)
            }else{
                alert('Failed to check favourite ')
            }
        })

    }, [])
    return (
        <div>
            <Button onClick={handleFavouriteButton}>{isFavourite ? "Remove from watchlist" : "Add to watchlist"}: {favouriteNumber}</Button>
        </div>
    )
}

export default FavouriteButton
