/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const collections = require("./collections");

const animals = collections.animals;

async function getAll() {
	const aniCollection = await animals();
	const anis = await aniCollection.find({}).toArray();
	return anis;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const aniCollection = await animals();
  	const ani = await aniCollection.findOne({ _id: ObjectId(id) });
  	if (ani === null) {throw "No animal exists with that id";}
	return ani;}

async function create(name,animalType){
	if (!name) {throw "You must provide a name for your animal";}
	if(typeof name!=='string'){throw "Animal name must be a string";}
  	if (!animalType) {throw "You must provide the animal's type";}
	if(typeof animalType!=='string'){throw "Animal type must be a string";}
  	let newAni = {
		name: name,
		animalType: animalType};
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
  	const deleted = await aniCollection.deleteOne({_id: id});
  	if (deleted.deletedCount === 0) {
	throw "Could not delete animal with id of "+ id;}
	let res={
		deleted: true,
		data: {
			_id: id,
			name: info.name,
			animalType: info.animalType}};
	return res;}

async function rename(id, newName) {
  	if (!id) {throw "You must provide an id to search for";}
  	if (!newName) {throw "You must provide a name for your animal";}
	if(typeof newName!=='string'){throw "New name must be a string";}
  	const aniCollection = await animals();
  	const updatedInfo = await aniCollection.updateOne({ _id: id }, {$set: {name: newName}});
  	if (updatedInfo.modifiedCount === 0) {
	throw "No animal exists with that id";}
  	return await get(id);}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getAll,
    get,
    create,
    remove,
	rename};
