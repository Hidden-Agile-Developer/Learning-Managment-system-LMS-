require('./Database/database');
const userModel=require('./Model/userModel');
const adminModel=require('./Model/adminModel');
const studentModel=require('./Model/studentModel');
const teacherModel=require("./Model/teacherModel");
const FacultyModel=require('./Model/FacultyModel');
const eventModel=require('./Model/adminEventModel');
const sectionModel=require('./Model/sectionModel');
const adminAuth=require('./MiddleWare/adminAuth');
const studentAuth=require('./MiddleWare/studentAuth');
const teacherAuth=require('./MiddleWare/teacherMiddleware');
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');  
const multer = require('multer'); 

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static("images"));

//Upload user profile Image
var storage = multer.diskStorage({
   destination: 'images',
   filename: (req, file, callback) => {
   let ext = path.extname(file.originalname);
   callback(null, "user" + Date.now() + ext);
   }
 });
 
 var imageFileFilter = (req, file, cb) => {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
   return cb(new Error('You can upload only image files!'), false);
   }
   cb(null, true);
 };
 
 var upload = multer({
   storage: storage,
   fileFilter: imageFileFilter,
   limits: { fileSize: 100000000 }
 });

app.post('/uploadUserImages', upload.single('profile_image'), (req, res) => {
res.send(req.file)
console.log(req.file)
});


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

///API for Student login
app.post('/loginStudent',async function(req, res){
   const user=req.body.email;
   const password=req.body.password; 
   const stud1 = await teacherModel.checkCrediantialsDb(user,password);
   const token = await  stud1.generateAuthToken();
   res.json({token});        
   console.log("en");
   console.log(token);         
})
  
  
///API for teacher login
app.post('/loginTeacher',async function(req, res){
   const user=req.body.email;
   const password=req.body.password; 
   const teach1 = await teacherModel.checkCrediantialsDb(user,password);
   const token = await  teach1.generateAuthToken();
   res.json({token});        
   console.log("en");
   console.log(token);
           }) 

   //API for view user request
app.get("/showuserRequest", function (req, res) {   ////Completed
   userModel.find().then(function (userModel) {
      res.send(userModel);
   }).catch(function (e) {
      res.send(e);
   });
  });

  //API to view specific user request in detail
app.get("/showuserRequest/:id", function (req, res) { 
   uid = req.params.id.toString();
   userModel.findById(uid).then(function (userModel) {
      res.send(userModel);
   }).catch(function (e) {
      res.send(e)
   });
});

///API Adding the Faculty////
app.post("/addFaculty", (req, res) => {
   console.log(req.body);
   var FacultyData = new FacultyModel(req.body);
   FacultyData.save().then(function () {
   alert("New Faculty Added");
   console.log('Faculty Added');
   }).catch(function (e) {
      res.send(e)
   });
});

///API to view the Faculty
app.get("/viewFaculty", function (req, res) {   ////Completed
   FacultyModel.find().then(function (FacultyModel) {
   res.send(FacultyModel);
   }).catch(function (e) {
   res.send(e);
   });
   });

 //API to delete the Faculty
app.delete('/deleteFaculty/:id', function (req, res) {
   console.log(req.params.id);
   FacultyModel.findByIdAndDelete(req.params.id).then(function () {
   res.send("Successfully deleted");
   }).catch(function (e) {
   res.send(e);
   });
   });  

///---------User Registeration Approval-----------////
app.post("/addStudent", (req, res) => {
   console.log(req.body);
   var userData = new studentModel(req.body);
   userData.save().then(function () {
   alert("student Registered");
   console.log('student registered');
   }).catch(function (e) { res.send(e) });
});

app.post("/addTeacher", (req, res) => {
   console.log(req.body);
   var userData = new teacherModel(req.body);
   userData.save().then(function () {
      alert("student Registered");
      console.log('student registered');
   }).catch(function (e) { res.send(e) });
});

///API to delete user request///
app.delete('/deleterequest/:id', function (req, res) {            
   console.log(req.params.id);
   userModel.findByIdAndDelete(req.params.id).then(function(){
   res.send("Successfully Removed");
   })
   .catch(function(e){
   res.send(e);
    }) ;
    });

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


 ///API to add new section          
app.post("/AddSection", (req, res) => { 
console.log(req.body);
var userData = new sectionModel(req.body); 
userData.save().then(function(){
alert("Section Added");
console.log('section added');     
}).catch(function(e){res.send(e) });                    
});
        
///API to view section        
app.get("/ViewSection", function(req,res){
sectionModel.find().then(function (sectionModel) {
res.send(sectionModel);
}).catch(function (e) {
res.send(e)
});
});
        

///API to delete section
app.delete('/DeleteSeciton/:id', function (req, res) {                
console.log(req.params.id);
sectionModel.findByIdAndDelete(req.params.id).then(function(){
res.send("Successfully deleted");
}).catch(function(e){
res.send(e);
});
});



 ///Server Port
 app.listen(96);