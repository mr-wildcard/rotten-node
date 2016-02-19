import qs from 'querystring';
import http from 'superagent';

export const buildEndpoint = (baseUrl, key) => (path, params = {}) => `${baseUrl}/${path}?${qs.stringify({ ...params, apikey: key })}`;

export const APICall = (endpoint, cb = null) => {

  var req = http.get(endpoint);

  if (!cb) {
    return new Promise((resolve, reject) => {

      req.end((error, { status, text }) => {

        if (error || status !== 200) {
          reject(error || new Error('Content couldn\'t be retrieved.'));
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
    req.end((error, { status, text }) => {

      if (error || status !== 200) {
        cb(error || new Error('Content couldn\'t be retrieved.'));
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
    parsingError = e;
  }

  return { parsingError, parsedResponse };
}
