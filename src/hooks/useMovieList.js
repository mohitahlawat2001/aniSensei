
import { useEffect } from "react";
import { API_OPTIONS, MOVIE_LIST } from "../utils/constants";
import { useDispatch , useSelector } from "react-redux";
import { addPopularMovies ,addTopRatedMovies,addUpComingMovies } from "../utils/movieSlice";

const useMoviesList = (type) => {

    const movies = useSelector((state) => state.movies)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(type === 'popular' && movies.popularMovies){
            return; 
        } else if(type === 'top_rated' && movies.topRatedMovies){
            return;
        } else if(type === 'upcoming' && movies.upComingMovies){
            return;
        }
        getPopularMovies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getPopularMovies = async () => {
       try{
           const response = await fetch( MOVIE_LIST(type) , API_OPTIONS)
        const data = await response.json()
        if(type === 'popular'){
            dispatch(addPopularMovies(data.results))
        } else if(type === 'top_rated'){
            dispatch(addTopRatedMovies(data.results))
        } else if(type === 'upcoming'){
            dispatch(addUpComingMovies(data.results))
        }
        
    }
    catch(error){
        console.log(error)
    }
    }


}

export default useMoviesList;