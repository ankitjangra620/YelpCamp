var mongoose=require("mongoose")
var Campground=require("./models/campground")
var Comment=require("./models/comments")
var data=[
// 	{
// 		title:"Manali",
// 		image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
// 		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in risus vitae porta. Nam id dui sodales, ultrices mi vitae, ullamcorper enim. Etiam finibus, nibh non sagittis malesuada, lectus sapien malesuada mi, consequat placerat lectus sapien nec mauris. Nam diam mauris, feugiat eu nibh consequat, molestie ullamcorper quam. Duis nec egestas tortor. Aenean ut magna nec lacus sodales consequat a sit amet ante. Donec arcu tellus, lobortis vel diam non, molestie placerat ipsum. Maecenas congue lobortis arcu nec pulvinar. Morbi nibh enim, pulvinar ut porta id, vehicula nec sapien.Vivamus eget nulla ac tellus consequat consectetur. Fusce aliquam efficitur sem et tempor. Nam malesuada gravida justo, vel posuere diam commodo sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ut laoreet nisi, et vestibulum enim. Fusce placerat augue risus, vitae venenatis mauris sollicitudin ut. Curabitur laoreet urna maximus fermentum posuere. Cras condimentum rutrum arcu vitae placerat. Pellentesque eleifend felis eget nibh sodales, eget lobortis enim sagittis. Quisque hendrerit ipsum quam, et mollis sapien porta venenatis.Morbi efficitur purus eu ex auctor pulvinar. Ut in consectetur augue, at hendrerit libero. Pellentesque ante ipsum, sagittis vel vulputate eget, sollicitudin a justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur at pellentesque neque. Donec maximus vehicula egestas. Maecenas a turpis libero. Suspendisse potenti. Fusce sed est in ipsum tempor malesuada. Vestibulum pharetra gravida iaculis. Donec ullamcorper tincidunt faucibus. Praesent commodo, nisl sed interdum iaculis, erat tellus consectetur tellus, in ullamcorper dolor sem ac erat. Vestibulum non sagittis ipsum, eget ultrices dolor. Vivamus et tincidunt lacus."
// 	},
// 	{
// 	title:"Montana",
// 		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsPZggo_tEG-bVou2IY4JYzGfPI7QtLKwHRA&usqp=CAU",
// 		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in risus vitae porta. Nam id dui sodales, ultrices mi vitae, ullamcorper enim. Etiam finibus, nibh non sagittis malesuada, lectus sapien malesuada mi, consequat placerat lectus sapien nec mauris. Nam diam mauris, feugiat eu nibh consequat, molestie ullamcorper quam. Duis nec egestas tortor. Aenean ut magna nec lacus sodales consequat a sit amet ante. Donec arcu tellus, lobortis vel diam non, molestie placerat ipsum. Maecenas congue lobortis arcu nec pulvinar. Morbi nibh enim, pulvinar ut porta id, vehicula nec sapien.Vivamus eget nulla ac tellus consequat consectetur."
	
// 	},
// 	{
// 	    title:"Hauz",
// 		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFRMXcH6w09mpoQpvDwzIIM-_oezBUYnq2TA&usqp=CAU",
// 		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in risus vitae porta. Nam id dui sodales, ultrices mi vitae, ullamcorper enim. Etiam finibus, nibh non sagittis malesuada, lectus sapien malesuada mi, consequat placerat lectus sapien nec mauris. Nam diam mauris, feugiat eu nibh consequat, molestie ullamcorper quam. Duis nec egestas tortor. Aenean ut magna nec lacus sodales consequat a sit amet ante. Donec arcu tellus, lobortis vel diam non, molestie placerat ipsum. Maecenas congue lobortis arcu nec pulvinar. Morbi nibh enim, pulvinar ut porta id, vehicula nec sapien.Vivamus eget nulla ac tellus consequat consectetur."
// 	}
]
// Making the function seeding the DataBase
function seedDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err)
		}
		else{
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err)
					console.log(err)
				else{
					// console.log(camp)
					Comment.create({
						text:"It is really nice",
						author:"Sarena"
					},function(err,comment){
						if(err)
							console.log(err)
						else{
							campground.comments.push(comment);
							campground.save()
							// console.log(campground)
							
						}
					})
					
				}
			})
		})
		}
					 
	})
	
}



// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//          //add a few campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("added a campground");
//                     //create a comment
//                     Comment.create(
//                         {
//                             text: "This place is great, but I wish there was internet",
//                             author: "Homer"
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("Created new comment");
//                             }
//                         });
//                 }
//             });
//         });
//     }); 
// }
module.exports = seedDB;