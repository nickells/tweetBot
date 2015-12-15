app.directive('singleTweet',function(){
  return {
    scope: {
      tweet: '='
    },
    restrict: 'E',
    templateUrl: 'single_tweet.html'
  }
})