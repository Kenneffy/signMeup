var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var path = require('path');
var mongoose = require('mongoose');
var Employer = require('./registrant.js');

mongoose.connect('mongodb://localhost/signmeup');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose error: ', err);
});

db.once('open', function(){
	console.log('Mongoose connection successful');
});

// app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);

//****Need to import mailer logic**** 

app.get('/', function(req, res){
	res.send(index.html);
})

app.post('/submit', function(req, res) {
	var registrant = new Employer(req.body);

	registrant.save(function(err, doc) {
	  // send any errors to the browser
	  if (err) {
	    res.send(err);
	  } 
	  // otherwise, send the new doc to the browser
	  else {
	    res.send(doc);
	  }
	});
})


