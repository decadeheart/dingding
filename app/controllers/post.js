// var Post= require('../models/post')
// var _ =require('underscore')


// exports.detail=function(req,res){
// 	var id=req.params.id
// 	Post.update({_id:id},{$inc:{pv:1}},function(err){
// 		if(err){
// 			console.log(err)
// 		}
// 	})
// }

// exports.new=function(req,res){
// 	res.render('post',{
// 		title:'后台录入',
// 		post:{
// 			title:'',
// 			writer:'',
// 			text:''
// 		}
// 	})
// }
// exports.update=function(req,res){
// 	var id=req.params.id
// 	if(id){
// 		Post.findById(id,function(err,post){
// 			res.render('post',{
// 				title:'后台更新',
// 				post:post,
// 			})
// 		})
// 	}
// }

// exports.save=function(req,res){
// 	var id= req.body.post._id
// 	var postObj=req.body.post
// 	var _post
// 	if(id){
// 		Post.findById(id,function(err,post){
// 			if(err){
// 				console.log(err)
// 			}
// 			_post=_.extend(post,postObj)
// 			_post.save(function(err,post){
// 				if(err){
// 					console.log(err)
// 				}
// 				res.redirect('/post/'+post._id)
// 			})
// 		})
// 	}else{
// 		_post=new Post(postObj)
// 		console.log(movieObj);
// 		_post.save(function(err,post){
// 			if(err){
// 				console.log(err)
// 			}
// 		})
// 	}
// }
// exports.list=function(req,res){
// 	Post.find({})
// 		.populate('title')
// 		.exec(function(err,post){
// 			if(err){
// 				console.log(err)
// 			}
// 			res.render('post_list',{
// 				title:'列表页',
// 				posts:posts
// 			})
// 		})
// }
