var Branch = require('../model/branch');
var User = require("../model/user");
module.exports={
AddBranch : function (req) {
    var newBranch = new Branch();
    newBranch.branch_name = req.body.branch_name;
    newBranch.company_name = req.user.local.company_name;
    newBranch.location = req.body.location;
    newBranch.save(function(err) {
        if (err){
            console.log(err);
        }
        else {
            User.findOneAndUpdate(
                {'local.company_name': req.user.local.company_name},
                {$push: {'local.branches': req.body.branch_name}},
                {safe: true, upsert: true},
                function(err) {
                    console.log(err);
                }
            );
            console.log("Post saved");
        }
        })
}

}