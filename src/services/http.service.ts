const Services = {
  install (Vue) {
      //Vue.api_route = "http://localhost/socialgrafo_v2/web/index.php?r=api/";
      Vue.api_route = "https://api.themoviedb.org/3/";
      Vue.fetchData = async function(method = 'GET', endpoint = '', data = {}) {
          if( endpoint == null ) return null;
          // Opciones por defecto estan marcadas con un *
          let options = {
              method: method, // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer: << API_KEY >>'
              },
              body: data,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          }
          if(method != 'GET' && method != 'HEAD'){
              options.body = JSON.stringify(data)
          }
          else {
            delete options.body;
          }

          const response = await fetch(Vue.api_route + endpoint, options);

          return response.json(); // parses JSON response into native JavaScript objects
      }
  }
};

export default Services;