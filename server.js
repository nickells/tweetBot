var express = require('express')
var app = express();
var bodyParser = require('body-parser')

var api = require('./api-routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api)


app.use(express.static('public'))
app.use('/bower_components', express.static(__dirname + '/bower_components'))
app.use('/*', function(req,res){
	res.sendFile(__dirname + '/public/index.html')
})


// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});


app.listen(process.env.PORT || 3000)