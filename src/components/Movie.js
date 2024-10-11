import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { IMG_CDN } from "../utils/constants";
import Header from "./Header";
import { useDispatch , useSelector} from "react-redux";
import { toggleSearchView } from "../utils/aniSenseiSlice";
import MovieList from "./MovieList";
import HomePageWallpaper from "../assets/wall4.png";
import { MovieShimmer } from "./Shimmer";
import { langConvert } from "../utils/constants";


const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const dispatch = useDispatch();
    const langCode = useSelector((state) => state.config.lang);

    

    useEffect(() => {
        dispatch(toggleSearchView('Movie'));
        getMovieDetails();
        getMovieRecommendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, langCode]);

    const getMovieRecommendations = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=${langConvert[langCode]}&page=1`, API_OPTIONS);
            const data = await response.json();
            // console.log(data.results)
            setRecommendations(data.results);
        }
        catch (error) {
            console.log(error);
        }
    }


    const getMovieDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=${langConvert[langCode]}`, API_OPTIONS);
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    
    
    
    return (
        <>
        <Header />
        <img
          src={HomePageWallpaper}
          alt="background"
          className="w-screen h-screen object-cover fixed -z-10"
        />
        { loading ? <MovieShimmer /> :  
        <div className="container mx-auto px-4  pt-[30%] md:pt-[6%] ">
            <div className=" shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <img 
                        className="md:w-1/3 w-full h-auto object-cover rounded-lg " 
                        src={`${IMG_CDN}${movie.poster_path}`} 
                        alt={movie.original_title} 
                    />
                    <div className="px-4 md:w-2/3">
                        <div className="bg-blue-300 p-4 text-white rounded-lg">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-700 mb-4">{movie.overview}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="bg-blue-500 text-white text-sm font-medium py-1 px-2 rounded">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-500">Release Date: {movie.release_date}</p>
                        <p className="text-gray-500">Runtime: {movie.runtime} minutes</p>
                        <p className="text-gray-500">Vote Average: {movie.vote_average} ({movie.vote_count} votes)</p>
                        <a 
                            href={movie.homepage} 
                            className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Official Website
                        </a>
                        </div>
                        <div className="bg-blue-300 px-4 text-white rounded-lg my-2">

                        <MovieList title="Upcoming" movieList={recommendations} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
}
        </>
    );
    };

export default Movie;