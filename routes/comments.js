
var express = require("express");
var router = express.Router({mergeParams:true});

var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");
// comments new
router.get("/new",middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground:campground});
        }
    });
});

// comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error","Something's Wrong");
            console.log(err);
            res.redirect("/gallery/req.params.id");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment Saved");
                    res.redirect("/gallery/" + campground._id);
                }
            });
        }
    });
});


//Comments - edit

router.get('/:comment_id/edit',middleware.checkCommentOwenership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error","Something's Wrong");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id : req.params.id, comment: foundComment});
        }
    });
    
    
});

//Update Comments

router.put('/:comment_id', middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true}, function(err, comment){
        if(err){
            console.log(err);
            req.flash("error","Something's Wrong");
            res.redirect("back");
        }else{
            req.flash("success","Comment Updated");
            res.redirect('/gallery/'+req.params.id);
        }
    });
});

//Destroy Comment

router.delete('/:comment_id', middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            req.flash("error","Something's Wrong");
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success","Comment Deleted");
            res.redirect('/gallery/'+req.params.id);
        }
    });
});

module.exports = router;