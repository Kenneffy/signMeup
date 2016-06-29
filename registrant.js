var mongoose = require('mongoose');
require('mongoose-setter')(mongoose);

// Schema Class
var Schema = mongoose.Schema;

var RegistrantSchema = new Schema({
	firstname: {
	  	type: String,
	  	trim: true,
	  	required: "First Name is Required"
	},
	lastname: {
	  	type: String,
	  	trim: true,
	  	required: "Last Name is Required"
	},
	emailaddress: {
	  	type: String,
	  	unique: true,
	  	required: "Email is Required",
	  	match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
	},
	instanceCaptured: {
		type: Date,
		default: Date.now
	}
});

RegistrantSchema.path('firstname')
	.trim()
	.capitalize()

RegistrantSchema.path('lastname')
	.trim()
	.capitalize()	

// create the "Registrant" model with our UserSchema schema
var Registrant = mongoose.model('Registrant', RegistrantSchema);

// export the Registrant model, so it can be used in server.js with a require.
module.exports = Registrant;