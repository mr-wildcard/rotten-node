'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api_call = exports.buildEndpoint = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEndpoint = exports.buildEndpoint = function buildEndpoint(baseUrl, key) {
  return function (path, params) {
    return baseUrl + '/' + path + '/';
  };
};

var api_call = exports.api_call = function api_call(endpoint) {
  var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var req = _superagent2.default.get(endpoint);

  if (!cb) {
    return new Promise(function (resolve, reject) {

      req.end(function (error, response) {

        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  } else {
    return req.end(cb);
  }
};