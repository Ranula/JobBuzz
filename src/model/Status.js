var restful = require('node-restful');
var mongoose = restful.mongoose;

var statusSchema = mongoose.Schema({
    fbname: String,
    content: String,
})

module.exports = restful.model('tblstatus',statusSchema);