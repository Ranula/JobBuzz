var Branch = require('../model/branch');
var User = require("../model/user");
var AppUser = require("../model/AppUser");
var gcm = require('node-gcm');
var Job = require('./Job');
module.exports = {
    AddBranch: function (req) {
        var newBranch = new Branch();
        newBranch.branch_name = req.body.branch_name;
        newBranch.company_name = req.user.local.company_name;
        newBranch.location = req.body.location;
        newBranch.district = req.body.district;
        newBranch.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                User.findOneAndUpdate(
                    {'local.company_name': req.user.local.company_name},
                    {$push: {'local.branches': req.body.branch_name}},
                    {safe: true, upsert: true},
                    function (err) {
                        console.log(err);
                    }
                );
                console.log("Post saved");
            }
        })
    },

    GetBranch: function (req) {
        bra = req.body.branch;
        Branch.findOne({'branch_name': bra.trim()}, function (err, mybranch) {
            if (err) {
                console.log(err);
            }
            var registrationTokens = [];
            if (mybranch != null) {
                AppUser.find({'District': mybranch.district}, 'Coordinates MyToken', function (err, person) {
                    if (err) return handleError(err);
                    console.log(person.length);

                    for (var x = 0; x < person.length; x++) {
                        var mydist = converter(person[x].Coordinates, mybranch.location);
                        if (mydist < 25) {
                            registrationTokens.push(person[x].MyToken);
                            console.log(person[x].MyToken);
                        } else {
                            console.log("No Users");
                        }
                        console.log(registrationTokens);
                    }
                    console.log(registrationTokens);
                    if (registrationTokens.length > 0) {
                        // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
                        var sender = new gcm.Sender('AAAA3ReGEVc:APA91bEPFD_wrTnqu7wL6p7WzDH70VQnlhBhYG7yL6DevvOscoCjHIkhika52TAe3R-e11hMi5ziYnTZU6Lr1BHI--_3G5HEMotDTlM8L8O7LmOfT0bv1msCuOcAMmH7rR7u3UDTJlmN');

// Prepare a message to be sent
                        var message = new gcm.Message({
                            data: {
                                company_name: req.user.local.company_name.trim(),
                                branch_name: req.body.branch.trim(),
                                rate: req.body.rate,
                                job_date: req.body.job_date,
                                start_time: req.body.start_time,
                                position: req.body.position
                            }
                        });

                        message.addNotification('title', 'Job Alert!!!');
                        message.addNotification('body', 'Login and check');

// Specify which registration IDs to deliver the message to
//                         var regTokens = ['cHJxpiv9FlY:APA91bFcvfxf6PSkR8N7XbgwaNzUl1v2ZZn1To-i13gl76LSxcWLw2jlak6DfCDuMPxVtWuanxVTYbzuedQtfU1MiawnSJREacEG3hFOWmvu3q1FccJzPX0ZqjoUKx3z49VxadrUHnxR'];
                        var regTokens = registrationTokens;

// Actually send the message
                        sender.send(message, {registrationTokens: regTokens}, function (err, response) {
                            if (err) console.error(err);
                            else console.log(response);
                        });
                    }
                })

            } else {
            }
        })

    },


}

function converter(loc1, loc2) {
    var loc1a = loc1.substring(1, loc1.length - 1);
    var loc1b = loc2.substring(1, loc2.length - 1);

    var langlat1 = loc1a.split(",");
    var langlat2 = loc1b.split(",");

    var lat1 = parseFloat(langlat1[0]);
    var lon1 = parseFloat(langlat1[1]);
    var lat2 = parseFloat(langlat2[0]);
    var lon2 = parseFloat(langlat2[1]);

    var dist = distance(lat1, lon1, lat2, lon2);
    console.log("DISTANCE           " + dist);
    return dist;

}

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    console.log(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

}

