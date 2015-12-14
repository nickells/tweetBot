app.factory('TwitterFactory', function($http){
  var factory = {}

  factory.getTweetsFrom = function(handle){
    return $http.get('/api/tweets/' + handle)
    .then(function(tweets){
      return tweets.data;
    },console.log)
  }

  return factory;
})