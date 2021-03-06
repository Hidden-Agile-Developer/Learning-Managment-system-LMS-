require('./Database/database');
const userModel=require('./Model/userModel');
const adminModel=require('./Model/adminModel');
const studentModel=require('./Model/studentModel');
const teacherModel=require("./Model/teacherModel");
const FacultyModel=require('./Model/FacultyModel');
const eventModel=require('./Model/adminEventModel');
const sectionModel=require('./Model/sectionModel');
const assignmentTechModel=require('./Model/AssignmentTechModel');
const assignmentStudModel=require('./Model/AssignmentStudModel');
const studyMaterialModel=require('./Model/studyMaterialModel');
const adminAuth=require('./MiddleWare/adminAuth');
const studentAuth=require('./MiddleWare/studentAuth');
const teacherAuth=require('./MiddleWare/teacherAuth');
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
app.use("/files", express.static("files"));

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


///API for uploading files and documents
var storage = multer.diskStorage({
   destination: "files",
   filename: function (req, file, callback)
   {
   const ext = path.extname(file.originalname);
   callback(null, "assign" + Date.now() + ext);
   }
   });

   var upload1 = multer({ storage: storage });
   app.post('/uploadAssignment', upload1.single('assignment'), (req, res) => {
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
   const student1 = await studentModel.checkCrediantialsDb(user,password);
   const token = await  student1.generateAuthToken();
   res.json({token});        
   console.log("en");
   console.log(token);         
})
  
  
///API for teacher login
app.post('/loginTeacher',async function(req, res){
   const user=req.body.email;
   const password=req.body.password; 
   const teacher1 = await teacherModel.checkCrediantialsDb(user,password);
   const token = await  teacher1.generateAuthToken();
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

///API for updating specific events
app.put('/updateSpecificEvent/:id', function (req, res) {   //update productr
  eid = req.params.id.toString();
  console.log(eid);
  console.log(req.body);
  eventModel.findByIdAndUpdate(eid,req.body,{new: true}, (err,eventModel) => {
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

///API to view teacher
app.get("/ViewTeacher", function(req,res){
teacherModel.find().then(function(teacherModel){
res.send(teacherModel);
}).catch(function(e){
res.send(e);
});
});

///API to view student
app.get("/ViewStudent", function(req,res){
   studentModel.find().then(function(studentModel){
   res.send(studentModel);
   }).catch(function(e){
   res.send(e);
   });
   });

 ///API To add Assignment --Teacher
app.post("/addTechAssignment",  (req, res) => { 
   console.log(req.body);
   var userData = new assignmentTechModel(req.body); 
   userData.save().then(function(){
   alert("Document uploaded");
   }).catch(function(e){res.send(e) });                    
   });
 
 ///API To update Assignment --Teacher
 app.put('/updateAssignment/:id', function (req, res) {  
   uid = req.params.id.toString();
   console.log(uid);
   console.log(req.body);
   assignmentTechModel.findByIdAndUpdate(uid,req.body,{new: true}, (err,assignmentTechModel) => {
   res.send(assignmentTechModel);
   });
   });

 ///API to Delete Assignment --Teacher
app.delete('/deleteAssignment/:id', function (req, res) {                
   console.log(req.params.id);
   assignmentTechModel.findByIdAndDelete(req.params.id).then(function(){
   res.send("Successfully deleted");
   }).catch(function(e){
   res.send(e);
   }) ;
   }); 

 ///API to View Assignment --Teacher
 app.get("/viewAssignmentTeacher", function(req,res){
   assignmentTechModel.find().then(function(assignmentTechModel){
   res.send(assignmentTechModel);
   }).catch(function(e){
   res.send(e);
   });
   });

///API to View Individual Assignment--Teacher
app.get("/viewAssignmentTeacher/:id", function(req,res){
   uid = req.params.id.toString();
   assignmentTechModel.findById(uid).then(function (assignmentTechModel) {
   res.send(assignmentTechModel);
   }).catch(function (e) {
   res.send(e)
   });
   }); 

 ///API To add Assignment --Student
 
 ///API To update Assignment --Student

 ///API to View Assignment --Teacher

 ///API to add study Material
 app.post("/addStudyMaterial",  (req, res) => { 
   console.log(req.body);
   var userData = new studyMaterialModel(req.body); 
   userData.save().then(function(){
   alert("Document uploaded");
   }).catch(function(e){res.send(e) });                    
   });

 ///API to delete study Material
 app.delete('/deleteStudy/:id', function (req, res) {                
   console.log(req.params.id);
   studyMaterialModel.findByIdAndDelete(req.params.id).then(function(){
   res.send("Successfully deleted");
   }).catch(function(e){
   res.send(e);
   });
   }); 

///API to View Study Material
app.get("/viewStudyMaterial", function(req,res){
   studyMaterialModel.find().then(function(studyMaterialModel){
   res.send(studyMaterialModel);
   }).catch(function(e){
   res.send(e);
   });
   });

///API to view study material individually
app.get("/viewStudyMaterial/:id", function(req,res){
   uid = req.params.id.toString();
   studyMaterialModel.findById(uid).then(function (studyMaterialModel) {
   res.send(studyMaterialModel);
   }).catch(function (e) {
   res.send(e)
   });
   });

///API to view admin
app.get('/viewDataAdmin',adminAuth, function(req, res){
   res.send(req.admin);
   console.log(req.body.first_name);
   console.log(req.admin);
})

app.get('/viewDataStudent',studentAuth, function(req, res){
   res.send(req.student);
   console.log(req.body.first_name);
   console.log(req.student);
})


app.get('/viewDataTeacher',teacherAuth, function(req, res){
   res.send(req.teacher);
   console.log(req.body.first_name);
   console.log(req.teacher);
});

app.put('/updateTeacher/:id', function (req, res) {
   uid = req.params.id.toString();
   console.log(uid);
   console.log(req.body);
   teacherModel.findByIdAndUpdate(uid,req.body,{new: true}, (err,teacherModel) => {
   res.send(teacherModel);
       });
   });

app.put('/updateStudent/:id', function (req, res) {   //update student
   uid = req.params.id.toString();
   console.log(uid);
   console.log(req.body);
   studentModel.findByIdAndUpdate(uid,req.body,{new: true}, (err,studentModel) => {
   res.send(studentModel);
   });
   });
   
app.post("/addAssignment", (req, res) => { 
   console.log(req.body);
   var userData = new assignmentStudModel(req.body); 
   userData.save().then(function(){
   alert("Assignment uploaded");
   }).catch(function(e){res.send(e) });                    
});
  
app.get("/viewAssignment", function(req,res){
   assignmentStudModel.find().then(function(assignmentStudModel){
   res.send(assignmentStudModel);
   }).catch(function(e){
   res.send(e);
   });
  });   

  app.delete('/deleteStudassign/:id', function (req, res) {
   console.log(req.params.id);
   assignmentStudModel.findByIdAndDelete(req.params.id).then(function () {
   res.send("Successfully deleted");
   }).catch(function (e) {
   res.send(e);
   });
   });   

 app.get("/viewStudent/:id", function(req,res){
   uid = req.params.id.toString();
   studentModel.findById(uid).then(function (studentModel) {
   res.send(studentModel);
   }).catch(function (e) {
   res.send(e)
   });
   });

   
 app.get("/viewTeacher/:id", function(req,res){
   uid = req.params.id.toString();
   teacherModel.findById(uid).then(function (teacherModel) {
   res.send(teacherModel);
   }).catch(function (e) {
   res.send(e)
   });
   });

 ///Server Port
 app.listen(96);