var mongoose = require('mongoose');
var restful = require('node-restful');
var UserRatingSchema = mongoose.Schema({
    company_name: String,
    number: String,
    review: String,
    rating: String,
});

module.exports = mongoose.model('UserRatings', UserRatingSchema);
module.exports = restful.model('UserRatings',UserRatingSchema);
