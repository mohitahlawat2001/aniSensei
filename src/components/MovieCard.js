import { IMG_CDN } from '../utils/constants';
const MovieCard = (movie)=>{
    // console.log(movie);
    return(
        <div className="w-52 p-4 bg-blue-200 text-center rounded-lg shadow-lg m-4">
            <h2 className="font-bold text-xl" >{movie.movie.original_title}</h2>
            <img  className='rounded-lg p-2'
             src= {IMG_CDN + movie.movie.poster_path}
              alt={movie.movie.original_title} />
            {/* <p>{movie.movie.overview}</p> */}
            <p>Rating: {movie.movie.vote_average}</p>
            <p>Release Date: {movie.movie.release_date}</p>
        </div>
    )
}

export default MovieCard;