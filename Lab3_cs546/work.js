/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const peoplejs=require("./people");

var axios=require('axios');

async function getWork(){
  const { data } = await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json');
  return data;}

async function whereDoTheyWork(firstName,lastName){
  try{
    let people=await peoplejs.getPeople();
    let work=await getWork();
    if(firstName===undefined){throw "first name must exist";}
    if(typeof firstName!=='string'){throw "first name must be a string";}
    if(lastName===undefined){throw "last name must exist";}
    if(typeof lastName!=='string'){throw "last name must be a string";}
    //personSearch: singleton array of person in people.json
    let personSearch=people.filter(function(x){
      return(x.firstName.toLowerCase()===firstName.toLowerCase()
      && x.lastName.toLowerCase()===lastName.toLowerCase());});
    if(personSearch.length<1){throw "person must exist in people.json";}
    //workSearch: singleton array of work from person's ssn
    let workSearch=work.filter(function(x){
      return(x.ssn===personSearch[0].ssn);});
    if(workSearch[0].willBeFired===true){
      return(personSearch[0].firstName+" "+personSearch[0].lastName+
      " - "+workSearch[0].jobTitle+" at "+workSearch[0].company+
      ". They will be fired.");}
    else{
      return(personSearch[0].firstName+" "+personSearch[0].lastName+
      " - "+workSearch[0].jobTitle+" at "+workSearch[0].company+
      ". They will not be fired.");}}
  catch(error){throw error;}}

function isIP(string){
  let res='';
  let dotcount=0;
  for(let i=0;i<string.length;i++){
    if(string[i]!=='.'){res+=string[i];}
    if(res.length>3){return false;}
    if(string[i]==='.'){dotcount+=1;}
    if(string[i]==='.' || i===string.length-1){
      if(parseInt(res)>=0 && parseInt(res)<=255){
        res='';}
      else{return false;}}
    else{continue;}}
  if(dotcount!==3){return false;}
  return true;}

async function findTheHacker(ip){
  try{
    let people=await peoplejs.getPeople();
    let work=await getWork();
    if(ip===undefined){throw "ip address must exist";}
    if(!isIP(ip)){throw "ip address must be in proper format";}
    //workSearch: singleton array of work in work.json
    let workSearch=work.filter(function(x){
      return(x.ip===ip);});
    //personSearch: singleton array of person from work's ssn
    let personSearch=people.filter(function(x){
      return(x.ssn===workSearch[0].ssn);});
    return(personSearch[0].firstName+" "+personSearch[0].lastName+
      " is the hacker!");}
  catch(error){throw error;}}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    whereDoTheyWork,
    findTheHacker};
