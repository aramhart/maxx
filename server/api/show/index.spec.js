'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var showCtrlStub = {
  index: 'showCtrl.index',
  show: 'showCtrl.show',
  create: 'showCtrl.create',
  update: 'showCtrl.update',
  destroy: 'showCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var showIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './show.controller': showCtrlStub
});

describe('Show API Router:', function() {

  it('should return an express router instance', function() {
    showIndex.should.equal(routerStub);
  });

  describe('GET /api/shows', function() {

    it('should route to show.controller.index', function() {
      routerStub.get
        .withArgs('/', 'showCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/shows/:id', function() {

    it('should route to show.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'showCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/shows', function() {

    it('should route to show.controller.create', function() {
      routerStub.post
        .withArgs('/', 'showCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/shows/:id', function() {

    it('should route to show.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'showCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shows/:id', function() {

    it('should route to show.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'showCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shows/:id', function() {

    it('should route to show.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'showCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
