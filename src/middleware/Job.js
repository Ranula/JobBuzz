var Job = require('../model/job');
var User = require('../model/user');
module.exports={
    AddJob : function (req) {
        var newJob = new Job();
        var ID=req.user.local.company_name.concat(":").concat(req.body.branch).concat(":").concat(req.body.position).concat(":").concat(req.body.starttime);
        newJob.Job_ID=ID;
        newJob.company_name= req.user.local.company_name;
        newJob.branch_name=req.body.branch;
        newJob.rate=req.body.rate;
        newJob.duration=req.body.duration;
        newJob.start_time=req.body.starttime;
        newJob.position=req.body.position;
        newJob.job_date=req.body.job_date;
        newJob.status="OnGoing";
        newJob.save(function (err) {
            if (err){
                return err;
            }else{
                User.findOneAndUpdate(
                    {'local.company_name': req.user.local.company_name},
                    {$push: {'local.jobs': newJob.Job_ID}},
                    // {location: req.body.branch_name},
                    {safe: true, upsert: true},
                    function(err) {
                        console.log(err);
                    }
                );
                console.log("Post saved");
            }
        })

    },

    GetJob: function(user,res){
        
        sample = new Array();
        var joblist = user.local.jobs;
        // console.log("Cheap Thrills");
        // console.log(joblist);
        var x;
        if (joblist.length<4){
            x=joblist.length;
        }else{
            x=3;
        }
        for(var i=0;i<x;i++){
            Job.findOne({ 'Job_ID': joblist[i] }, function (err, job1) {
                if (err){
                    console.log(err);
                }
                 var job = new Job();
                job=job1;
                sample.push(job);
                if( sample.length==x){
                    console.log(sample);
                    res.render('profile', {user: user,MyJobList : sample});
                }
        })
    }



}}