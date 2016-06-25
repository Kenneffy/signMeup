var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Employer = require('./registrant.js');
var Mailer = require('./mailer.js');
var Authpass = require('./keys.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost/signmeup');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose error: ', err);
});

db.once('open', function(){
	console.log('Mongoose connection successful');
});



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

	var transporter = nodemailer.createTransport({
	    service: 'Yahoo',
	    auth: Authpass
	});

	var mailOptions = {
	    from: '"Kenneth Yee 👥" <kenneth_yee2@yahoo.com>', 
	    to: req.body.emailaddress,
	    subject: 'Hello ✔', 
	    text: 'Hello world 🐴', 
	    html: '<b>Hello world 🐴</b>' 
	};

	function transport(){
	    transporter.sendMail(mailOptions, function(error, info){
	        if(error){
	            return console.log(error);
	        }
	        console.log('Message sent: ' + info.response);
	    });
	}

	transport();

})




