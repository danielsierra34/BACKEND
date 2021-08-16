var mongoose = require('mongoose');
 
module.exports = mongoose.model('Users',{
    password: String,
    email: String,
    firstName: String,
    lastName: String
});
