const collections = require("./collections");
const animals = collections.animals;
const posts=collections.posts;
const {ObjectId} = require('mongodb');

async function getAll() {
	const aniCollection = await animals();
	const anis = await aniCollection.find({}).toArray();
	return anis;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const aniCollection = await animals();
  	const ani = await aniCollection.findOne({ _id: ObjectId(id)});
  	if (ani === null) {throw "No animal exists with that id";}
	return ani;}

async function create(name,animalType){
	if (!name) {throw "You must provide a name for your animal";}
	if(typeof name!=='string'){throw "Animal name must be a string";}
  	if (!animalType) {throw "You must provide the animal's type";}
	if(typeof animalType!=='string'){throw "Animal type must be a string";}
  	let newAni = {
		name: name,
		animalType: animalType,
		likes: []};
  	const aniCollection=await animals();
  	const insertInfo = await aniCollection.insertOne(newAni);
  	if (insertInfo.insertedCount === 0) {throw "Could not add animal";}
  	const newId = insertInfo.insertedId;
  	const ani = await get(newId);
  	return ani;}

async function remove(id) {
	if (!id) {throw "You must provide an id to search for";}
  	const aniCollection = await animals();
	const info=await get(id);
  	const deleted = await aniCollection.deleteOne({_id: ObjectId(id)});
  	if (deleted.deletedCount === 0) {
	throw "Could not delete animal with id of "+ id;}
	let res={
		deleted: true,
		data: {
			_id: id,
			name: info.name,
			animalType: info.animalType,
			likes: info.likes}};
	return res;}

async function rename(id, newName) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newName) {throw "You must provide a name for your animal";}
	if(typeof newName!=='string'){throw "New name must be a string";}
  	const aniCollection = await animals();
  	const updatedInfo = await aniCollection.updateOne({ _id: ObjectId(id) },
		{$set: {name: newName}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No animal exists with that id";}*/
  	return await get(id);}

async function retype(id, newType) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newType) {throw "You must provide a type for your animal";}
	if(typeof newType!=='string'){throw "New type must be a string";}
  	const aniCollection = await animals();
  	const updatedInfo = await aniCollection.updateOne({ _id: ObjectId(id) },
		{$set: {animalType: newType}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No animal exists with that id";}*/
  	return await get(id);}

async function reput(id, newName, newType) {
  	if (!id) {throw "You must provide an id to search for";}
	if (!newName) {throw "You must provide a name for your animal";}
	if(typeof newName!=='string'){throw "New name must be a string";}
  	if (!newType) {throw "You must provide a type for your animal";}
	if(typeof newType!=='string'){throw "New type must be a string";}
  	const aniCollection = await animals();
  	const updatedInfo = await aniCollection.updateOne({ _id: ObjectId(id) },
		{$set: {name: newName,animalType: newType}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "No animal exists with that id";}*/
  	return await get(id);}

async function like(aid,pid){
	if(!aid){throw "you must provide the id of the animal liking the post"}
	if(!pid){throw "you must provide the id of the post to like"}
	const ani=await get(aid);
	let likes=ani.likes;
	if(likes.indexOf(pid)!==-1){throw "animal has already liked post";}
	let postCollection=await posts();
	let postFind=await postCollection.find({_id:ObjectId(pid)}).toArray();
	if(postFind.length>0){likes.push(pid);}
	const aniCollection = await animals();
	const updatedInfo = await aniCollection.updateOne({ _id: ObjectId(aid) },
		{$set: {likes: likes}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "Animal could not like post";}*/
  	return await get(aid);}

async function unlike(aid,pid){
	if(!aid){throw "you must provide the id of the animal unliking the post"}
	if(!pid){throw "you must provide the id of the post to unlike"}
	const ani=await get(aid);
	let likes=ani.likes;
	let index=likes.indexOf(pid);
	if(index!==-1){likes.splice(index,1);}
	const aniCollection = await animals();
	const updatedInfo = await aniCollection.updateOne({ _id: ObjectId(aid) },
		{$set: {likes: likes}});
  	/*if (updatedInfo.modifiedCount === 0) {
	throw "Animal could not unlike post";}*/
  	return await get(aid);}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getAll,
    get,
    create,
    remove,
	rename,
	retype,
	reput,
	like,
	unlike};
