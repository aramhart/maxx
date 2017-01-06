'use strict';

(function() {

class MainController {


  constructor($http, $scope, socket, guideBoxAPI) {
    this.$http = $http;
    this.awesomeThings = [];
    $scope.searchBarInput = 'Alien';
    var baseUrlv2 = "https://api-public.guidebox.com/v2/";
    var v2GuideBoxAPIKey = "api_key=rKXF8DcgHFbOSRgJ3awk3LZlC3tBMXbe";

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
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  searchGuideBoxApi() {
    var baseUrlv2 = "https://api-public.guidebox.com/v2/";
    var v2GuideBoxAPIKey = "api_key=rKXF8DcgHFbOSRgJ3awk3LZlC3tBMXbe";
    this.guideBoxSearchResults = [];
    this.$http.get(baseUrlv2 + 'search?type=movie&field=title&query=' + this.guideBoxSearchTerm + '&' + v2GuideBoxAPIKey + '&limit=250').then(response => {
         this.guideBoxSearchResults = response.data.results; //results is array of shows only instead of object
         console.log(Search Results:,this.guideBoxSearchResults);
         }); 
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('maxxApp')
  .controller('MainController', MainController);

})();
