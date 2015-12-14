var express = require('express');
var router = express.Router();
var db = require('./db.js')
var Twitter = require('twitter');
var keys = require('./keysAndSuch.js')
var markov = require('markov')
 
var m;

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || keys.twitter.consumerKey,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || keys.twitter.consumerSecret,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || keys.twitter.accessTokenKey,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || keys.twitter.accessTokenSecret
});
 

var tweetText;

router.get('/tweets/:username', function(req,res,next){
  var params = {screen_name: req.params.username, count: 200};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
    // console.log(response)
    if (!error) {
      res.json(tweets);
      tweetText = tweets.reduce(function(str,tweet){
        return str + ' ' + tweet.text
      },'')
      m = markov(1)
      m.seed(tweetText)
    }
    else{
      res.err(error)
    }
  });
})

router.post('/bot', function(req,res,next){
  console.log('text from bot is', tweetText)
  console.log(req.body)
  var response = m.respond(req.body.body,req.body.body.length+5)
  response = response.filter(function(word){
    return word.indexOf('http') === -1 && word.indexOf('@') === -1
  })
  res.send(response)
})


module.exports = router;
