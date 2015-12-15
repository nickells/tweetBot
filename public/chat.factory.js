app.factory('ChatFactory', function($http){
  var factory = {}
  factory.sendMessage = function(text){
    return $http.post('/api/bot', {chatBody: text})
    .then(function(res){
      return res.data;
    }, console.log)
  }
  factory.saveChat = function(chat){
    chat.date = Date.now();
    return $http.post('/api/chats', {chat: chat})
    .then(function(res){
      return res.data;
    }, console.log)
  }
  factory.getChats = function(){
    return $http.get('/api/chats')
    .then(function(res){
      return res.data
    }, console.log)
  }
  factory.deleteChat = function(chat){
    return $http.delete('/api/chats/' + chat._id)
    .then(function(res){
      return res.data
    }, console.log)
  }
  
  return factory;
})