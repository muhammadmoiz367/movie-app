import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../../Config';
import MoviesComponent from './sections/MoviesComponent';
import TVShowsComponent from './sections/TVShowsComponent';



function LandingPage(props) {
    const queryString=props.location.search ? props.location.search.split("&") : ""
    const categoryQuery=queryString[0] ? queryString[0].split("=")[1].replace("%20", " ") : "";
    let genreQuery=queryString[1] ? queryString[1].split("=")[1] : "";
    const languageQuery=queryString[2] ? queryString[2].split("=")[1] : "";
    console.log(categoryQuery, genreQuery, languageQuery)
    const [movies, setMovies] = useState([])
    const [TVShows, setTVShows]=useState([])
    let [moviePage, setMoviePage]=useState(0)
    let [tvShowPage, setTvShowPage]=useState(0)

    const fetchMovies=(path)=>{
        fetch(path)
        .then(response=> response.json() )
        .then(data=>{
            switch(categoryQuery){
                case 'TV Shows':
                    setTVShows(data.results);
                    setTvShowPage(data.page);
                    break;
                case 'Movies':
                    setMovies(data.results)
                    setMoviePage(data.page)    
                    break;
                default:
                    setMovies(data.results)
                    setMoviePage(data.page) 
            }
            console.log(data.results)
            //setMovies(movies.concat(data.results))
        })
    }
    const handleLoadNext=()=>{
        let path;
        console.log('clicked')
        switch(categoryQuery){
            case 'TV Shows':
                path=`${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${tvShowPage+1}`
                break;
            case 'Movies':
                path=`${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${moviePage+1}`
                break;
            default:
                path=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${moviePage+1}`
        }
        fetchMovies(path)
    }

    const handleLoadPrevious=()=>{
        let path;
        console.log('clicked')
        switch(categoryQuery){
            case 'TV Shows':
                path=`${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${tvShowPage-1}`
                break;
            case 'Movies':
                path=`${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${moviePage-1}`
                break;
            default:
                path=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${moviePage-1}`
        }
        fetchMovies(path)
    }

    useEffect(() => {
        let endPoint;
        switch(categoryQuery){
            case 'TV Shows' :
                endPoint=`${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
                setMovies([])
                break;
            case 'Movies' :
                endPoint=genreQuery==="all" ? `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=${languageQuery}` : `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreQuery}&with_original_language=${languageQuery}`;
                setTVShows([])
                break;
            default:
                endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        }
        console.log(endPoint)
        fetchMovies(endPoint)
    }, [categoryQuery, languageQuery, genreQuery])

    return (
        <>
            {TVShows[0] && <TVShowsComponent result={TVShows} resultName="TV Shows" loadPrevious={handleLoadPrevious} loadNext={handleLoadNext} page={tvShowPage} /> }
            {movies[0] && <MoviesComponent result={movies} resultName="Movies" loadPrevious={handleLoadPrevious} loadNext={handleLoadNext} page={moviePage} /> }
        </>
    )
}

export default LandingPage
