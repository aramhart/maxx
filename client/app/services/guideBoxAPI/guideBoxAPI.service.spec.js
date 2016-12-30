'use strict';

describe('Service: guideBoxAPI', function () {

  // load the service's module
  beforeEach(module('maxxApp'));

  // instantiate service
  var guideBoxAPI;
  beforeEach(inject(function (_guideBoxAPI_) {
    guideBoxAPI = _guideBoxAPI_;
  }));

  it('should do something', function () {
    expect(!!guideBoxAPI).toBe(true);
  });

});
