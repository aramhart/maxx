'use strict';

describe('Service: netflixRouletteAPI', function () {

  // load the service's module
  beforeEach(module('maxxApp'));

  // instantiate service
  var netflixRouletteAPI;
  beforeEach(inject(function (_netflixRouletteAPI_) {
    netflixRouletteAPI = _netflixRouletteAPI_;
  }));

  it('should do something', function () {
    expect(!!netflixRouletteAPI).toBe(true);
  });

});
