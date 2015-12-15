var app = angular.module('Website', ["ui.router","angular-loading-bar"])

app.config(function($stateProvider,$locationProvider,$stateProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'mainTemplate.html',
      controller: 'MainCtrl'
    })
    .state('chats', {
      url: '/chats',
      templateUrl: 'chatsTemplate.html',
      resolve: {
        chats: function(ChatFactory){
          return ChatFactory.getChats()
        }
      },
      controller: 'ChatCtrl'
    })
})
.run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess', function(event,toState){
    $rootScope.currentState = toState.name;
    console.log($rootScope.currentState)
  })
})