var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
	mongoose   =require("mongoose"),
	campgrounds=require("./models/campground"),
	Comment=require("./models/comments"),
    seedDB=require("./seeds"),
	passport=require("passport"),                                     
	LocalStratergy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User=require("./models/User"),
	campgroundRoutes=require("./routes/campgrounds"),
    commentRoutes=require("./routes/comments"),
	authRoutes=require("./routes/User"),
	methodOverride=require("method-override")

	
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(require("express-session")({
	secret:"Nice Rusty",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req,res,next){
	res.locals.currentUser=req.user
	next()
})
app.use(campgroundRoutes)
app.use(commentRoutes)
app.use(authRoutes)

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

seedDB();
// var campgrounds=[
// 	{
// 		name:"Salmon Creek",
// 		image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/04/12185602/Lagotto-Romangolo-Tongue-Out.jpg"
// 	},
// 	{
// 		name:"Salmon Creek",
// 		image:"https://www.photosforclass.com/download/px_1230302"
// 	},
// 	{
// 		name:"Salmon Creek",
// 		image:"https://www.photosforclass.com/download/px_6757"
// 	},
// 	{
// 		name:"Salmon Creek",
// 		image:"https://www.photosforclass.com/download/px_6757"
// 	},
// 	{
// 		name:"Salmon Creek",
// 		image:"https://www.photosforclass.com/download/px_6757"
// 	}
// ]





// campgrounds.create({
// 	name:"Ankit",
// 	image:"https://www.photosforclass.com/download/px_6757"
// })
app.get("/",function(req,res){
	res.render("campgrounds/landing")
})
// app.get("/campgrounds",function(req,res){
// 	campgrounds.find({},function(err,camp){
// 		if(err)
// 			console.log(err)
// 		else
// 			 res.render("campgrounds/campgrounds",{campgrounds:camp})  
// 	})
	
// })
// app.get("/campgrounds/new",function(req,res){
// 	res.render("campgrounds/new");
// })
// app.get("/campgrounds/:id",function(req,res){
// 	campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
//         if(err)
// 			console.log(err)
// 		else
// 			res.render("campgrounds/show",{camp:foundCamp})
// 	})
// })

// app.post("/campgrounds",function(req,res){
// 	var name=req.body.name;
// 	var img=req.body.image
//     var disc=req.body.description
// 	var z={
// 		name:name,
// 		image:img,
// 		description:disc
// 	}
//     campgrounds.create(z,function(err){
// 		if(err)
// 			console.log(err)
// 		else
// 			res.redirect("/campgrounds")
// 	})
	
// 		 })
// // route  to add new comments
//     app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
// 		campgrounds.findById(req.params.id,function(err,camp){
// 			if(err)
// 				console.log(err)
// 			else
// 					res.render("comments/new",{campgrounds:camp})
// 		})
	
// 	})
// // Creating the post route to submit the form
// app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
// 	campgrounds.findById(req.params.id,function(err,camp){
// 	        if(err){
// 				console.log(err)
// 				res.redirect("/campgrounds/"+req.params.id)
// 			}else{
// 				Comment.create(req.body.comment,function(err,comment){
// 					if(err)
// 						console.log(err)
// 					else{
// 							camp.comments.push(comment)
// 				camp.save()
// 				res.redirect("/campgrounds/"+camp._id)
// 					}
// 				})
// 			}
		
// 	})					 
// })



// ===================
// Making the registration routes
// ===================

// app.get("/register",function(req,res){
// 	res.render("register")

// })

// app.post("/register",function(req,res){
// User.register(new User({username:req.body.username}),req.body.password,function(err,User){
//          if(err){
//          console.log(err)
//          return res.render("register")
//          }	
//          passport.authenticate("local")(req,res,function(){
//          res.redirect("/campgrounds")
//          })
// })
// })


// // ===============
// // Login
// app.get("/login",function(req,res){
// 	res.render("login")
// })
// app.post("/login",passport.authenticate("local",{
// 										successRedirect:"/campgrounds",
// 										failureRedirect:"/login"
										
// }),function(req,res){})


// // ===========
// // Log out routes
// app.get("/logout",isLoggedIn,function(req,res){
// 	req.logout()
// 	res.redirect("/")
// })

app.listen(process.env.PORT,process.env.IP);