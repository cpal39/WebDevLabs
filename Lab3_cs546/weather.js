/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const peoplejs=require("./people");

var axios=require('axios');

async function getWeather(){
  const { data } = await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json');
  return data;}

async function shouldTheyGoOutside(firstName,lastName){
  try{
    let people=await peoplejs.getPeople();
    let weather=await getWeather();
    if(firstName===undefined){throw "first name must exist";}
    if(typeof firstName!=='string'){throw "first name must be a string";}
    if(lastName===undefined){throw "last name must exist";}
    if(typeof lastName!=='string'){throw "last name must be a string";}
    //personSearch: singleton array of person in people.json
    let personSearch=people.filter(function(x){
      return(x.firstName.toLowerCase()===firstName.toLowerCase()
      && x.lastName.toLowerCase()===lastName.toLowerCase());});
    if(personSearch.length<1){throw "person must exist in people.json";}
    //weatherSearch: singleton array of weather with person's zip
    let weatherSearch=weather.filter(function(x){
      return(x.zip===personSearch[0].zip);});
    if(weatherSearch[0].temp>=34){
      return("Yes, "+personSearch[0].firstName+" should go outside.");}
    else{
      return("No, "+personSearch[0].firstName+" should not go outside.");}}
  catch(error){throw error;}}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getWeather,
    shouldTheyGoOutside};
