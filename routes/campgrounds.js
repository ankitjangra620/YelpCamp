var express=require("express"),
	router=express.Router(),
	campgrounds=require("../models/campground.js"),
	methodOverride=require("method-override")
router.use(methodOverride("_method"))


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


router.put("/campgrounds/:id/edit/update",checkCampgroundOwnership, function(req, res){
var z={
	title:req.body.title,
	image:req.body.image,
	description:req.body.description
}
	campgrounds.findByIdAndUpdate(req.params.id,z, function(err, updatedCampground){
	if(err){
	res.redirect("/campgrounds");
	} else {
	//redirect somewhere(show page)
	res.redirect("/campgrounds/" + req.params.id);
	}
	});
	
})


// all campgrounds routes

router.get("/campgrounds",function(req,res){
	campgrounds.find({},function(err,camp){
		if(err)
			console.log(err)
		else
			 res.render("campgrounds/campgrounds",{campgrounds:camp})  
	})
	
})
router.get("/campgrounds/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})
router.get("/campgrounds/:id",function(req,res){
	campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err)
			console.log(err)
		else
			res.render("campgrounds/show",{camp:foundCamp})
	})
})

router.post("/campgrounds",isLoggedIn,function(req,res){
	var name=req.body.name;
	var img=req.body.image
    var disc=req.body.description
	var z={
		title:name,
		image:img,
		description:disc,
		author:{
			id:req.user._id,
			username:req.user.username
		}
	}
    campgrounds.create(z,function(err,camp){
		if(err)
			console.log(err)
		else
			res.redirect("/campgrounds")
		
	})
	
		 })


// Edit routes

router.get("/campgrounds/:id/edit",checkCampgroundOwnership,function(req,res){
	campgrounds.findById(req.params.id,function(err,foundCamp){
        if(err)
			console.log(err)
		else
			res.render("campgrounds/edit",{camp:foundCamp})
	})
})

// Update route



// Delete routes
router.delete("/campgrounds/:id",checkCampgroundOwnership,function(req,res){
	campgrounds.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.redirect("/campgrounds")
		else
			res.redirect("/campgrounds")
	})
})



function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated()){
		campgrounds.findById(req.params.id,function(err,foundCamp){
			if(err){
				res.redirect("back")
			}
			else{
				console.log(foundCamp.author.id)
					console.log(req.params.id)
				if(foundCamp.author.id.equals(req.user.id)){
					next();
				}
				else{
					res.send("You don't have permission to do that")
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
}



module.exports=router