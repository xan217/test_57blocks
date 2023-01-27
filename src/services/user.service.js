import { Request } from './http.service';

let requestToken = '';
let sessionID = '';
let accountID = '';

/**
 * authenticate
 * Authenticates the connection with the API
 *    
 * @returns bool
 */
async function authenticate ( ) {
  if( !id ) return {};
  try {
    let response = await Request('GET', `authentication/token/new`);  
    if( response.status === 200 && response.data.success ){  
      requestToken = response.data.request_token;
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error al autenticar al usuario: ${ err.message }`);
    return false;
  }
}

/**
 * createSession
 * Creates a session for the user (xan217 in this case) for temporary (24h) storage
 *    
 * @returns bool
 */
async function createSession ( ) {
  if( !id ) return {};
  try {
    let response = await Request(
      'POST', 
      `authentication/session/new`, 
      {
        request_token: requestToken
      });  
    if( response.status === 200 && response.data.success ){  
      sessionID = response.data.session_id;
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error al crear la sesión: ${ err.message }`);
    return false;
  }
}

/**
 * createGuestSession
 * Creates a session for a guens user (from xan217 account) for temporary (24h) storage
 *    
 * @returns bool
 */
async function createGuestSession ( ) {
  if( !id ) return {};
  try {
    let response = await Request('POST', `authentication/guest_session/new`);
    if( response.status === 200 && response.data.success ){  
      sessionID = response.data.session_id;
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error al crear la sesión de invitado: ${ err.message }`);
    return false;
  }
}


/**
 * getAccount
 * Retrieve the account details to store the account ID for the requests
 *    
 * @returns bool
 */
async function getAccount ( ) {
  if( !id ) return {};
  try {
    let response = await Request(
      'POST',
      `authentication/session/new`,
      {
        request_token: requestToken
      });  
    if( response.status === 200 && response.data.success ){  
      accountID = response.data.account_id;
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error en al obtener la cuenta: ${ err.message }`);
    return false;
  }
}

/**
 * setFavorite
 * Set a movie favorite value on the stored session on the provider
 * 
 * @param {mediaType}: movie, tv; retrieved from the film record
 * @param {mediaID}: film unique ID 
 * @param {favorite}: true or false
 *    
 * @returns bool
 */
async function setFavorite ( mediaType, mediaID, favorite ) {
  if( !id ) return {};
  try {
    let response = await Request(
      'POST',
      `account/${ accountID }/favorite`,
      {
        media_type: mediaType,
        media_id: mediaID,
        favorite
      });  
    return response.status === 201;
  } catch (err) {
    console.error(`Error al setear el estado de favorito para el film ${ id }: ${ err.message }`);
    return false;
  }
}

/**
 * getFavoriteMovies
 * Retrieve the favorite movies
 *    
 * @returns {array} movies list
 */
async function getFavoriteMovies ( ) {
  if( !id ) return {};
  try {
    let response = await Request(
      'POST',
      `account/${ accountID }/favorite/movie`,
      {
        session_id: sessionID,
        sort_by: "created_at.asc"
      });  
    if(response.status === 200) {
      return response.data.results;
    }
    return [];
  } catch (err) {
    console.error(`Error en al obtener las películas favoritas: ${ err.message }`);
    return false;
  }
}

/**
 * getFavoriteTV
 * Retrieve the favorite tv shows
 *    
 * @returns {array} tv shows list
 */
async function getFavoriteTV ( ) {
  if( !id ) return {};
  try {
    let response = await Request(
      'POST',
      `account/${ accountID }/favorite/tv`,
      {
        session_id: sessionID,
        sort_by: "created_at.asc"
      });  
    if(response.status === 200) {
      return response.data.results;
    }
    return [];
  } catch (err) {
    console.error(`Error en al obtener las series favoritas: ${ err.message }`);
    return false;
  }
}

export const UserServices = {
  authenticate,
  createSession,
  createGuestSession,
  getAccount,
  setFavorite,
  getFavoriteMovies,
  getFavoriteTV
}