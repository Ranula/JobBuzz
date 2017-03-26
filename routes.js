module.exports = function(app, passport) {

    // normal routes ===============================================================
    
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        });
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
        failureRedirect: '/login', // redirect back to the signup page if there is an error
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
   
    app.get('/postJob', isLoggedIn, function(req, res) {
        res.render('postJob', {
            user: req.user
        });
    });

    //branch adding
    var Branch = require("./src/model/branch");
    var User = require("./src/model/user")
    app.post('/AddBranch',isLoggedIn, function(req, res) {
        var newBranch = new Branch();
        newBranch.branch_name = req.body.branch_name;
        newBranch.company_name = req.user.local.company_name;
        newBranch.location = req.body.location;
        // console.log(req.body);
        newBranch.save(function(err) {
            if (err){
                return err;
        }
        else {
                User.findOneAndUpdate(
                    {'local.company_name': req.user.local.company_name},
                    // {branch_name: "replace"},
                    {$push: {'local.branches': req.body.branch_name}},
                    // {location: req.body.branch_name},
                    {safe: true, upsert: true},
                    function(err) {
                        console.log(err);
                    }
                );
            console.log("Post saved");
                res.redirect('/profile');

        }

    })

});
}






