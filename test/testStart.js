var test = require('tape');
var job = require('../src/middleware/Job');
var Job=require('../src/model/job');
var Employee=require('../src/model/employee');
var Ratings=require('../src/model/UserRatings');


test('Test Cases', function (TC) {
    TC.test('addition test', function(assert) {
        assert.equal(2+2,4 , '2 + 2 = 4');
        assert.end();
    });

    // TC.test('jobTest',function (assert) {
    //         Job.findOne({ 'Job_ID': 'Cargils PLC:Kottawa 1 :Sales:07:00AM' }, function (err, job1) {
    //             if (err){
    //                 console.log(err);
    //             }else{
    //                 var job = new Job();
    //                 job=job1;
    //                 console.log(job);
    //                 assert.same(job.position, 'Sales', 'What is this');
    //                 assert.end();
    //             }
    //
    //         })
    //
    //     }
    //
    // );
    //
    // TC.test('EmpTest',function (assert) {
    //         Employee.findOne({ 'Ename': 'ranula' }, function (err, emp) {
    //             if (err){
    //                 console.log(err);
    //             }else{
    //                 console.log(emp);
    //                 assert.same(emp.Ename,'Empname', 'dsa');
    //                 assert.end();
    //             }
    //
    //         })
    //
    //     }
    //
    // );
    //
    // TC.test('UserRatings',function (assert) {
    //         Ratings.findOne({ 'review': 'good' }, function (err, emp) {
    //             if (err){
    //                 console.log(err);
    //             }else{
    //                 console.log(emp);
    //                 assert.same(emp.rating,'Rating', 'dsa');
    //                 assert.end();
    //             }
    //
    //         })
    //
    //     }
    //
    // );




});