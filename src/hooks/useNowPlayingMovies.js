
import { useEffect } from "react";
import { API_OPTIONS, MOVIE_LIST } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

const dispatch = useDispatch()

    useEffect(() => {
        getNowPlaying()
    }, [])

    const getNowPlaying = async () => {
       try{
           const response = await fetch( MOVIE_LIST('now_playing') , API_OPTIONS);
        const data = await response.json()
    // console.log(data.results)
    dispatch(addNowPlayingMovies(data.results))
    }
    catch(error){
        console.log(error)
    }
    }


}

export default useNowPlayingMovies;