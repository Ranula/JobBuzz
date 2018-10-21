//dependencies
var express = require('express');
var router = express.Router();

var Status = require('../src/model/Status');
var AppUser = require('../src/model/AppUser');
var AppJob = require('../src/model/AppJob');
var Employee = require('../src/model/employee');
var UserRatings = require('../src/model/UserRatings');

AppUser.methods(['get','post','put','delete']);
Status.methods(['get','post','put','delete']);
AppJob.methods(['get','post','put','delete']);
Employee.methods(['get','post','put','delete']);
UserRatings.methods(['get','post','put','delete']);

Status.register(router,'/status');
AppUser.register(router,'/AppUser');
AppJob.register(router,'/AppJob');
Employee.register(router,'/employee');
UserRatings.register(router,'/UserRatings');
module.exports = router;