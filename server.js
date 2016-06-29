var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Employer = require('./registrant.js');
var Mailer = require('./mailer.js');
var Authpass = require('./keys.js');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
	res.render('index');
})

app.post('/submit', function(req, res) {
	var registrant = new Employer(req.body);



	registrant.save(function(err, doc) {
		var foobar = {
			employerFirstname : req.body.firstname,
			employerLastname : req.body.lastname,
			employerEmailaddress : req.body.emailaddress
		}
	  // send any errors to the browser
		if (err) {
		    // res.send(err);
		    res.render('duplicate');
	  	} else {
	    // res.send(doc);
	    res.render('confirmation', foobar);
	    console.log(req)
	    // res.redirect('/');
	  }
	});

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: Authpass
	});

	var mailOptions = {
	    from: '"Kenneth Yee" <kyee@ccpd.rutgers.edu>',
	    cc: 'Kenneth Yee <kenneth_yee2@yahoo.com>', 
	    to: req.body.emailaddress,
	    subject: 'Rutgers Coding Bootcamp - Demo Day Expo 7/27/16 @ 6PM (REGISTRATION LINK)',  
	    html: '<p>Thank you for your interest in our Demo Day Expo ' + req.body.firstname + ', we are looking forward to having your attendance! Please feel free to bring a buddy or even your whole team, for full details please register ' + '<a href="https://rutgerscodingbootcampdemoday.splashthat.com">here</a>' + ' - space is limited so we highly recommend guests sign up today!</p>' +
	    	'<p>If you have any pressing questions please contact our Career Director Nalani, her email is nkopp@ccpd.rutgers.edu</p>' + 
	    	'<h4>Best,</h4>' + 
	    	'<h4>Kenneth Yee</h4>' + 
	    	'<h4>Career Services</h4>'
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


});




