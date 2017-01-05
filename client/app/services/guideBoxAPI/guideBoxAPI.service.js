'use strict';

angular.module('maxxApp')
  .factory('guideBoxAPI', function ($http) {
     // Service logic

    var api = {};
    var baseUrl = "https://api-public.guidebox.com/v1.43/US/rKXF8DcgHFbOSRgJ3awk3LZlC3tBMXbe/";

    console.log('called guideBoxAPI');
    api.getGenres = function () {
            return $http.get(baseUrl + 'genres')
                .then(
                function (response) {
                    return response
                });
    }

    api.getChannels = function () {
            return $http.get(baseUrl + 'channels')
                .then(
                function (response) {
                    return response
                });
    }

    api.getSearchResults = function (searchTerm) {
            return $http.get(baseUrl + 'search/title/' + searchTerm + '/fuzzy')
                .then(
                function (response) {
                    return response
                });
    }

    api.getSingleShowDetails = function (showId) {
            return $http.get(baseUrl + 'show/' + showId)
                .then(
                function (response) {
                    return response
                });
    }


    // Public API here
    //return {
     // someMethod: function () {
        return api;
     // }
   // };
  });
