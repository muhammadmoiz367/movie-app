import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'

function FavouriteButton(props) {
    const [favouriteNumber, setFavouriteNumber] = useState(0)
    const [isFavourite, setIsFavourite] = useState(false)

    const favouriteData={
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRuntime: props.movieInfo.runtime
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
            <Button onClick={handleFavouriteButton}>{isFavourite ? "Remove from favourites" : "Add to favourite"}: {favouriteNumber}</Button>
        </div>
    )
}

export default FavouriteButton
