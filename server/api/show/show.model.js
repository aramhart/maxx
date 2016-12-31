'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ShowSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  year: String,
  rating: String,
  description: String,
  poster: String
});

export default mongoose.model('Show', ShowSchema);
