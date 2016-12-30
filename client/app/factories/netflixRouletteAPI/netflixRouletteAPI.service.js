'use strict';

angular.module('maxxApp')
  .factory('netflixRouletteAPI', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
