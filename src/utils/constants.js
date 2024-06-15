export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN
    }
  };
  
  
export const IMG_CDN = 'https://image.tmdb.org/t/p/w500/';

export const MOVIE_LIST = (type) => `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`;