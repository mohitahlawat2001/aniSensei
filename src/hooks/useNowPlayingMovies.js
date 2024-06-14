
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

const dispatch = useDispatch()

    useEffect(() => {
        getNowPlaying()
    }, [])

    const getNowPlaying = async () => {
       try{
           const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
        const data = await response.json()
    console.log(data.results)
    dispatch(addNowPlayingMovies(data.results))
    }
    catch(error){
        console.log(error)
    }
    }


}

export default useNowPlayingMovies;