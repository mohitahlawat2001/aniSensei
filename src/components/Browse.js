import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useMoviesList from "../hooks/useMovieList";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import AniSensei from "./AniSensei";

import { useSelector } from "react-redux";

const Browse = () => {
    const searchView = useSelector((state) => state.aniSensei.searchView);
    useNowPlayingMovies();
    useMoviesList('popular');
    useMoviesList('top_rated');
    useMoviesList('upcoming');
    return (
        <div >
            <Header/>
            {searchView==='AniSensei' ? <AniSensei/>:
            <>
            <MainContainer/>
            <SecondaryContainer/>
              </>
}
        </div>
    )
}

export default Browse;