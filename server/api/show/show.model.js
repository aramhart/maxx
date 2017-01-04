'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ShowSchema = new mongoose.Schema({
  title: String,
  rating: String,
  description: String,
  poster: String,
  imdb_id: String,
  first_aired: String,
  artwork_208x117: String,
  alternate_titles: Array,
  common_sense_media: String,
  freebase: String,
  id: String,
  imdb: String,
  in_theaters: String,
  metacritic: String,
  original_title: String,
  poster_120x171: String,
  poster_240x342: String,
  poster_400x570: String,
  pre_order: Boolean,
  rating: String,
  release_date: String,
  release_year: String,
  rottentomatoes: String,
  themoviedb: String,
  wikipedia_id: String
});

export default mongoose.model('Show', ShowSchema);
