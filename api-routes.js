var express = require('express');
var router = express.Router();
var db = require('./db.js')
var Twitter = require('twitter');
var markov = require('markov');

 
var markovInstance;

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || require('./keysAndSuch').twitter.consumerKey,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || require('./keysAndSuch').twitter.consumerSecret,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || require('./keysAndSuch').twitter.accessTokenKey,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || require('./keysAndSuch').twitter.accessTokenSecret
});
 


router.get('/tweets/:username', function(req,res,next){
  var params = {screen_name: req.params.username, count: 200};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      res.json(tweets);
      var tweetText = tweets.reduce(function(str,tweet){
        return str + ' ' + tweet.text;
      },'')
      markovInstance = markov(2);
      markovInstance.seed(tweetText);
    }
    else{
      res.send(error)
    }
  });
})

router.post('/bot', function(req,res,next){
  var response = markovInstance.respond(req.body.chatBody, req.body.chatBody.split(' ').length+3);
  response = response.filter(function(word){
    return word.indexOf('http') === -1 && word.indexOf('@') === -1;
  })
  res.send(response);
})

router.post('/chats', function(req,res,next){
  db.Chat.create(req.body.chat)
  .then(function(chat){
    res.json(chat);
  })
})

router.get('/chats', function(req,res,next){
  db.Chat.find()
  .then(function(chats){
    res.json(chats);
  })
})

router.delete('/chats/:id', function(req,res,next){
  db.Chat.findById(req.params.id).remove().exec()
  .then(function(chat){
    res.sendStatus(204);
  })

})


module.exports = router;
