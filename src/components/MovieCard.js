import { IMG_CDN } from '../utils/constants';
import { Link } from 'react-router-dom';
import { database } from '../utils/firebase';
import {set,ref, remove, get} from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { addStarredMovie, removeStarredMovies } from '../utils/starredSlice';
import { addMovieToWatchlist } from '../utils/watchlistsSlice';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MovieCard = (movie)=>{
    // console.log(movie);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const starredMovies = useSelector((state)=>state.starred.starredMovies);
    const { watchlists, customWatchlists } = useSelector((state) => state.watchlists);
    const [showWatchlistDropdown, setShowWatchlistDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const allWatchlists = { ...watchlists, ...customWatchlists };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowWatchlistDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleAddToWatchlist = async (watchlistId) => {
        if (!user?.uid) return;

        const movieData = {
            id: movie.movie.id,
            title: movie.movie.original_title || movie.movie.title || 'Unknown Title',
            poster_path: movie.movie.poster_path || '',
            vote_average: movie.movie.vote_average || 0,
            release_date: movie.movie.release_date || 'Unknown Date'
        };

        dispatch(addMovieToWatchlist({ watchlistId, movie: movieData }));

        // Save to Firebase
        try {
            const dbRef = ref(database, `watchlists/${user.uid}/${watchlistId in watchlists ? 'watchlists' : 'customWatchlists'}/${watchlistId}/movies/${movie.movie.id}`);
            await set(dbRef, movieData);
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
        }

        setShowWatchlistDropdown(false);
    };

    const handleStar = async ()=>{
        if(user){
            console.log('User is signed in');
            const dbRef = ref(database,'users/'+user?.uid+'/'+movie?.movie?.id);
            const movieData = {
                id: movie.movie.id,
                title: movie.movie.original_title || 'Unknown Title', // Provide a fallback value for title
                poster_path: movie.movie.poster_path || '', // Provide a fallback value or handle undefined
                vote_average: movie.movie.vote_average || 0, // Provide a fallback value or handle undefined
                release_date: movie.movie.release_date || 'Unknown Date' // Provide a fallback value for release_date
            };
            const isMovieStarred = await get(ref(database, 'users/' + user?.uid + '/' + movie?.movie?.id)).then((snapshot) => snapshot.exists());
            
            // ref(database,'users/'+user?.uid+'/'+movie?.movie?.id).once('value').then((snapshot)=>snapshot.exists());


            if(isMovieStarred){
                dispatch(removeStarredMovies(movie?.movie.id));
                remove(dbRef).then(()=>{
                    console.log(starredMovies);
                    console.log('Data removed successfully');
                }).catch((error)=>{
                    console.error('Error removing data:', error);
                });

            }else
            {

                set(dbRef,movieData).then(()=>{
                    dispatch(addStarredMovie(
                        movieData
                    ));
                    console.log(starredMovies);
                    console.log('Data written successfully');
                }).catch((error)=>{
                    console.error('Error writing data:', error);
                });
            }

        }else{
            console.log('User is not signed in');
        }
    }

    if(!movie.movie.poster_path){
        return null;
    }

    return(
        <div className="w-36  md:w-52 p-4 bg-blue-200 text-center rounded-lg shadow-lg m-4">
            <h2 className="font-bold text-xl" >{movie.movie.original_title}</h2>
            <Link to={`/movie/${movie.movie.id}`}>
            <img  className='rounded-lg p-2'
             src= {IMG_CDN + movie.movie.poster_path}
              alt={movie.movie.original_title} />
            </Link>
            {/* <p>{movie.movie.overview}</p> */}
            <p>Rating: {movie.movie.vote_average}</p>
            <p>Release Date: {movie.movie.release_date}</p>
            
            <div className="flex justify-center items-center gap-2 mt-2">
                {/* golden star button */}
                <button onClick={handleStar} className="text-yellow-400 text-xl">⭐</button>
                
                {/* Add to watchlist dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setShowWatchlistDropdown(!showWatchlistDropdown)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                        title="Add to watchlist"
                    >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                    </button>
                    
                    {showWatchlistDropdown && (
                        <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-48">
                            <div className="py-1">
                                {Object.values(allWatchlists).map((watchlist) => (
                                    <button
                                        key={watchlist.id}
                                        onClick={() => handleAddToWatchlist(watchlist.id)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {watchlist.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default MovieCard;