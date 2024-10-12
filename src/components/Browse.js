import React from "react";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useMoviesList from "../hooks/useMovieList";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import AniSensei from "./AniSensei";

import { useSelector } from "react-redux";
import useTvList from "../hooks/useTvList";

const Browse = () => {
    const searchView = useSelector((state) => state.aniSensei.searchView);
    useNowPlayingMovies();
    useMoviesList('popular');
    useMoviesList('top_rated');
    useMoviesList('upcoming');
    useTvList('popular');
    useTvList('top_rated');
    useTvList('airing_today');
    useTvList('on_the_air');
    return (
        <div >
            <Header />
            {searchView === 'AniSensei' ? <AniSensei /> :
                <div className="bg-black w-screen h-screen ">
                    <MainContainer />
                    <SecondaryContainer />
                </div>
            }
        </div>
    )
}

export default Browse;