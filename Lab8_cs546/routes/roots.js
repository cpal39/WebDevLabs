const express = require("express");
const router = express.Router();
var axios=require('axios');

async function getPeople(){
	const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
	return data;}

router.post("/search/", async(req, res) => {
	try{
		if(!req.body.personName){
			res.status(400).render("../views/peeps/badpeep",{title: "Error 400"});return;}
		let name = req.body.personName;
		let people=await getPeople();
		let peeplist=[];
		for(let i=0,j=0;i<people.length && j<20;i++){
			let fullname=people[i].firstName+" "+people[i].lastName;
			if(people[i].firstName.toLowerCase().includes(name.toLowerCase()) || people[i].lastName.toLowerCase().includes(name.toLowerCase()) || fullname.toLowerCase()===name.toLowerCase())
			{peeplist.push(people[i]);j++;}}
		if(peeplist.length>0){res.render("../views/peeps/foundpeeps",{title: "People Found", personName: name, person: peeplist});}
		else{res.render("../views/peeps/nopeeps",{title: "People Found", personName: name});}}
	catch(e){res.status(404).json({error: "Could not complete request"});}
});

router.get("/details/:id", async(req, res) => {
	try{
		let people=await getPeople();
		let peep=people[req.params.id-1];
		let peeplist=[];
		let name=peep.firstName+" "+peep.lastName;
		peeplist.push(peep);
		res.render("../views/peeps/onepeep",{title: "Person Found", personName: name, person: peeplist});}
	catch(e){res.status(404).json({error: "Could not complete request"});}
});

module.exports = router;
