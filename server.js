var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var path = require('path');



app.listen(3000);


//export mail logic 
var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: 'kenneth_yee2@yahoo.com', 
        pass: ''
    }
});

var mailOptions = {
    from: '"Kenneth Yee 👥" <kenneth_yee2@yahoo.com>', 
    to: 'kyee@ccpd.rutgers.edu',
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

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
})



