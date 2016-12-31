/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shows              ->  index
 * POST    /api/shows              ->  create
 * GET     /api/shows/:id          ->  show
 * PUT     /api/shows/:id          ->  update
 * DELETE  /api/shows/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Show from './show.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Shows
export function index(req, res) {
  Show.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Show from the DB
export function show(req, res) {
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Show in the DB
export function create(req, res) {
  Show.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Show in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Show from the DB
export function destroy(req, res) {
  Show.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
