/**
 * Request.
 * All request should pass over this method. This will add the authentication token in the headers
 * and prepend the endpoint of the service.
 * 
 * @param {string} method GET/POST/PUSH/PUT/UPDATE/DELETE.
 * @param {string} endpoint api endpoint.
 * @param {object} [data = {}] if method is GET it will be part of the querystring.
 * @param {string} [type = null] content type if it must be different from application/json.
 * 
 * @returns {object} serverResponse or json object. Depends of parsed.
 */
export const Request = async ( method, endpoint = '', data = {}, type = null) => {

    if(endpoint === '') {
        return null;
    }

    const API = 'https://api.themoviedb.org/3/';
    const api_key = '8f809a5ff3cb44477fdf4548a69bce9d';
    endpoint += endpoint.indexOf('?') > -1 ? '&' : '?';
    endpoint += 'api_key='+api_key;

    let options = {
      method,
      headers: {
        'Content-Type': !type ? 'application/json' : type,
      },
    }
    if(method !== 'GET' && method !== 'HEAD'){
      options['body'] = JSON.stringify(data)
    } 
    else {
      for (const [key, value] of Object.entries(data)) {
        endpoint += `&${ key }=${ value }`;
      }
    }
  
    const response = await fetch(API + endpoint, options);
  
    return response;
};
