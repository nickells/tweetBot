var app = angular.module('Website', ["ui.router","angular-loading-bar"])

app.config(function($stateProvider,$locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
})