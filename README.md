Simple, promise based, client for Rotten Tomatoes API.

[![Build Status](https://travis-ci.org/mr-wildcard/rotten-node.svg?branch=master)](https://travis-ci.org/mr-wildcard/rotten-node)

## Installation
```
$ npm i --save rotten-node
```

## Usage

```javascript
import RT from 'rotten-node';

var api = new RT({ apiKey: YOUR_API_KEY });

api.movie(12989).infos() // <- promise
  .then(result => console.log(result))
  .catch(error => console.error('An error occured while getting movie infos : %s', error));
```

Available methods :
```javascript
// List movies
api.lists.movies.boxOffice();
api.lists.movies.inTheaters();
api.lists.movies.opening();
api.lists.movies.upcoming();

// List DVDs
api.lists.dvds.topRentals();
api.lists.dvds.currentReleases();
api.lists.dvds.newReleases();
api.lists.dvds.upcoming();

// Movie infos
const movieRequest = api.movie(MOVIE_ID);

movieRequest.infos();
movieRequest.cast();
movieRequest.clips();
movieRequest.reviews();
movieRequest.similar();
movieRequest.alias();

// Search
api.search(words, params, callback = null);
```

Passing params to queries : ([available params](http://developer.rottentomatoes.com/io-docs))
```javascript
api.lists.movies.boxOffice({
  limit: 16,
  country: 'us'
});
```

Using callback :
```javascript
api.lists.movies.boxOffice(null, function(error, result) {
  // jawad here
});
```

## Develop
```
$ npm run dev
```
