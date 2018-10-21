/**
 * Created by User on 5/17/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

var employeeSchema = mongoose.Schema({
    position: String,
    company: String,
    Ename: String,
    Enumber: String,
    branch: String,
    date: String,
})

module.exports = restful.model('employee',employeeSchema);
