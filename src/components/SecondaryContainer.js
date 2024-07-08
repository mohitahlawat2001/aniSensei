import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movieList = useSelector((state) => state.movies)
    if (!movieList.nowPlayingMovies || !movieList.popularMovies || !movieList.topRatedMovies || !movieList.upcomingMovies) {
        return ;
    }
    // console.log(movieList?.nowPlayingMovies);
    return (
        <div className=" bg-black ">
        <div className="mt-0 md:-mt-36 pl-4 md:pl-12 relative z-20 mr-5">
        <MovieList title="Now Playing" movieList={movieList?.nowPlayingMovies} />
        <MovieList title="Popular" movieList={movieList?.popularMovies} />
        <MovieList title="Top Rated" movieList={movieList?.topRatedMovies} />
        <MovieList title="Upcoming" movieList={movieList?.upcomingMovies} />
            </div>

        </div>
    );
    }

export default SecondaryContainer; 