const collections = require("./collections");
const posts = collections.posts;
const {ObjectId} = require('mongodb');

async function getAll() {
	const postCollection = await posts();
	const postList = await postCollection.find({}).toArray();
	return postList;}

async function read(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const postCollection = await posts();
  	const post = await postCollection.findOne({ _id: ObjectId(id)});
  	if (post === null) {throw "No post exists with that id";}
	return post;}

async function create(title,author,content){
	if (!title) {throw "You must provide a title for your post";}
	if(typeof title!=='string'){throw "Post title must be a string";}
	if (!author) {throw "You must provide an author for your post";}
	if (!content) {throw "You must provide content for your post";}
	let newPost={
		title: title,
		author: author,
		content: content};
	const postCollection=await posts();
	const insertInfo=await postCollection.insertOne(newPost);
	if(insertInfo.insertedCount===0){throw "Could not add post";}
	const newId=insertInfo.insertedId;
	const post=await read(newId);
	return post;}

async function update(id,title,author,content){
  	if (!id) {throw "You must provide an id to search for";}
	if (!title) {throw "You must provide a title for your post";}
	if(typeof title!=='string'){throw "Post title must be a string";}
	if (!author) {throw "You must provide an author for your post";}
	if (!content) {throw "You must provide content for your post";}
	const postCollection=await posts();
	const updatedInfo=await postCollection.updateOne({_id:ObjectId(id)},
		{$set: {title: title, author: author, content:content}});
	//if (updatedInfo.modifiedCount===0){throw "Could not update post with id of "+id;}
	return await read(id);}

async function remove(id){
	if (!id) {throw "You must provide an id to search for";}
  	const postCollection = await posts();
	const info=await read(id);
	const deleted=await postCollection.deleteOne({_id:ObjectId(id)});
	if(deleted.deletedCount===0){
		throw "Could not delete post with id of "+id;}
	let res={
		deleted: true,
		data:{
			_id: id,
			title: info.title,
			author: info.author,
			content: info.content}};
	return res;}

async function retitle(id, newTitle) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newTitle) {throw "You must provide a title for your post";}
	if(typeof newTitle!=='string'){throw "New title must be a string";}
  	const postCollection = await posts();
  	const updatedInfo = await postCollection.updateOne({ _id: ObjectId(id) },
		{$set: {title: newTitle}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No post exists with that id";}*/
  	return await read(id);}

async function recon(id, newCon) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newCon) {throw "You must provide content for your post";}
	if(typeof newCon!=='string'){throw "New content must be a string";}
  	const postCollection = await posts();
  	const updatedInfo = await postCollection.updateOne({ _id: ObjectId(id) },
		{$set: {content: newCon}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No post exists with that id";}*/
  	return await read(id);}

async function reput(id, newTitle, newCon) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newTitle) {throw "You must provide a title for your post";}
	if(typeof newTitle!=='string'){throw "New title must be a string";}
	if (!newCon) {throw "You must provide content for your post";}
	if(typeof newCon!=='string'){throw "New content must be a string";}
  	const postCollection = await posts();
  	const updatedInfo = await postCollection.updateOne({ _id: ObjectId(id) },
		{$set: {title: newTitle, content: newCon}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No post exists with that id";}*/
  	return await read(id);}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
	getAll,
    read,
    create,
    update,
    remove,
	retitle,
	recon,
	reput};
