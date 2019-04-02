/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const peoplejs = require("./people");

const weatherjs = require("./weather");

const workjs = require("./work");

async function main(){
  try{const x=await peoplejs.getPersonById(43);
    console.log(x);}//Brew Peat
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById(13);
    console.log(x);}//Hadaway
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById(1);
    console.log(x);}//Herley
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById(500);
    console.log(x);}//Elland
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById(-1);
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById(1000);
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.getPersonById();
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.lexIndex(2);
    console.log(x);}//Dermot Abberley
  catch(e){console.log(e);}
  try{const x=await peoplejs.lexIndex(-1);
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.lexIndex(1000);
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.lexIndex();
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await peoplejs.firstNameMetrics();
    console.log(x);}//2982,1237,1745,Constantine,Vi
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside("Scotty","Barajaz");
    console.log(x);}//yeah
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside("calli","ondrasek");
    console.log(x);}//no
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside("Chris","crauford");
    console.log(x);}//no
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside();
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside("Bob");
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await weatherjs.shouldTheyGoOutside("Bob","Smith");
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork("Demetra","Durrand");
    console.log(x);}//Nuclear,Buzzshare,fired
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork("hank","tarling");
    console.log(x);}//Tech,Babblelab,safe
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork("chris","Crauford");
    console.log(x);}//Engineer,Twitterlist,safe
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork();
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork("Bob");
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await workjs.whereDoTheyWork("Bob","Smith");
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await workjs.findTheHacker("79.222.167.180");
    console.log(x);}//Robert Herley
  catch(e){console.log(e);}
  try{const x=await workjs.findTheHacker("11.126.179.152");
    console.log(x);}//Tam Falvey
  catch(e){console.log(e);}
  try{const x=await workjs.findTheHacker("lol");
    console.log(x);}//error
  catch(e){console.log(e);}
  try{const x=await workjs.findTheHacker();
    console.log(x);}//error
  catch(e){console.log(e);}}

main();
