const encodeJSON = params => Object.keys(params)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  .join('&');

export const config = (json, method = 'POST') => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  if ( method !== 'GET' && method !== 'HEAD' ) {
    opts['body'] = encodeJSON(json)
  }

  return opts
};

function send({ method, path, data, isAuth }, fetcha) {
  if(!fetcha) fetcha = window.fetch;
  const opts = config(data, method);

  if ( isAuth ) {
    opts.headers['credentials'] = 'include'
  }

  return fetcha(path, opts)
}

export function get(path, fetcha, isAuth) {
  return send({ method: 'GET', path, isAuth }, fetcha);
}

export function del(path, fetcha, isAuth) {
  return send({ method: 'DELETE', path, isAuth }, fetcha);
}

export function post(path, data, fetcha, isAuth) {
  return send({ method: 'POST', path, data, isAuth }, fetcha);
}

export function put(path, data, fetcha, isAuth) {
  return send({ method: 'PUT', path, data, isAuth }, fetcha);
}
