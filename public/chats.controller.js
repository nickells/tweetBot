app.controller('ChatCtrl', function($scope, ChatFactory, chats){
  
  $scope.deleteChat = function(chat){
    return ChatFactory.deleteChat(chat)
    .then(function(chat){
      $scope.chats.splice($scope.chats.indexOf(chat),1)
    })
  }
  $scope.chats = chats;
})