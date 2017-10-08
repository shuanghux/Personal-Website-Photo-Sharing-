var mongoose = require("mongoose");

var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
        {name: "Salmon Creek", description:"Salmon....", img: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=compress,format&fit=crop&w=376&h=237&q=80&cs=tinysrgb&crop="},
        {name: "Fire",description:"fire....", img: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop="},
        {name: "Mountain goes rest", description:"rest....", img: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=2&auto=format&fit=crop&w=1080&h=608&q=80&cs=tinysrgb&crop="},
    ]
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        
        
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             Comment.create(
        //                 {
        //                     text:"Great,Internet",
        //                     author:"homer"
        //                 }, function(err,comment){
        //                     if (err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // })
    });
}



module.exports = seedDB;