import React from 'react';
import MovieCard from "./MovieCard";

const MovieList = ({ title, movieList }) => {
    return (<div className="px-6">
        <h1 className="text-lg  md:text-3xl w-full py-4 text-white ">
            {title}</h1>
        <div className="flex overflow-x-scroll  hide-scrollbar text-black ">
            <div className="flex">
                {movieList.map((movie) =>
                    <MovieCard key={movie.id} movie={movie} />
                )}
            </div>
        </div>
    </div>
    )
}

export default MovieList;