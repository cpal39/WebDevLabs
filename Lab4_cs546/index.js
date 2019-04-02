/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const animals=require("./data/animals");

const connection=require("./data/connection");

async function main(){
	try{var sasha=await animals.create("Sasha","Dog");
		console.log(sasha);}
	catch(e){console.log(e);}
	try{var lucy=await animals.create("Lucy","Dog");}
	catch(e){console.log(e);}
	try{const all=await animals.getAll();
		console.log(all);}
	catch(e){console.log(e);}
	try{const duke=await animals.create("Duke","Walrus");
		console.log(duke);}
	catch(e){console.log(e);}
	try{const sashita=await animals.rename(sasha._id,"Sashita");
		console.log(sashita);}
	catch(e){console.log(e);}
	try{const byeLucy=await animals.remove(lucy._id);}
	catch(e){console.log(e);}
	try{const all=await animals.getAll();
		console.log(all);}
	catch(e){console.log(e);}
	const db=await connection();
	await db.serverConfig.close();}

main().catch(error=>{console.log(error);});
