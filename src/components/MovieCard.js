import { IMG_CDN } from '../utils/constants';
import { Link } from 'react-router-dom';
const MovieCard = (movie)=>{
    // console.log(movie);

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
        </div>
    )
}

export default MovieCard;