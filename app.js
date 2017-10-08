var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var flash = require("connect-flash");
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//seedDB();



var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
// __dirname = /home/ubuntu/workspace/yelpcame
// which allows using public dir even if something changed in above path
app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');
app.use(flash());
// ==========
// Passport configuration
// ==========
app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


var grounds = [
        {name: "Salmon Creek", img: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=compress,format&fit=crop&w=376&h=237&q=80&cs=tinysrgb&crop="},
        {name: "Fire", img: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop="},
        {name: "Mountain goes rest", img: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=2&auto=format&fit=crop&w=1080&h=608&q=80&cs=tinysrgb&crop="},
        {name: "Salmon Creek", img: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=compress,format&fit=crop&w=376&h=237&q=80&cs=tinysrgb&crop="},
        {name: "Fire", img: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop="},
        {name: "Mountain goes rest", img: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=2&auto=format&fit=crop&w=1080&h=608&q=80&cs=tinysrgb&crop="},
        {name: "Salmon Creek", img: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=compress,format&fit=crop&w=376&h=237&q=80&cs=tinysrgb&crop="},
        {name: "Fire", img: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop="},
        {name: "Mountain goes rest", img: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=2&auto=format&fit=crop&w=1080&h=608&q=80&cs=tinysrgb&crop="}
    ];
    
    


app.use("/",indexRoutes);
app.use("/gallery", campgroundRoutes);
app.use("/gallery/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("LumiSite Server running...");
});



//AIzaSyB3FeqLv3moPaSslfcA9Kbd2Ut6d9EmAmA