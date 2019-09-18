require('./Database/database');
const userModel=require('./Model/userModel');
const adminModel=require('./Model/adminModel');
const eventModel=require('./Model/adminEventModel');
const adminAuth=require('./MiddleWare/adminAuth');
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');  
const multer = require('multer'); 

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));


///API for sending the request to the user////
app.post("/userRequest", (req, res) => { 
    console.log(req.body);
    var userData = new userModel(req.body); 
    userData.save().then(function(){   
    alert("user Registered");
    console.log('user registered');     
    }).catch(function(e){res.send(e) 
    });
 });

 ///API for Admin login
 app.post('/loginUser',async function(req, res){
    const user=req.body.email;// user
    const password=req.body.password; // pw
    const admin1 = await adminModel.checkCrediantialsDb(user,password);
    const token = await  admin1.generateAuthToken();
    res.json({token});        
    console.log("en");
    console.log(token);  
   })

 //API for adding Event
app.post("/addEvent",(req, res) => {
    console.log(req.body);
    var eventData = new eventModel(req.body);
    eventData.save().then(function(){
        // res.send('fine');
        alert("Event Added");
        console.log('Event info added');
    }).catch(function(e){res.send(e) });
});



 //API for viewing all events
 app.get("/showEventDetails",function(req,res){
  eventModel.find().then(function(eventModel){
      console.log(eventModel);
      res.send(eventModel);
  }).catch(function(e){
      res.send(e);
  })
})

//  API for viewing specific events
app.get('/showSpecificEvent/:id', function (req, res) {    
  eid = req.params.id.toString();
  eventModel.findById(eid).then(function (eventModel) {
      res.send(eventModel);
  }).catch(function (e) {
      res.send(e)
  });
});

// API for updating specific events
app.put('/updateSpecificEvent/:id', function (req, res) {   //update productr
  eid = req.params.id.toString();
  console.log(eid);
  console.log(req.body);

  eventModel.findByIdAndUpdate(eid,req.body,{new: true}, (err,eventModel) => {
      // Handle any possible database errors
      res.send(eventModel);
      });
  });


  
        // API for deleting specific events
        app.delete('/deleteSpecificEvent/:id', function (req, res) {    
            
          console.log(req.params.id);
           eventModel.findByIdAndDelete(req.params.id).then(function(){
               res.send("Successfully deleted");
           }).catch(function(e){
               res.send(e);
           }) ;
           });



 ///Server Port
 app.listen(96);