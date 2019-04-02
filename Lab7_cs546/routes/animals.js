const express=require("express");
const router=express.Router();
const aniData=require("../data/animals");
const postData=require("../data/posts");
const collections=require("../data/collections");
const animals=collections.animals;
const posts=collections.posts;
const {ObjectId} = require('mongodb');

router.get("/",async(req,res)=>{
	try{
		const aniList=await aniData.getAll();
		const anires=[];
		for(let i=0;i<aniList.length;i++){
			let postCollection=await posts();
			let postFind=await postCollection.find({author:ObjectId(aniList[i]._id).toString()}).toArray();
			let postList=[];
			for(let j=0;j<postFind.length;j++){
				let posty={
					_id: postFind[j]._id,
					title: postFind[j].title};
				postList.push(posty);}
			let likelist=[];
			for(let k=0;k<aniList[i].likes.length;k++){
				let likeFind=await postCollection.findOne({_id: ObjectId(aniList[i].likes[k])});
				if(likeFind===null){await aniData.unlike(aniList[i]._id,aniList[i].likes[k]);}
				else{let liky={
						_id: likeFind._id,
						title: likeFind.title};
					likelist.push(liky);}}
			let anijson={
				_id: aniList[i]._id,
				name: aniList[i].name,
				animalType: aniList[i].animalType,
				likes: likelist,
				posts: postList};
			anires.push(anijson);}
		res.json(anires);
		res.status(200).send();}
	catch(e){
      res.status(404).json({ error: "No animals found" });}});

router.get("/:id",async(req,res)=>{
	try{
		const ani=await aniData.get(req.params.id);
		let postCollection=await posts();
		let postFind=await postCollection.find({author:ObjectId(ani._id).toString()}).toArray();
		let postList=[];
		for(let j=0;j<postFind.length;j++){
			let posty={
				_id: postFind[j]._id,
				title: postFind[j].title};
			postList.push(posty);}
		let likelist=[];
		for(let k=0;k<ani.likes.length;k++){
			let likeFind=await postCollection.findOne({_id: ObjectId(ani.likes[k])});
			if(likeFind===null){await aniData.unlike(ani._id,ani.likes[k]);}
			else{let liky={
					_id: likeFind._id,
					title: likeFind.title};
				likelist.push(liky);}}
		let anijson={
			_id: ani._id,
			name: ani.name,
			animalType: ani.animalType,
			likes: likelist,
			posts: postList};
		res.json(anijson);
		res.status(200).send();}
	catch(e){
      res.status(404).json({error: "No animal exists with id of "+req.params.id});}});

router.post("/",async(req,res)=>{
	try{
		let aniBody=req.body;
		if((!aniBody.name || !aniBody.animalType) ||
			(typeof aniBody.name!=="string") ||
			(typeof aniBody.animalType!=="string") ||
			(Object.keys(aniBody).length>2)){
			res.status(400).json({error:"Invalid JSON schema"});
			return;}
		let ani=await aniData.create(aniBody.name,aniBody.animalType);
		let anijson={
			_id: ani._id,
			name: ani.name,
			animalType: ani.animalType,
			likes: [],
			posts: []};
		res.json(anijson);
		res.status(200).send();}
	catch(e){res.status(400).json({error: "Could not create animal"});}});

router.put("/:id",async(req,res)=>{
	try{
		let aniBody=req.body;
		if((!aniBody.newName && !aniBody.newType) ||
			(!aniBody.newName && Object.keys(aniBody).length>=2) ||
			(!aniBody.newType && Object.keys(aniBody).length>=2) ||
			(aniBody.newName && typeof aniBody.newName!=="string") ||
			(aniBody.newType && typeof aniBody.newType!=="string") ||
			(Object.keys(aniBody).length>2)){
			res.status(400).json({error: "Invalid JSON schema"});
			return;}
		let ani=await aniData.get(req.params.id);
		if(!aniBody.newName){ani=await aniData.retype(req.params.id,aniBody.newType);}
		else if(!aniBody.newType){ani=await aniData.rename(req.params.id,aniBody.newName);}
		else{ani=await aniData.reput(req.params.id,aniBody.newName, aniBody.newType);}
		let postCollection=await posts();
		let postFind=await postCollection.find({author: ObjectId(ani._id).toString()}).toArray();
		let postList=[];
		for(let j=0;j<postFind.length;j++){
			let posty={
				_id: postFind[j]._id,
				title: postFind[j].title};
			postList.push(posty);}
		let likelist=[];
		for(let k=0;k<ani.likes.length;k++){
			let likeFind=await postCollection.findOne({_id: ObjectId(ani.likes[k])});
			if(likeFind===null){await aniData.unlike(ani._id,ani.likes[k]);}
			else{let liky={
					_id: likeFind._id,
					title: likeFind.title};
				likelist.push(liky);}}
		let anijson={
			_id: ani._id,
			name: ani.name,
			animalType: ani.animalType,
			likes: likelist,
			posts: postList};
		res.json(anijson);
		res.status(200).send();}
	catch(e){res.status(404).json({error: "No animal exists with id of "+req.params.id});}});

router.delete("/:id",async(req,res)=>{
	try{
		let ani=await aniData.get(req.params.id);
		let postCollection=await posts();
		let postFind=await postCollection.find({author:ObjectId(ani._id).toString()}).toArray();
		let postList=[];
		for(let j=0;j<postFind.length;j++){
			let posty={
				_id: postFind[j]._id,
				title: postFind[j].title};
			postList.push(posty);}
		let likelist=[];
		for(let k=0;k<ani.likes.length;k++){
			let likeFind=await postCollection.findOne({_id: ObjectId(ani.likes[k])});
			if(likeFind===null){await aniData.unlike(ani._id,ani.likes[k]);}
			else{let liky={
					_id: likeFind._id,
					title: likeFind.title};
				likelist.push(liky);}}
		let anijson={
			deleted: true,
			data:{
				_id: ani._id,
				name: ani.name,
				animalType: ani.animalType,
				likes: likelist,
				posts: postList}};
		for(let i=0;i<postList.length;i++){
			await postData.remove(postList[i]._id);}
		let bye=await aniData.remove(req.params.id);
		res.json(anijson);
		res.status(200).send();}
	catch(e){res.status(404).json({error: "No animal exists with id of "+req.params.id});}});

module.exports = router;
