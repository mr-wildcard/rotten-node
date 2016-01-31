import qs from 'querystring';
import http from 'superagent';

export const buildEndpoint = (baseUrl, key) => (path, params = {}) => `${baseUrl}/${path}?${qs.stringify({ ...params, apikey: key })}`;

export const APICall = (endpoint, cb = null) => {

  var req = http.get(endpoint);

  if (!cb) {
    return new Promise((resolve, reject) => {

      req.end((error, { text }) => {

        if (error) {
          reject(error);
        }
        else {

          const { parsingError, parsedResponse } = parseResponse(text);

          if (parsingError) {
            reject(parsingError);
          }
          else {
            resolve(parsedResponse);
          }
        }
      });
    });
  }
  else {
    return req.end((error, { text }) => {

      if (error) {
        cb(error);
      }
      else {
        const { parsingError, parsedResponse } = parseResponse(text);

        cb(parsingError, parsedResponse);
      }
    });
  }
};

export const parseResponse = (text) => {

  let parsingError = null;
  let parsedResponse = null;

  try {
    parsedResponse = JSON.parse(text);
  }
  catch(e) {
    error = e;
  }

  return { parsingError, parsedResponse };
}
