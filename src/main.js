import { buildEndpoint, APICall } from './helpers';

exports.apiBaseURL = 'http://api.rottentomatoes.com/api/public/v1.0';

const requiredConfig = () => new Error('RottentTomatoes: config object is required to instanciate class.');

module.exports = class RottenTomatoes {

  constructor(config = requiredConfig()) {

    if (!config.hasOwnProperty('apiKey')) {
      throw new Error('RottenTomatoes: apiKey needs to be provided.');
    }

    this.config = config;
    this.buildURL = buildEndpoint(apiBaseURL, this.config.apiKey);
  }

  get lists() {
    return {
      movies: {
        boxOffice:  (params, cb) => APICall(this.buildURL('lists/movies/box_office.json', params), cb),
        inTheaters: (params, cb) => APICall(this.buildURL('lists/movies/in_theaters.json', params), cb),
        opening:    (params, cb) => APICall(this.buildURL('lists/movies/opening.json', params), cb),
        upcoming:   (params, cb) => APICall(this.buildURL('lists/movies/upcoming.json', params), cb)
      },
      dvds: {
        topRentals:      (params, cb) => APICall(this.buildURL('lists/dvds/top_rentals.json', params), cb),
        currentReleases: (params, cb) => APICall(this.buildURL('lists/dvds/current_releases.json', params), cb),
        newReleases:     (params, cb) => APICall(this.buildURL('lists/dvds/new_releases.json', params), cb),
        upcoming:        (params, cb) => APICall(this.buildURL('lists/dvds/upcoming.json', params), cb)
      }
    }
  }

  movie(movieId) {

    if (!movieId || !+movieId) {
      throw new Error('RottenTomatoes: invalid movie ID.');
    }

    const slugStart = `movies/${movieId}`;

    return {
      infos:   (cb) => APICall(this.buildURL(`${slugStart}.json`), cb),
      cast:    (cb) => APICall(this.buildURL(`${slugStart}/cast.json`), cb),
      clips:   (cb) => APICall(this.buildURL(`${slugStart}/clips.json`), cb),
      reviews: (cb) => APICall(this.buildURL(`${slugStart}/reviews.json`), cb),
      similar: (cb) => APICall(this.buildURL(`${slugStart}/similar.json`), cb),
      alias:   (cb) => APICall(this.buildURL(`${slugStart}/movie_alias.json`), cb)
    }
  }

  search(words, params, cb) {

    const searchParams = {
      ...params,
      q: words
    };

    return APICall(this.buildURL('movies.json', searchParams), cb);
  }
}
