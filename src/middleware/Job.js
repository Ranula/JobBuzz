var Job = require('../model/job');
var User = require('../model/user');
var gcm = require('node-gcm');
var Branch = require("./Branch");
var Employee = require('../model/employee');
module.exports = {
    AddJob: function (req) {
        var newJob = new Job();
        var ID = req.user.local.company_name.concat(":").concat(req.body.branch).concat(":").concat(req.body.position).concat(":").concat(req.body.starttime);
        newJob.Job_ID = ID;
        newJob.company_name = req.user.local.company_name;
        newJob.branch_name = req.body.branch;
        newJob.rate = req.body.rate;
        newJob.duration = req.body.duration;
        newJob.start_time = req.body.starttime;
        newJob.position = req.body.position;
        newJob.job_date = req.body.job_date;
        newJob.status = "OnGoing";

        Branch.GetBranch(req);

        newJob.save(function (err) {
            if (err) {
                return err;
            } else {
                User.findOneAndUpdate(
                    {'local.company_name': req.user.local.company_name},
                    {$push: {'local.jobs': newJob.Job_ID}},
                    {safe: true, upsert: true},
                    function (err) {
                        console.log(err);
                    }
                );
                console.log("Post saved");
            }
        })

    },

    GetJob: function (user, res) {
            Job.find({'company_name': user.local.company_name}, function (err, sample) {
                if (err) {
                    console.log(err);
                }

                if (sample.length <4) {
                    // console.log(sample);
                    res.render('profile', {user: user, MyJobList: sample});
                }
            })


    },

    GetJob2: function (req, res) {

            Job.findOne({'_id': req.params.id}, function (err, job1) {
                if (err) {
                    console.log(err);
                }

                var job = new Job();
                job = job1;
                console.log(job);
                // console.log(req.params.position);
                // employee.fin
                Employee.find({'position': req.params.position}, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(docs);
                    res.render("Jobview", {user: req.user, JobDetails: job, Employee: docs});
                });

                
                
            })
    },



    GetEmployee: function (req, res) {
            Employee.findOne({'_id': req.params.id}, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                console.log(docs);
                res.render("rate", {user: req.user , Employee: docs});
            });




    },
    
}





