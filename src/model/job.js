var mongoose = require('mongoose');

var JobSchema = mongoose.Schema({
    Job_ID: String,
    company_name: String,
    job_date: String,
    branch_name: String,
    start_time: String,
    position: String,
    duration:String,
    rate:String,
    employees:[Object],
    status:String,
    ReviewRating:String
});

module.exports = mongoose.model('job', JobSchema);

