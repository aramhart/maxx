'use strict';

(function() {

class MainController {


  constructor($http, $scope, socket, guideBoxAPI, guideBoxBaseUrlV2, v2GuideBoxApiKey, omdbBaseUrl) {
    //use this to pass dependencies into functions defined later in controller
    this.$http = $http;
    this.guideBoxBaseUrlV2 = guideBoxBaseUrlV2;
    this.v2GuideBoxApiKey = v2GuideBoxApiKey;
    this.omdbBaseUrl = omdbBaseUrl;
    this.awesomeThings = [];
    this.guideBoxSearchTerm = 'Bounty Hunter';
    this.currentMovieImdbId = 'tt0078748'
    guideBoxAPI.getSearchResults() //get genres
                       .then(function (response) {
                            $scope.searchResults = response;                           
                            guideBoxAPI.getSearchResults($scope.searchBarInput) //pass in search bar results
                                          .then(function (response) {
                                           $scope.searchResults = response.data;
                                           console.log('updated search results.. ');
                                           console.log(response.data);
                            });
                        });

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    this.$http.get(this.guideBoxBaseUrlV2 + 'search?type=movie&field=title&query=' + this.guideBoxSearchTerm + '&' + this.v2GuideBoxApiKey + '&limit=250').then(response => {
         this.guideBoxSearchResults = response.data.results; //results is array of shows only instead of object
         console.log('Search Response',response.data);
         });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  searchGuideBoxApi() {
    this.guideBoxSearchResults = [];
    this.$http.get(this.guideBoxBaseUrlV2 + 'search?type=movie&field=title&query=' + this.guideBoxSearchTerm + '&' + this.v2GuideBoxApiKey + '&limit=250').then(response => {
         this.guideBoxSearchResults = response.data.results; //results is array of shows only instead of object
         console.log('Search Results:'+response.data);
         }); 
  }

 //get a single result by id, but uses data from view (this.currentMovieImdbId) can get rid of this pretty sure
 //just pass in this.variable through view
 getSingleOmdbById() {
   this.omdbSingleMovie = {};
    this.$http.get(this.omdbBaseUrl + '?i=' + this.currentMovieImdbId + '&y=&plot=short&r=json').then(response => {
         this.omdbSingleMovie = response; 
         console.log('!Single Movie',this.omdbSingleMovie);
         }); 
  }

  //get single result by id, passed into function and return json data
  //return json data is object of movie info
  getOmdbById(id) {
   var movieData = [];
    this.$http.get(this.omdbBaseUrl + '?i=' + id + '&y=&plot=short&r=json').then(response => {
         console.log('response.data',response.data);
         movieData = response.data;
         }); 
    console.log('movieData',movieData);
    return movieData;
  }

  //create a matching dataset of guidebox search results but with OMDB data
  createOmdbResults() {
    this.omdbResults = []; //array of Omdb data matching guidebox data from search results
    
    for (var i=0; i<this.guideBoxSearchResults.length; i++) {
      if (this.guideBoxSearchResults[i].imdb) { 
        this.$http.get(this.omdbBaseUrl + '?i=' + this.guideBoxSearchResults[i].imdb + '&y=&plot=short&r=json').then(response => {
        console.log(response,'omdb results',this.omdbResults);
        this.omdbResults.push(response.data); 

         });
      }
    }
  
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('maxxApp')
  .controller('MainController', MainController);

})();
