var restful = require('node-restful');
var mongoose = restful.mongoose;

var AppUserSchema = mongoose.Schema({
    Username: String,
    Password: String,
    JobType: String,
    MobileNumber: String,
    Location: String,
    Coordinates:String,
    District: String,
    MyToken: String,
})

module.exports = restful.model('AppUser',AppUserSchema);