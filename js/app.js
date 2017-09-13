// App init
//var app = angular.module('app',[]);
// Dependencies: ngRoute
var app = angular.module('app', ['ngRoute']);

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
app.controller('JobsController', function($scope) {
  $scope.jobs = [
    {
      title: "First job"
    },
    {
      title: "Second job"
    },
  ]
});

// Job details controller
app.controller('JobDetailsController', function($scope) {

});
