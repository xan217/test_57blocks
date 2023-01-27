import { Request } from './http.service';

/**
 * getTrendingMovies
 * Retrieve the trending Movies for the day
 *    
 * @returns object
 */
async function getTrendingMovies ( ) {
  try {
    let response = await Request('GET', 'trending/movie/day');  
    if( response.status === 200 ){  
      response = await response.json();
      return response.results;
    }
    return {};
  } catch (err) {
    console.error(`Error en al obtener la lista de tendencias de Películas: ${ err.message }`);
    return {};
  }
}

/**
 * getTrendingTV
 * Retreive the trending TV shows for the day
 *    
 * @returns object
 */
async function getTrendingTV ( ) {
  try {
    let response = await Request('GET', 'trending/tv/day');  
    if( response.status === 200 ){  
      response = await response.json();
      return response.results;
    }
    return {};
  } catch (err) {
    console.error(`Error en al obtener la lista de tendencias de Series: ${ err.message }`);
    return {};
  }
}

/**
 * getMovieDetails
 * Get the movie details from a given ID
 * 
 * @param {number}: movie ID
 *    
 * @returns object
 */
async function getMovieDetails ( id = null ) {
  if( !id ) return {};
  try {
    let response = await Request('GET', `movie/${ id }`);  
    if( response.status === 200 ){  
      response = await response.json();
      return response;
    }
    return {};
  } catch (err) {
    console.error(`Error en al obtener los detalles de la Película ${ id }: ${ err.message }`);
    return {};
  }
}


export const MoviesServices = {
  getTrendingMovies,
  getTrendingTV,
  getMovieDetails
}