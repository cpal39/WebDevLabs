/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

var axios=require('axios');

async function getPeople(){
  const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  return data;}

async function getPersonById(id){
  try{
    let people=await getPeople();
    if(id===undefined){throw "index must exist";}
    if(!Number.isInteger(id)){throw "index must be an integer";}
    if(id<1 || id>people.length){throw "index must be within bounds";}
    return(people[id-1].firstName+" "+people[id-1].lastName);}
  catch(error){throw error;}}

async function lexIndex(index){
  try{
    let people=await getPeople();
    if(index===undefined){throw "index must exist";}
    if(!Number.isInteger(index)){throw "index must be an integer";}
    if(index<0 || index>people.length-1){throw "index must be within bounds";}
    people=people.sort(function(a,b){
      if(a.lastName<b.lastName){return -1;}
      if(a.lastName>b.lastName){return 1;}
      else{return 0;}});
    return(people[index].firstName+" "+
      people[index].lastName);}
  catch(error){throw error;}}

async function firstNameMetrics(){
  try{
    let people=await getPeople();
    let vowels=['a','e','i','o','u'];
    let res={
      totalLetters:0,
      totalVowels:0,
      totalConsonants:0,
      longestName:"",
      shortestName:""};
    for(let i=0;i<people.length;i++){
      res.totalLetters+=people[i].firstName.length;
      for(let j=0;j<people[i].firstName.length;j++){
        if(vowels.includes(people[i].firstName.charAt(j).toLowerCase()))
          {res.totalVowels+=1;}
        else{res.totalConsonants+=1;}}
      if(i===0){
        res.longestName=people[i].firstName;
        res.shortestName=people[i].firstName;}
      if(people[i].firstName.length>=res.longestName.length){
        res.longestName=people[i].firstName;}
      if(people[i].firstName.length<=res.shortestName.length){
        res.shortestName=people[i].firstName;}}
    return(res);}
  catch(error){throw error;}}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getPeople,
    getPersonById,
    lexIndex,
    firstNameMetrics};
