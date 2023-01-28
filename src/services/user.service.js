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
  try {
    let response = await Request('GET', `authentication/token/new`);  
    if( response.status === 200 ){  
      response = await response.json();
      requestToken = response.request_token;
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error al autenticar al usuario: ${ err.message }`);
    return false;
  }
}

async function authorizeToken ( ) {
  try {
    await window.open(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:8080/approved`);
  } catch (err) {
    console.error(`Error al autenticar al autorizar el token: ${ err.message }`);
  }
}



/**
 * createSession
 * Creates a session for the user (xan217 in this case) for temporary (24h) storage
 *    
 * @returns bool
 */
async function createSession ( ) {
  try {
    let response = await Request(
      'POST', 
      `authentication/session/new`, 
      {
        request_token: requestToken
      });  
    if( response.status === 200 ){  
      response = await response.json();
      sessionID = response.session_id;
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
  try {
    let response = await Request('GET', `authentication/guest_session/new`);
    if( response.status === 200 ){  
      response = await response.json();
      sessionID = response.guest_session_id;
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
  try {
    let response = await Request(
      'GET',
      `account`,
      {
        session_id: sessionID || localStorage.getItem('sessionID')
      });
    if( response.status === 200 ){
      response = await response.json();
      accountID = response.id;
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
  console.log(mediaType, mediaID, favorite);
  if( !mediaType || !mediaID ) return false;
  try {
    let response = await Request(
      'POST',
      `account/${ accountID || localStorage.getItem('accountID') }/favorite?session_id=${ sessionID || localStorage.getItem('sessionID') }`,
      {
        media_type: mediaType,
        media_id: mediaID,
        favorite
      });
    response = await response.json();
    return response.success;
  } catch (err) {
    console.error(`Error al setear el estado de favorito para el film ${ mediaID }: ${ err.message }`);
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
  try {
    let response = await Request(
      'GET',
      `account/${ accountID || localStorage.getItem('accountID') }/favorite/movies`,
      {
        session_id: sessionID || localStorage.getItem('sessionID'),
        sort_by: "created_at.asc"
      });  
    if(response.status === 200) {
      response = await response.json();
      return response.results;
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
  try {
    let response = await Request(
      'GET',
      `account/${ accountID || localStorage.getItem('accountID') }/favorite/tv`,
      {
        session_id: sessionID || localStorage.getItem('sessionID'),
        sort_by: "created_at.asc"
      });  
    if(response.status === 200) {
      response = await response.json();
      return response.results;
    }
    return [];
  } catch (err) {
    console.error(`Error en al obtener las series favoritas: ${ err.message }`);
    return false;
  }
}

async function setUser( requestTokenParam ) {

  requestToken = requestTokenParam;

  await createSession();
  await getAccount();

  localStorage.setItem('requestToken', requestToken);
  localStorage.setItem('sessionID', sessionID);
  localStorage.setItem('accountID', accountID);

  return !!requestToken && !!sessionID && !!accountID;
}

export const UserServices = {
  authenticate,
  authorizeToken,
  createSession,
  createGuestSession,
  getAccount,
  setFavorite,
  getFavoriteMovies,
  getFavoriteTV,
  setUser
}