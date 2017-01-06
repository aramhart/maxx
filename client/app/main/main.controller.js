'use strict';

(function() {

class MainController {


  constructor($http, $scope, socket, guideBoxAPI, guideBoxBaseUrlV2, v2GuideBoxApiKey) {
    //use this to pass dependencies into functions defined later in controller
    this.$http = $http;
    this.guideBoxBaseUrlV2 = guideBoxBaseUrlV2;
    this.v2GuideBoxApiKey = v2GuideBoxApiKey;
    this.awesomeThings = [];
    this.guideBoxSearchTerm = 'Alien';
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
         console.log('Search Results:'+response.data);
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

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('maxxApp')
  .controller('MainController', MainController);

})();
