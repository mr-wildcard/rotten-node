(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('superagent'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['superagent', 'qs'], factory) :
  (factory(global.http,global.qs));
}(this, function (http,qs) { 'use strict';

  http = 'default' in http ? http['default'] : http;
  qs = 'default' in qs ? qs['default'] : qs;

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers;

  var buildEndpoint = function buildEndpoint(baseUrl, key) {
    return function (path) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return baseUrl + '/' + path + '?' + qs.stringify(babelHelpers.extends({}, params, { apikey: key }));
    };
  };

  var APICall = function APICall(endpoint) {
    var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var req = http.get(endpoint);

    if (!cb) {
      return new Promise(function (resolve, reject) {

        req.end(function (error, _ref) {
          var text = _ref.text;

          if (error) {
            reject(error);
          } else {
            var _parseResponse = parseResponse(text);

            var parsingError = _parseResponse.parsingError;
            var parsedResponse = _parseResponse.parsedResponse;

            if (parsingError) {
              reject(parsingError);
            } else {
              resolve(parsedResponse);
            }
          }
        });
      });
    } else {
      return req.end(function (error, _ref2) {
        var text = _ref2.text;

        if (error) {
          cb(error);
        } else {
          var _parseResponse2 = parseResponse(text);

          var parsingError = _parseResponse2.parsingError;
          var parsedResponse = _parseResponse2.parsedResponse;

          cb(parsingError, parsedResponse);
        }
      });
    }
  };

  var parseResponse = function parseResponse(text) {

    var parsingError = null;
    var parsedResponse = null;

    try {
      parsedResponse = JSON.parse(text);
    } catch (e) {
      error = e;
    }

    return { parsingError: parsingError, parsedResponse: parsedResponse };
  };

  var apiBaseURL = 'http://api.rottentomatoes.com/api/public/v1.0';

  module.exports = function () {
    function RottenTomatoes() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      babelHelpers.classCallCheck(this, RottenTomatoes);

      if (!config.hasOwnProperty('apiKey')) {
        throw new Error('RottenTomatoes: apiKey needs to be provided.');
      }

      this.config = config;
      this.buildURL = buildEndpoint(apiBaseURL, this.config.apiKey);
    }

    babelHelpers.createClass(RottenTomatoes, [{
      key: 'movie',
      value: function movie(movieId) {
        var _this = this;

        if (!movieId) {
          throw new Error('RottenTomatoes: invalid movie ID.');
        }

        var slugStart = 'movies/' + movieId;

        return {
          infos: function infos(cb) {
            return APICall(_this.buildURL(slugStart + '.json'), cb);
          },
          cast: function cast(cb) {
            return APICall(_this.buildURL(slugStart + '/cast.json'), cb);
          },
          clips: function clips(cb) {
            return APICall(_this.buildURL(slugStart + '/clips.json'), cb);
          },
          reviews: function reviews(cb) {
            return APICall(_this.buildURL(slugStart + '/reviews.json'), cb);
          },
          similar: function similar(cb) {
            return APICall(_this.buildURL(slugStart + '/similar.json'), cb);
          },
          alias: function alias(cb) {
            return APICall(_this.buildURL(slugStart + '/movie_alias.json'), cb);
          }
        };
      }
    }, {
      key: 'search',
      value: function search(words, params, cb) {

        var searchParams = babelHelpers.extends({}, params, {
          q: words
        });

        return APICall(this.buildURL('movies.json', searchParams), cb);
      }
    }, {
      key: 'lists',
      get: function get() {
        var _this2 = this;

        return {
          movies: {
            boxOffice: function boxOffice(params, cb) {
              return APICall(_this2.buildURL('lists/movies/box_office.json', params), cb);
            },
            inTheaters: function inTheaters(params, cb) {
              return APICall(_this2.buildURL('lists/movies/in_theaters.json', params), cb);
            },
            opening: function opening(params, cb) {
              return APICall(_this2.buildURL('lists/movies/opening.json', params), cb);
            },
            upcoming: function upcoming(params, cb) {
              return APICall(_this2.buildURL('lists/movies/upcoming.json', params), cb);
            }
          },
          dvds: {
            topRentals: function topRentals(params, cb) {
              return APICall(_this2.buildURL('lists/dvds/top_rentals.json', params), cb);
            },
            currentReleases: function currentReleases(params, cb) {
              return APICall(_this2.buildURL('lists/dvds/current_releases.json', params), cb);
            },
            newReleases: function newReleases(params, cb) {
              return APICall(_this2.buildURL('lists/dvds/new_releases.json', params), cb);
            },
            upcoming: function upcoming(params, cb) {
              return APICall(_this2.buildURL('lists/dvds/upcoming.json', params), cb);
            }
          }
        };
      }
    }]);
    return RottenTomatoes;
  }();

}));