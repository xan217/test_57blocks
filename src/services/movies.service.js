import { Request } from './http.service';

/**
 * getTrendingMovies
 * Retrieve the trending Movies for the day
 *    
 * @returns object
 */
async function getTrendingMovies ( page = 1 ) {
  try {
    let response = await Request('GET', `trending/movie/day?page=${ page }`);  
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
async function getTrendingTV ( page = 1 ) {
  try {
    let response = await Request('GET', `trending/tv/day?page=${ page }`);  
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
async function getMovieDetails ( filmId ) {
  if( !filmId ) return {};
  try {
    let response = await Request('GET', `movie/${ filmId }`);  
    if( response.status === 200 ){  
      response = await response.json();
      return response;
    }
    else {
      let response = await Request('GET', `tv/${ filmId }`);  
      if( response.status === 200 ){  
        response = await response.json();
        return response;
      }
    }
    
    return {};
  } catch (err) {
    console.error(`Error en al obtener los detalles de la Película ${ filmId }: ${ err.message }`);
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
async function getCredits ( filmId ) {
  if( !filmId ) return {};
  try {
    let response = await Request('GET', `movie/${ filmId }/credits`);  
    if( response.status === 200 ){  
      response = await response.json();
      return response;
    }
    else {
      let response = await Request('GET', `tv/${ filmId }/credits`);  
      if( response.status === 200 ){  
        response = await response.json();
        return response;
      }
    }
    return {};
  } catch (err) {
    console.error(`Error en al obtener los detalles de la Película ${ filmId }: ${ err.message }`);
    return {};
  }
}


export const MoviesServices = {
  getTrendingMovies,
  getTrendingTV,
  getMovieDetails,
  getCredits
}