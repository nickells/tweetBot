app.controller('MainCtrl', function($scope,TwitterFactory,ChatFactory,$timeout,$state){
  $scope.tweets = [];
  $scope.chat = [];
  $scope.submitForm = function(){
    TwitterFactory.getTweetsFrom($scope.twitterHandle)
    .then(function(tweets){
      $scope.tweets = tweets;
      $scope.chat = [];
    })
  }
  $scope.sendMessage = function(){
    $scope.chat.push({text: $scope.chatInput.text, sender: 'Me'});
    ChatFactory.sendMessage($scope.chatInput.text)
    .then(function(res){
      $scope.chatInput.text = '';
      $timeout(function(){
        $scope.chat.push({text: res.join(' '), sender: $scope.tweets[0].user.name + 'Bot'})
      },500);
    })
  }
  $scope.saveChat = function(){
    ChatFactory.saveChat({messages: $scope.chat})
    .then(function(){
      $state.go('chats')
    })
  }
})
