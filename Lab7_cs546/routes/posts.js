const express=require("express");
const router=express.Router();
const aniData=require("../data/animals");
const postData=require("../data/posts");
const collections=require("../data/collections");
const animals=collections.animals;
const {ObjectId} = require('mongodb');

router.get("/",async(req,res)=>{
	try{
		const postList=await postData.getAll();
		const postres=[];
		for(let i=0;i<postList.length;i++){
			let aniCollection=await animals();
			let aniFind=await aniCollection.findOne({_id:  ObjectId(postList[i].author)});
			let postjson={
				_id: postList[i]._id,
				title: postList[i].title,
				content: postList[i].content,
				author: {
					_id: aniFind._id,
					name: aniFind.name}};
			postres.push(postjson);}
		res.json(postres);
		res.status(200).send();}
	catch(e){
      res.status(404).json({ error: "No posts found" });}});

router.get("/:id",async(req,res)=>{
	try{
		let post=await postData.read(req.params.id);
		let aniCollection=await animals();
		let aniFind=await aniCollection.findOne({_id:  ObjectId(post.author)});
		let postjson={
			_id: post._id,
			title: post.title,
			content: post.content,
			author: {
				_id: aniFind._id,
				name: aniFind.name}};
		res.json(postjson);
		res.status(200).send();}
	catch(e){
      res.status(404).json({error: "No post exists with id of "+req.params.id});}});

router.post("/",async(req,res)=>{
	try{
		let poBody=req.body;
		if((!poBody.title || !poBody.author || !poBody.content) ||
			typeof poBody.title!=="string" ||
			typeof poBody.content!=="string" ||
			Object.keys(poBody).length>3) {
			res.status(400).json({error: "Invalid JSON schema"});
			return;}
			let aniCollection=await animals();
			let aniFind=await aniCollection.findOne({_id:  ObjectId(poBody.author)});
			if(aniFind===null){
				res.status(400).json({error: "No animal exists with id of "+poBody.author});
				return;}
		let po=await postData.create(poBody.title,poBody.author,poBody.content);
		let postjson={
			_id: po._id,
			title: po.title,
			content: po.content,
			author: {
				_id: aniFind._id,
				name: aniFind.name}};
		res.json(postjson);
		res.status(200).send();}
	catch(e){res.status(400).json({error: "Could not create post"});}});

router.put("/:id",async(req,res)=>{
	try{
		let poBody=req.body;
		if((!poBody.newTitle && !poBody.newContent) ||
			(!poBody.newTitle && Object.keys(poBody).length>=2) ||
			(!poBody.newContent && Object.keys(poBody).length>=2) ||
			(poBody.newTitle && typeof poBody.newTitle!=="string") ||
			(poBody.newContent && typeof poBody.newContent!=="string") ||
			(Object.keys(poBody).length>2)){
			res.status(400).json({error: "Invalid JSON schema"});
			return;}
		let po=await postData.read(req.params.id);
		if(!poBody.newTitle){po=await postData.recon(req.params.id,poBody.newContent);}
		else if(!poBody.newContent){po=await postData.retitle(req.params.id,poBody.newTitle);}
		else{po=await postData.reput(req.params.id,poBody.newTitle, poBody.newContent);}
		let aniFind=await aniData.get(po.author);
		let postjson={
			_id: po._id,
			title: po.title,
			content: po.content,
			author: {
				_id: aniFind._id,
				name: aniFind.name}};
		res.json(postjson);
		res.status(200).send();}
	catch(e){res.status(404).json({error: "No post exists with id of "+req.params.id});}});

router.delete("/:id",async(req,res)=>{
	try{
		let po=await postData.read(req.params.id);
		let aniFind=await aniData.get(po.author);
		let postjson={
			deleted: true,
			data:{
				_id: po._id,
				title: po.title,
				content: po.content,
				author: {
					_id: aniFind._id,
					name: aniFind.name}}};
		let bye=await postData.remove(req.params.id);
		res.json(postjson);
		res.status(200).send();}
	catch(e){res.status(404).json({error: "No post exists with id of "+req.params.id});}});

module.exports = router;
