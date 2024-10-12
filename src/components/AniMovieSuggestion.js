import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const AniMovieSuggestion = () => {

    const { resultMovie, resultName } = useSelector((state) => state.aniSensei);

    if (!resultName || !resultMovie) {
        return;
    }

    return (
        <div className='p-4 m-4 bg-black text-white opacity-90 '>
            {
                resultName.map((name, index) =>
                    <MovieList key={name} title={name} movieList={resultMovie[index]} />
                )
            }
        </div>
    );
}

export default AniMovieSuggestion;