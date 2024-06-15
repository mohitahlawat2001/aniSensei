
import { useEffect } from "react";
import { API_OPTIONS, MOVIE_LIST } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies ,addTopRatedMovies,addUpComingMovies } from "../utils/movieSlice";

const useMoviesList = (type) => {

const dispatch = useDispatch()

    useEffect(() => {
        getPopularMovies()
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