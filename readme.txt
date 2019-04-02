# WebDevLabs
Collection of labs for graduate course CS546: Web Programming at Stevens Institute of Technology
Lab 3: using async functions and axios to work between 3 different datasets (people, weather, work)
	• people.js
		• getPersonById(id): returns person at the specified id
		• lexIndex(index): lexicographically sorts people dataset and returns the person's full name at the index 		    specified
		• firstNameMetrics(): returns total number of letters, total number of vowels, total number of consonants, 	             longest name, and shortest name in the people dataset (using first names)
	• weather.js
		•shouldTheyGoOutside(firstName,lastName): given a first and last name, returns whether that person should go 		      outside based on the temperature at their zip code
	• work.js
		•whereDoTheyWork(firstName, lastName):given a first and last name, use information from both the people                        dataset and the work dataset to find where the person works, what his/her position is, and whether 			 he/she will be fired
		•findTheHacker(ip): work within the people and work datasets to find the hacker given an ip address
Lab 4: using mongodb to create an animal database
	• create(name, animalType): creates a new animal in the database
	• getAll(): returns all animals in the database
	• get(id): returns the animal with the specified id
	• remove(id): removes the animal with the specified id from the database
	• rename(id,newName): renames the animal with the specified id
Lab 7: using mongodb and express to expand the animal database and create a 12 route API server
	• GET /animals: getting this route will return a list of all animals in the system
	• POST /animals: will create a new animal in the system from the given request body {"animalName":"","animalType":""}
	• GET /animals/{id}: returns the animal with the specified id
	• PUT /animals/{id}: updates animal with the speicifed id with a new name and/or type based on the given request body
	  {"newName": "new name", "newType": "new type"}
	• DELETE /animals/{id}: removes the animal with the specified id from the database and removes all posts made by that           animal
	• GET /posts: returns a list of all posts in the system
	• POST /posts: creates a new post in the database from the given request body {"title":"","author":"","content":""}
	• GET /posts/{id}: return the post with the given id
	• PUT /posts/{id}: updates the post with the specified id with a new title and/or content based on the given request             body {"newTitle": "new title", "newContent":"new content"}
	• DELETE /posts{id}: removes the post with the specified id from the database
	• POST /likes/{animalId}?postId={postId}: has the animal with the specified id, like the specified post
	• DELETE /likes/{animalId}?postId={postId}: has the specified animal unlike the specified post
Lab 8: using HTML, CSS, and Handlebars to make a simple templated web application
	• searches through the people dataset from lab 4
	• users submit the person they are looking for through a form on the homepage, and a list of up to 20 people is                 returned
	• clicking on a person from this list will show more information about them

*all functions and routes are properly error checked
