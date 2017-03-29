var mongoose = require('mongoose');

var BranchSchema = mongoose.Schema({
        company_name: String,
        branch_name: String,
        location: String
});

module.exports = mongoose.model('branch', BranchSchema);

