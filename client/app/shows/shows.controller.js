'use strict';

angular.module('maxxApp')
  .controller('ShowsCtrl', function ($http, guideBoxAPI, socket, $scope) {
   // $scope.message = 'Hello';
   this.$http = $http;

   var baseUrl = "https://api-public.guidebox.com/v1.43/US/rKXF8DcgHFbOSRgJ3awk3LZlC3tBMXbe/";
   this.guideBoxSearchInput = 'Bounty Hunters';
   this.newShow = {};
   console.log('show view');
  // this.shows = '';

//	$http.get('/api/shows').then(response => {
  //    this.showData = response.data;
    //  	console.log('this.shows',this.shows);
    //});

	$scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
   // $http.get(baseUrl + 'search/title/' + this.guideBoxSearchInput + '/fuzzy').then(response => {
    //	this.guideBoxShows = response.data.results; //results is array of shows only instead of object
    //	console.log('guideboxshows',this.guideBoxShows);
      //      });
                
    
this.getLocalData = function() {
	$http.get('/api/shows').then(response => {
      this.showData = response.data;
      	console.log('this.shows',this.shows);
    });

}
this.searchGuideBoxAPI = function(){

	 this.$http.get(baseUrl + 'search/title/' + this.guideBoxSearchInput + '/fuzzy').then(response => {
	 	console.log('guideBoxShows',response.data.results);
    	this.guideBoxShows = response.data.results; //results is array of shows only instead of object
            });
  };

this.addNewShow = function(){
  	console.log('adding new show', this.newShow);
    if (this.newShow) {
      this.$http.post('/api/shows', { name: this.newThing });
      this.newShow = '';
    }
}

this.deleteShow = function(show) {
  	console.log('delete show');
    this.$http.delete('/api/shows/' + show._id).then(response => {
	 	console.log('deleted',show._id);
	 	this.getLocalData(); //need to re-load local data!
	 	// socket.syncUpdates('thing', this.awesomeThings);

    	//this.guideBoxShows = response.data.results; //results is array of shows only instead of object
            });;
}

this.transferToLocalAPI = function() {
	//console.log('transfering to local API',this.guideBoxShows[2]);

	for (var i = 0; i<this.guideBoxShows.length; i++) {
		if (this.guideBoxShows[i]) {
		  console.log('transfering to local API',this.guideBoxShows[i]);
    	  this.$http.post('/api/shows', this.guideBoxShows[i]);
 	      //this.newShow = '';
    	}
    }
    this.getLocalData();
}

this.getLocalData();
this.searchGuideBoxAPI(); //call initially 


 });

/*'use strict';

(function() {

class ShowsController {

  constructor($http, $scope, socket, guideBoxAPI) {
    this.$http = $http;
    this.showData = [];
    this.searchResults = [];
    this.newShow = {};
    this.guideBoxSearchInput = 'Alien';
    this.guideBoxAPI = guideBoxAPI;

    guideBoxAPI.getSearchResults() //get genres
                       .then(function (response) {
                            $scope.searchResults = response;                           
                            guideBoxAPI.getSearchResults($scope.searchBarInput) //pass in search bar results
                                          .then(function (response) {
                                           $scope.searchResults = response.data;
                                           console.log('updated search results!!!! ');
                                           console.log(response.data);
                            });
                        });

    $http.get('/api/shows').then(response => {
      this.showData = response.data;
      console.log(response.data);
      socket.syncUpdates('show', this.showData);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('shows');
    });
  }

  addNewShow() {
  	console.log('adding new show', this.newShow);
    if (this.newShow) {
      this.$http.post('/api/shows', this.newShow);
      this.newShow = '';
    }
  }


getSearchResults(guideBoxAPI, $http, $scope) { 
  
 guideBoxAPI.getSearchResults() //get genres
                       .then(function (response) {
                            $scope.searchResults = response;                           
                            guideBoxAPI.getSearchResults($scope.searchBarInput) //pass in search bar results
                                          .then(function (response) {
                                           $scope.searchResults = response.data;
                                           console.log('updated search results!!!! ');
                                           console.log(response.data);
                            });
                        });




   }

   
 
   
 
  deleteShow(show) {
  	console.log('delete show');
    this.$http.delete('/api/shows/' + show._id);
  }

}

angular.module('maxxApp')
  .controller('ShowsCtrl', ShowsController);

})(); */