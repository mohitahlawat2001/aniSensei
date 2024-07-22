import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movieList = useSelector((state) => state.movies)
    const tvList = useSelector((state) => state.tv)
    if (!movieList.nowPlayingMovies || !movieList.popularMovies || !movieList.topRatedMovies || !movieList.upcomingMovies || !tvList.popularTv || !tvList.topRatedTv || !tvList.airingTodayTv || !tvList.onTheAirTv) {
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
        <MovieList title="Popular TV Shows" movieList={tvList?.popularTv} />
        <MovieList title="Top Rated TV Shows" movieList={tvList?.topRatedTv} />
        <MovieList title="Airing Today TV Shows" movieList={tvList?.airingTodayTv} />
        <MovieList title="On The Air TV Shows" movieList={tvList?.onTheAirTv} />
        </div>

        </div>
    );
    }

export default SecondaryContainer; 