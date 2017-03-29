module.exports = function(app, passport) {

    // normal routes ===============================================================
    
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        if (req.user.local.jobs.length>0){
            Job.GetJob(req.user,res);
        }else{
            res.render('profile', {user: req.user});
        }
    });
    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    // app.get('/login', function(req, res) {
    //     res.render('login', {
    //         message: req.flash('loginMessage')
    //     });
    // });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the home page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
    //JobPosting
   //Job posting form
    var Job = require("./src/middleware/Job");
    app.get('/postJob', isLoggedIn, function(req, res){
        if(req.user.local.branches.length>0){
        res.render('postJob', {
            user: req.user
        });
        }else{
            // window.alert("You Must Add a Branch");
            res.redirect('/profile')
        }
    });

    //Rendering the post Job form
    
    app.post('/PostJob',isLoggedIn,function (req,res) {

        Job.AddJob(req);

        res.redirect('/profile');


    })

    //branch adding
    var Branch = require("./src/middleware/Branch")
    app.post('/AddBranch',isLoggedIn, function(req, res) {
        Branch.AddBranch(req);
        
        res.redirect('/profile');
});
   
}






