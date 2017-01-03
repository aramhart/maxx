'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ShowSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  year: String,
  rating: String,
  description: String,
  poster: String,
  imdb_id: String,
  first_aired: String,
  artwork_208x117: String

});

export default mongoose.model('Show', ShowSchema);
