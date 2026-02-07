const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  return res.status(200).json(friends);

});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  if(friends[email]){
    return res.status(200).json(friends[email]);
  } else {
    return res.status(404).json({message: "Friend not found"});
  };
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  const {email, firstName, lastName, DOB} = req.body;
  if(email && firstName && lastName && DOB){
    if(friends[email]){
      return res.status(400).json({message: "Friend with this email already exists"});
    } else {
      friends[email] = {firstName, lastName, DOB};
      return res.status(201).json({message: "the user " + (firstName)+ " added successfully"});
    }
  } else {
    return res.status(400).json({message: "Missing required fields"});
  }
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const {firstName, lastName, DOB} = req.body;
  if(friends[email]){
    if(firstName) friends[email].firstName = firstName;
    if(lastName) friends[email].lastName = lastName;
    if(DOB) friends[email].DOB = DOB;
    return res.status(200).json({message: "Friend details updated successfully"});
  } else {
    return res.status(404).json({message: "Friend not found"});
  };
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if(friends[email]){
    delete friends[email];
    return res.status(200).json({message: "Friend deleted successfully"});
  } else {
    return res.status(404).json({message: "Friend not found"});
  };
});

module.exports=router;
