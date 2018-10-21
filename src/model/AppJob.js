var restful = require('node-restful');
var mongoose = restful.mongoose;

var AppJobSchema = mongoose.Schema({
    UserID: String,
    JobType: String,
    Location: String,
    Coordinates:String,
    District: String,
    Start_time: String,
    Job_date: String,
    Position: String,
    Duration:String,
    Rate:String,
})

module.exports = restful.model('AppJob',AppJobSchema);