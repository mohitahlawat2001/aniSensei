
import { useEffect } from "react";
import { API_OPTIONS, MOVIE_LIST } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch()
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies)


    useEffect(() => {
        !nowPlayingMovies &&
            getNowPlaying()
    }, [])

    const getNowPlaying = async () => {
        try {
            const response = await fetch(MOVIE_LIST('now_playing'), API_OPTIONS);
            const data = await response.json()
            // console.log(data.results)
            dispatch(addNowPlayingMovies(data.results))
        }
        catch (error) {
            console.log(error)
        }
    }


}

export default useNowPlayingMovies;