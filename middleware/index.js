var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground){
            if(err) {
                req.flash("error","Unexpected error, requested elements not found");
                res.redirect("/gallery");
            } else {
                //if yes, if id match
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","Please log in first to get access to your photos")
        res.redirect("/login");
    }
}


middlewareObj.checkCommentOwenership = function(req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err) {
                req.flash("error","Something went wront! Contact Website Administrator");
                res.redirect("/gallery");
            } else {
                //if yes, if id match
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
}







module.exports = middlewareObj;