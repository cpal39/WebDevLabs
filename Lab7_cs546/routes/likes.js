const express=require("express");
const router=express.Router();
const aniData=require("../data/animals");
const postData=require("../data/posts");
const collections=require("../data/collections");
const animals=collections.animals;
const posts=collections.posts;
const {ObjectId} = require('mongodb');

router.post("/:id",async(req,res)=>{
	try{
		let anid=req.params.id;
		let postid=req.param('postId');
		let aniCollection=await animals();
		let ani=await aniCollection.findOne({_id:ObjectId(anid)});
		let postCollection=await posts();
		let postFind=await postCollection.findOne({_id:ObjectId(postid)});
		if(ani===null){
			res.status(404).json({error: "No animal exists with id of "+anid});
			return;}
		if(postFind===null){
			res.status(404).json({error: "No post exists with id of "+postid});
			return;}
		if(ani.likes.indexOf(postid)===-1 && postFind!==null){
		await aniData.like(anid,postid);}
		res.status(200).send("OK");}
	catch(e){res.status(404).json({error: "Could not like post"});}});

router.delete("/:id",async(req,res)=>{
	try{
		let anid=req.params.id;
		let postid=req.param('postId');
		let aniCollection=await animals();
		let ani=await aniCollection.findOne({_id:ObjectId(anid)});
		let postCollection=await posts();
		let postFind=await postCollection.findOne({_id:ObjectId(postid)});
		if(ani===null){
			res.status(404).json({error: "No animal exists with id of "+anid});
			return;}
		if(postFind===null){
			res.status(404).json({error: "No post exists with id of "+postid});
			return;}
		if(ani.likes.indexOf(postid)!==-1 && postFind!==null){
		await aniData.unlike(anid,postid);}
		res.status(200).send("OK");}
	catch(e){res.status(404).json({error: "Could not unlike post"});}});

module.exports = router;
