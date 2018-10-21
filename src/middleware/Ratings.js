var UserRatings = require('../model/UserRatings');
var Employee = require('../model/employee');
module.exports = {
    AddRating: function (req, res) {
        var newRating = new UserRatings();
        // console.log(req.params.id);
        // console.log(employee.Enumber);
        newRating.company_name = req.user.local.company_name;
        newRating.number = req.params.Enumber;
        newRating.review = req.body.review;
        newRating.rating = req.body.rating;

        newRating.save(function (err) {
            if (err) {
                return err;
            } else {
                console.log("Review saved");
                res.redirect('/profile');
            }
        })
        //
        // Employee.find({'_id': req.params.id}, function (err, employee) {
        //     if (err) {
        //         console.log(err);
        //     }
        //
        // });


    }
}