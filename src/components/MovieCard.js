import { IMG_CDN } from '../utils/constants';
import { Link } from 'react-router-dom';
import { database } from '../utils/firebase';
import {set,ref, remove, get} from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { addStarredMovies, removeStarredMovies } from '../utils/starredSlice';

const MovieCard = (movie)=>{
    // console.log(movie);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    // const starredMovies = useSelector((state)=>state.starred.starredMovies);
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
                // dispatch(removeStarredMovies(movie?.movie.id));
                remove(dbRef).then(()=>{
                    console.log('Data removed successfully');
                }).catch((error)=>{
                    console.error('Error removing data:', error);
                });

            }else
            {

                set(dbRef,movieData).then(()=>{
                    dispatch(addStarredMovies(
                        movieData
                    ));
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
            {/* golden star button */}
            <button onClick={handleStar} className="text-yellow-400">⭐</button>

        </div>
    )
}

export default MovieCard;