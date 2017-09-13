// App init
//var app = angular.module('app',[]);
// Dependencies: ngRoute
var app = angular.module('app', ['ngRoute']);

// App routing configuration
app.config(function($routeProvider) {
  $routeProvider
    .when('/jobs', {
      templateUrl: 'partials/jobs-list.html',
      controller: 'JobsController'
    })
    .when('/job-details', {
      templateUrl: 'partials/job-details.html',
      controller: 'JobDetailsController'
    })
  .otherwise({
    redirectTo: '/jobs'
  });
});


// Dependency injection
app.factory('jobService', function($http, $window) {

  var selectedJob = null;
  var all, items = [];

  var loadJobs = function() {
      return $http.get('data/jobs.json').then(function(response) {
        all = response.data.items;

        angular.forEach(all, function(x, i) {
          if (i % 2 == 1) {
            items.push(x);
          }
        });

        return items;
      });
  }

  return {
    getJobs: loadJobs,
    selectJob: function(job) {
      //console.log('Job: ' + job.title);
      selectedJob = job;
    },
    getSelectedJob: function() {
      if (selectedJob == null) {
        $window.location.href = '#/jobs';
        return;
      } else {
        return selectedJob;
      }
    }
  }

});


// Header controller
app.controller('AppController', function($scope) {
  $scope.appDetails = {
    title: "AngularJS Simple App",
    description: "It's an example of an AngularJS app by Rian Dutra.",
    author: {
      name: "Rian Dutra",
      email: "eu@riandutra.com",
      website: "www.riandesign.com.br"
    },
    dates: {
      firstYear: 2006,
      currentYear: (new Date()).getFullYear()
    }
  };
});


// Jobs controller
// Without Dependency Injection
/*
app.controller('JobsController', function($scope, jobService) {
  //var jsonUri = 'http://riandesign.com.br/galeria/albuns/json_output';
  $http.get('data/jobs.json').then(function(response) {
    //console.log(response.data);
    $scope.jobs = response.data.items;
  });
});
*/

// Jobs Controller
app.controller('JobsController', ['$scope','jobService',function($scope, jobService) {
  jobService.getJobs().then(function(response){
    $scope.jobs = response;
  });

  $scope.selectJob = function(job) {
    jobService.selectJob(job);
  }
}]);


// Job details controller
app.controller('JobDetailsController', function($scope, jobService) {
  $scope.selectedJob = jobService.getSelectedJob();
});
