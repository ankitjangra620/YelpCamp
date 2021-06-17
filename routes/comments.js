var express=require("express"),
	router=express.Router(),
	campgrounds=require("../models/campground.js"),
	Comment=require("../models/comments.js"),
	User=require("../models/User"),
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

// ===========================
// route  to add new comments
// ===========================
    router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
		campgrounds.findById(req.params.id,function(err,camp){
			if(err)
				console.log(err)
			else
					res.render("comments/new",{campgrounds:camp})
		})
	
	})
// Creating the post route to submit the form
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
	campgrounds.findById(req.params.id,function(err,camp){
	        if(err){
				console.log(err)
				res.redirect("/campgrounds/"+req.params.id)
			}else{
				
				Comment.create(req.body.comment,function(err,comment){
					if(err)
						console.log(err)
					else{
						comment.author.id=req.user._id
						comment.author.username=req.user.username
						console.log(comment.author.username)
						comment.save()
							camp.comments.push(comment)
				camp.save()
				res.redirect("/campgrounds/"+camp._id)
					}
				})
			}
		
	})					 
})


// Edit routes

router.get("/campgrounds/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
			res.redirect("back")
		else{
			 res.render("comments/edit",{camp_id:req.params.id,foundComment:foundComment})
		}
	})
	   
})
router.put("/campgrounds/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
		if(err){
			res.redirect("back")
		}
		else{
			res.redirect("/campgrounds/"+req.params.id)
		}
			
	})
})

// Destroy campgrounds route
router.delete("/campgrounds/:id/comments/:comment_id",checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("/campgrounds/"+req.params.id)
		}
		else{
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})


// check comment ownership middleware
function checkCommentOwnership(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back")
			}
			else{
				console.log(foundComment.author.id)
					console.log(req.params.id)
				if(foundComment.author.id.equals(req.user.id)){
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
module.exports=router;

