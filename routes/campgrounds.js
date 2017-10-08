// var express = require("express");
// var router = express.Router({mergeParams:true});
// var Campground = require("../models/campgrounds");
// var middleware = require("../middleware");
// var geocoder = require('geocoder');
// // INDEX - show all campgrounds
// router.get('/', function(req, res){
    
//     //res.render("campgrounds",{grounds:grounds});
//     //get all campgrounds from db
//     Campground.find({},function(err,allCampGrounds){
//         if(err) {
//             console.log(err);
//             req.flash("error","Something's Wrong");
//             res.redirect("back");
//         } else {
//             res.render("campgrounds/index",{grounds:allCampGrounds, currentUser:req.user, page: 'campgrounds'});
//         }
//     });
// });

// // NEW - create a new campground
// router.get("/new", middleware.isLoggedIn, function(req, res) {
//     res.render("campgrounds/new.ejs");
// });

// //SHOW - show the information of specific ground
// router.get("/:id", function(req, res) {
//     //find camp ground with provided id
//     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
//       if(err) {
//           console.log(err);
//           req.flash("error","Something's Wrong");
//           res.redirect("back");
//       } else {
//           res.render('campgrounds/show',{campground:foundCampground});
//       }
//     });
// });


// router.post("/", middleware.isLoggedIn, function(req, res){
//     //get data from form, add data to grounds array
//     //redirect to campgrounds page
//     var name = req.body.name;
//     var img = req.body.img;
//     var description = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
    
//     geocoder.geocode(req.body.location, function (err, data) {
//         geocoder.geocode(req.body.location, function (err, data) {
//         var lat = data.results[0].geometry.location.lat;
//         var lng = data.results[0].geometry.location.lng;
//         var location = data.results[0].formatted_address;
//         var newobj = {name: name, img: img, description: description, author:author,location: location, lat: lat, lng: lng};
//         Campground.create(newobj, function(err,newlyCreated) {
//             if (err) {
//                 console.log(err);
//                 req.flash("error","Something's Wrong");
//                 res.redirect("back");
//             } else {
//                 req.flash("success","Photo Uploaded");
//                 res.redirect("/campgrounds");
//             }
//         });
//     }); 
    
// });


// // EDIT ROUTE
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
//     //if logged in
//     //ifnot, redirect
//     //if yes, if id match
//     //ifnot
//     Campground.findById(req.params.id,function(err,campground){
//         if(err) {
//             req.flash("error","Something's Wrong");
//             res.redirect("/campgrounds");
//         } else {
//             res.render("campgrounds/edit",{campground:campground});
//         }
//     });
    
// });


// //UPDATE Route
// router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
//     // geocoder.geocode(req.body.location, function (err, data){
//     //     var lat = data.results[0].geometry.location.lat;
//     //     var lng = data.results[0].geometry.location.lng;
//     //     var location = data.results[0].formatted_address;
//     //     var newData = {name: req.body.name, image: req.body.image, description: req.body.description,location: location, lat: lat, lng: lng};
//     //     Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
//     //         if(err){
//     //             req.flash("error", err.message);
//     //             res.redirect("back");
//     //         } else {
//     //             req.flash("success","Successfully Updated!");
//     //             res.redirect("/campgrounds/" + campground._id);
//     //         }
//     //     });
//     // });

//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
//         if (err) {
//             req.flash("error","Something's Wrong");
//             res.redirect("/campgrounds");
//         } else {
//             req.flash("success","Photo Updated");
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });



// // DESTROY CAMPGROUND ROUTE

// router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
//     //destroy
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if (err) {
//             req.flash("error","Something's Wrong");
//             res.redirect("/campgrounds");
//         } else {
//             req.flash("success","Photo Deleted");
//             res.redirect("/campgrounds");
//         }
//     });
//     //redirect
// });
// module.exports = router;















var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
var geocoder = require('geocoder');
// INDEX - show all campgrounds
router.get('/', function(req, res){
    
    //res.render("campgrounds",{grounds:grounds});
    //get all campgrounds from db
    Campground.find({},function(err,allCampGrounds){
        if(err) {
            console.log(err);
            req.flash("error","Something's Wrong");
            res.redirect("back");
        } else {
            res.render("campgrounds/index",{grounds:allCampGrounds}); //, currentUser:req.user, page: 'campgrounds'
        }
    });
});

// NEW - create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

//SHOW - show the information of specific ground
router.get("/:id", function(req, res) {
    //find camp ground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err) {
           console.log(err);
           req.flash("error","Something's Wrong");
           res.redirect("back");
       } else {
           res.render('campgrounds/show',{campground:foundCampground});
       }
    });
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var img = req.body.img;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, img: img, description: description, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            //console.log(newlyCreated);
            res.redirect("/gallery");
        }
    });
  });
});


// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //if logged in
    //ifnot, redirect
    //if yes, if id match
    //ifnot
    Campground.findById(req.params.id,function(err,campground){
        if(err) {
            req.flash("error","Something's Wrong");
            res.redirect("/gallery");
        } else {
            res.render("campgrounds/edit",{campground:campground});
        }
    });
    
});


//UPDATE Route
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, img: req.body.img, description: req.body.description, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/gallery/" + campground._id);
        }
    });
  });
});



// DESTROY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //destroy
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            req.flash("error","Something's Wrong");
            res.redirect("/gallery");
        } else {
            req.flash("success","Photo Deleted");
            res.redirect("/gallery");
        }
    });
    //redirect
});





// middleware
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


// // middleware: check if campground author matchs current user
// function checkCampgroundOwnership(req, res, next) {
//     if (req.isAuthenticated()){
//         Campground.findById(req.params.id,function(err,campground){
//             if(err) {
//                 console.log(err);
//                 res.redirect("/campgrounds");
//             } else {
//                 //if yes, if id match
//                 if (campground.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         res.redirect("/login");
//     }
// }
module.exports = router;