app.factory('ChatFactory', function($http){
  var factory = {}
  factory.sendMessage = function(text){
    return $http.post('/api/bot', {body: text})
    .then(function(res){
      return res.data;
    },console.log)
  }
  return factory;
})