import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useMoviesList from "../hooks/useMovieList";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {

    useNowPlayingMovies();
    useMoviesList('popular');
    useMoviesList('top_rated');
    useMoviesList('upcoming');
    return (
        <div className="bg-black ">
            <Header/>
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    )
}

export default Browse;