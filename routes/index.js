var express = require("express");
var router = express.Router();

var User = require("../models/user");
var passport = require("passport");


// root route
router.get('/',function(req, res) {
   res.render('landing'); 
});


// show sign up form
router.get("/register", function(req, res) {
   res.render("register",{page: 'register'}); 
});


// handel sign up
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You are successfully registered and logged in as: " + user.username);
            res.redirect("/gallery");
        })
    })
});


// login form
router.get('/login', function(req, res){
   res.render('login',{page: 'login'}); 
});


// login logic 
router.post('/login', passport.authenticate('local', {
    successRedirect: "/gallery",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Welcome!'
}), function(req, res){
  
});


// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Successfully Logged Out")
    res.redirect("/gallery");
    
});


router.get("/patatap", function(req, res) {
    res.render("games/PATATAP");
})

router.get("/colorgame", function(req, res) {
    res.render("games/colorgame");
})

module.exports = router;