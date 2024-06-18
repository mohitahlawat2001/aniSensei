import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
const useMovieTrailer = (movie_id) => {
  const trailerVideo = useSelector((state) => state.movies.trailerVideo);
    const dispatch = useDispatch();
    const movieVideo = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        // console.log(data);
        const trailer = data.results.filter((video) => video.type === "Trailer");
        const latestTrailer = trailer.length > 0 ? trailer[0] : data.results[0];
        // console.log(latestTrailer);
        dispatch(addTrailerVideo(latestTrailer));
      };
    
      useEffect(() => {
        !trailerVideo &&
        movieVideo();
      }, []);
}

export default useMovieTrailer;