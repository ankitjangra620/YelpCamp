var express=require("express"),
	router=express.Router(),
	campgrounds=require("../models/campground.js"),
	Comment=require("../models/comments.js"),
	passport=require("passport"),                                     
	LocalStratergy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User=require("../models/User.js")
	

// ==============
// Is Logged In
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
	        return next();
	   }
	else{
		res.redirect("/login")
	}
}



router.get("/register",function(req,res){
	res.render("register")

})

router.post("/register",function(req,res){
User.register(new User({username:req.body.username}),req.body.password,function(err,User){
         if(err){
         console.log(err)
         return res.render("register")
         }	
         passport.authenticate("local")(req,res,function(){
         res.redirect("/campgrounds")
         })
})
})


// ===============
// Login
router.get("/login",function(req,res){
	res.render("login")
})
	router.post("/login",passport.authenticate("local",{
										successRedirect:"/campgrounds",
										failureRedirect:"/login"
										
}),function(req,res){})


// ===========
// Log out routes
router.get("/logout",isLoggedIn,function(req,res){
	req.logout()
	res.redirect("/")
})


module.exports=router;

